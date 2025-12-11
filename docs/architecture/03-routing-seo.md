# 🗺️ Routing & SEO Strategy

**Document:** URL Architecture & Programmatic SEO  
**Version:** 2.0.0  
**Last Updated:** December 11, 2025  
**Status:** ✅ Production Ready

[← Back to Architecture Index](./README.md)

---

## 🌐 URL Architecture

### Single Domain Strategy

**Benefits:**

| Benefit | Impact | Metric Target |
|---------|--------|---------------|
| **SEO Synergy** | Domain Authority shared across all pages | DA 50+ in 12 months |
| **Link Equity** | Every backlink benefits all pages | 10x ROI on link building |
| **Brand Power** | Build one strong brand | 80%+ brand recall |
| **Maintenance** | Deploy once, update everywhere | -70% DevOps time |
| **Crawl Budget** | Google prioritizes sub-pages | 2x faster indexing |

---

## 📍 URL Structure

```
Production URLs:
├── domain.com/                                         # Homepage (Landing/Hub)
├── domain.com/[locale]                                 # Localized homepage
│   ├── /en                                             # English
│   ├── /vi                                             # Vietnamese
│   ├── /es                                             # Spanish
│   ├── /zh                                             # Chinese
│   └── /ja                                             # Japanese
│
├── domain.com/[locale]/tools/[slug]                    # Individual tool pages
│   ├── /en/tools/password-generator
│   ├── /en/tools/qr-code-generator
│   ├── /en/tools/image-compressor
│   └── /vi/tools/tao-mat-khau
│
├── domain.com/[locale]/convert/[source]-to-[target]    # Programmatic SEO
│   ├── /en/convert/jpg-to-png                          # Image conversion
│   ├── /en/convert/mp4-to-gif                          # Video conversion
│   ├── /en/convert/pdf-to-word                         # Document conversion
│   └── /en/convert/heic-to-jpg                         # Format conversion
│
├── domain.com/[locale]/blog/[slug]                     # Content marketing
│   ├── /en/blog/how-to-compress-images
│   ├── /en/blog/best-password-practices
│   └── /vi/blog/cach-nen-anh
│
├── domain.com/[locale]/privacy-policy                  # Legal pages
├── domain.com/[locale]/terms-of-service
├── domain.com/[locale]/disclaimer
├── domain.com/[locale]/affiliate-disclosure
├── domain.com/[locale]/contact
│
├── domain.com/api/*                                    # API endpoints
│   ├── /api/track                                      # Analytics
│   ├── /api/feedback                                   # User feedback
│   ├── /api/tools                                      # List tools
│   ├── /api/tools/[id]                                 # Tool details
│   ├── /api/proposals                                  # Tool suggestions
│   └── /api/health                                     # Health check
│
├── domain.com/sitemap.xml                              # Dynamic sitemap
└── domain.com/robots.txt                               # Robots directives
```

---

## 🎯 Programmatic SEO Strategy

### Core Concept

**Use code to generate content at scale instead of manual creation.**

**Formula:**
```
Data (Format List) + Logic (Conversion Code) + Templates = Thousands of Pages
```

### Conversion Matrix Example

| Source Format | Target Formats | Generated Pages |
|--------------|----------------|-----------------|
| JPG | PNG, PDF, WebP, AVIF, SVG | 5 pages |
| PNG | JPG, PDF, WebP, AVIF, SVG | 5 pages |
| PDF | Word, JPG, PNG, Excel, PPT | 5 pages |
| MP4 | GIF, WebM, AVI, MOV, MP3 | 5 pages |
| WebP | JPG, PNG, AVIF, SVG | 4 pages |
| HEIC | JPG, PNG, WebP | 3 pages |
| **Total** | **~25 formats** | **500+ pages** |

### Implementation

```typescript
// config/conversion-matrix.ts
export const conversionMatrix = [
  { 
    source: 'jpg',
    targets: ['png', 'pdf', 'webp', 'avif', 'svg'],
    processorId: 'image-converter'
  },
  { 
    source: 'png',
    targets: ['jpg', 'pdf', 'webp', 'avif', 'svg'],
    processorId: 'image-converter'
  },
  { 
    source: 'pdf',
    targets: ['word', 'jpg', 'png', 'excel', 'ppt'],
    processorId: 'pdf-converter'
  },
  { 
    source: 'mp4',
    targets: ['gif', 'webm', 'avi', 'mov', 'mp3'],
    processorId: 'video-converter'
  },
  // ... more formats
];

export function getAllConversionRoutes() {
  return conversionMatrix.flatMap(({ source, targets }) =>
    targets.map(target => ({ source, target }))
  );
}
```

```typescript
// app/[locale]/convert/[source]-to-[target]/page.tsx
import { getAllConversionRoutes } from '@/config/conversion-matrix';

export async function generateStaticParams() {
  const routes = getAllConversionRoutes();
  const locales = ['en', 'vi', 'es', 'zh', 'ja'];
  
  return locales.flatMap(locale =>
    routes.map(({ source, target }) => ({
      locale,
      source,
      target,
    }))
  );
}

export async function generateMetadata({ params }) {
  const { locale, source, target } = params;
  
  return {
    title: `Convert ${source.toUpperCase()} to ${target.toUpperCase()} - Free Online Converter`,
    description: `Free online ${source.toUpperCase()} to ${target.toUpperCase()} converter. Fast, secure, no registration required.`,
  };
}

export default function ConversionPage({ params }) {
  const { source, target } = params;
  
  return (
    <div>
      <h1>Convert {source.toUpperCase()} to {target.toUpperCase()}</h1>
      <ConversionTool source={source} target={target} />
      
      {/* SEO content */}
      <ConversionGuide source={source} target={target} />
      <FAQ source={source} target={target} />
      <RelatedConversions source={source} target={target} />
    </div>
  );
}
```

