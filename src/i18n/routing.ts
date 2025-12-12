import { defineRouting } from 'next-intl/routing';

/**
 * Centralized routing configuration for next-intl
 * 
 * This is the single source of truth for:
 * - Supported locales
 * - Default locale
 * - Locale prefix strategy
 */
export const routing = defineRouting({
  // All supported locales - Vietnamese first as default
  locales: ['vi', 'en', 'es', 'zh', 'ja'],
  
  // Default locale when no match
  defaultLocale: 'vi',
  
  // Always show locale prefix in URL for clarity and SEO
  // / → redirects to /vi
  // /vi → Vietnamese
  // /en → English
  localePrefix: 'always'
});

// Type exports for use throughout the app
export type Locale = (typeof routing.locales)[number];
export const locales = routing.locales;
export const defaultLocale = routing.defaultLocale;
