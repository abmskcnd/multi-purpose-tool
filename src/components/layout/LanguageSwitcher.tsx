'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { locales, defaultLocale } from '@/i18n/request';

const localeNames: Record<string, string> = {
  en: '🇺🇸 English',
  vi: '🇻🇳 Tiếng Việt',
  es: '🇪🇸 Español',
  zh: '🇨🇳 中文',
  ja: '🇯🇵 日本語',
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    
    // Get path without current locale prefix
    // With 'as-needed', default locale has no prefix
    let pathWithoutLocale = pathname;
    
    // Check if path starts with any locale prefix
    for (const loc of locales) {
      if (pathname.startsWith(`/${loc}/`) || pathname === `/${loc}`) {
        pathWithoutLocale = pathname.slice(`/${loc}`.length) || '/';
        break;
      }
    }
    
    // Build new path
    // Default locale: no prefix (e.g., /tools)
    // Other locales: with prefix (e.g., /vi/tools)
    const newPathname = newLocale === defaultLocale 
      ? pathWithoutLocale 
      : `/${newLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
    
    router.push(newPathname);
  };

  return (
    <select
      value={locale}
      onChange={handleChange}
      className="rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm transition-colors hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary/20"
    >
      {locales.map((loc) => (
        <option key={loc} value={loc}>
          {localeNames[loc]}
        </option>
      ))}
    </select>
  );
}