### SEO Benefits

| Benefit | Impact |
|---------|--------|
| **500+ indexed pages** | Massive organic traffic potential |
| **Long-tail keywords** | Target specific conversion queries |
| **Internal linking** | Boost DA across all pages |
| **Automatic scaling** | Add 1 format = 25+ new pages |
| **Fresh content** | Google loves programmatic freshness |

---

## 🔍 SEO Implementation

### Dynamic Metadata

```typescript
// lib/seo/metadata.ts
import type { Metadata } from 'next';

export function generateToolMetadata(
  toolId: string,
  locale: string
): Metadata {
  const tool = getToolConfig(toolId);
  const t = tool.seo[locale];
  
  return {
    title: t.title,
    description: t.description,
    keywords: t.keywords,
    openGraph: {
      title: t.ogTitle || t.title,
      description: t.ogDescription || t.description,
      images: [{ url: `/og-images/${toolId}.png` }],
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t.twitterTitle || t.title,
      description: t.twitterDescription || t.description,
      images: [`/og-images/${toolId}.png`],
    },
    alternates: {
      canonical: `/${locale}/tools/${toolId}`,
      languages: generateHreflangLinks(toolId),
    },
  };
}
```

### JSON-LD Structured Data

```typescript
// lib/seo/schema.ts
export function generateToolSchema(toolId: string, locale: string) {
  const tool = getToolConfig(toolId);
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name[locale],
    description: tool.description[locale],
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250',
    },
  };
}
```

### Dynamic Sitemap

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://yourdomain.com';
  const locales = ['en', 'vi', 'es', 'zh', 'ja'];
  const tools = getAllTools();
  const conversions = getAllConversionRoutes();
  
  const sitemapEntries: MetadataRoute.Sitemap = [];
  
  // Homepage
  sitemapEntries.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1.0,
  });
  
  // Localized homepages
  locales.forEach(locale => {
    sitemapEntries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    });
  });
  
  // Tool pages
  tools.forEach(tool => {
    locales.forEach(locale => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/tools/${tool.id}`,
        lastModified: tool.updatedAt,
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });
  });
  
  // Conversion pages (programmatic SEO)
  conversions.forEach(({ source, target }) => {
    locales.forEach(locale => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/convert/${source}-to-${target}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });
  });
  
  return sitemapEntries;
}
```

### Robots.txt

```typescript
// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
    ],
    sitemap: 'https://yourdomain.com/sitemap.xml',
  };
}
```

---

## 🎨 Hreflang Implementation

### Multi-Language Alternates

```typescript
// app/[locale]/tools/[slug]/page.tsx
export async function generateMetadata({ params }) {
  const { locale, slug } = params;
  
  return {
    alternates: {
      canonical: `/${locale}/tools/${slug}`,
      languages: {
        'en': `/en/tools/${slug}`,
        'vi': `/vi/tools/${slug}`,
        'es': `/es/tools/${slug}`,
        'zh': `/zh/tools/${slug}`,
        'ja': `/ja/tools/${slug}`,
        'x-default': `/en/tools/${slug}`,
      },
    },
  };
}
```

---

## 📊 SEO Performance Targets

| Metric | Target (Month 3) | Target (Month 6) | Target (Year 1) |
|--------|------------------|------------------|-----------------|
| **Domain Authority** | DA 20 | DA 30 | DA 50 |
| **Indexed Pages** | 100+ | 500+ | 1,000+ |
| **Organic Traffic** | 5K/month | 50K/month | 200K/month |
| **Backlinks** | 50 | 200 | 1,000 |
| **Keyword Rankings** | 20 (top 10) | 100 (top 10) | 500 (top 10) |

---

## 🔗 Internal Linking Strategy

### Cross-Linking Patterns

```tsx
// components/shared/RelatedTools.tsx
export function RelatedTools({ currentToolId }: { currentToolId: string }) {
  const relatedTools = getRelatedTools(currentToolId, 6);
  
  return (
    <section>
      <h2>Related Tools</h2>
      <div className="grid grid-cols-3 gap-4">
        {relatedTools.map(tool => (
          <Link key={tool.id} href={`/tools/${tool.id}`}>
            {tool.name}
          </Link>
        ))}
      </div>
    </section>
  );
}

// components/shared/RelatedConversions.tsx
export function RelatedConversions({ 
  source, 
  target 
}: { 
  source: string;
  target: string;
}) {
  const related = getRelatedConversions(source, target);
  
  return (
    <section>
      <h3>Related Conversions</h3>
      <ul>
        {related.map(({ source: s, target: t }) => (
          <li key={`${s}-${t}`}>
            <Link href={`/convert/${s}-to-${t}`}>
              Convert {s.toUpperCase()} to {t.toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

---

## 🔗 Related Documents

- **System Architecture:** [System Architecture](./01-system-architecture.md)
- **Project Structure:** [Project Structure](./02-project-structure.md)
- **SEO Performance:** See [document.md](../document.md) Section 9
- **Content Strategy:** See [document.md](../document.md) Section 9

---

[← Back to Architecture Index](./README.md)

**Document Version:** 2.0.0  
**Last Updated:** December 11, 2025  
**Next Review:** Post-Launch (Q1 2026)
