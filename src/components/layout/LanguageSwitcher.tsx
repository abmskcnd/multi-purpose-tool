'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';

const localeNames: Record<Locale, string> = {
  vi: '🇻🇳 Tiếng Việt',
  en: '🇺🇸 English',
  es: '🇪🇸 Español',
  zh: '🇨🇳 中文',
  ja: '🇯🇵 日本語',
};

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value as Locale;
    // useRouter from next-intl/navigation automatically handles locale
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <select
      value={locale}
      onChange={handleChange}
      className="rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm transition-colors hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary/20"
    >
      {routing.locales.map((loc) => (
        <option key={loc} value={loc}>
          {localeNames[loc]}
        </option>
      ))}
    </select>
  );
}
