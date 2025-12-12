import { MetadataRoute } from 'next';
import { getAllTools, getAllConversionRoutes } from '@/config/tools.config';
import { locales } from '@/i18n/request';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://toolhub.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const tools = getAllTools();
  const conversionRoutes = getAllConversionRoutes();

  // Static pages
  const staticPages = ['', '/tools', '/about', '/contact', '/privacy-policy', '/terms-of-service'];

  // Generate URLs for all locales
  const staticUrls = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${BASE_URL}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: page === '' ? 1 : 0.8,
    }))
  );

  // Tool pages
  const toolUrls = locales.flatMap((locale) =>
    tools.map((tool) => ({
      url: `${BASE_URL}/${locale}/tools/${tool.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }))
  );

  // Conversion pages (Programmatic SEO)
  const conversionUrls = locales.flatMap((locale) =>
    conversionRoutes.map(({ source, target }) => ({
      url: `${BASE_URL}/${locale}/convert/${source}-to-${target}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  );

  return [...staticUrls, ...toolUrls, ...conversionUrls];
}
