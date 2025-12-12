'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header() {
  const t = useTranslations('common');
  const locale = useLocale();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary">🛠️</span>
          <span className="text-xl font-bold">{t('site_name')}</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            href={`/${locale}`} 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t('home')}
          </Link>
          <Link 
            href={`/${locale}/tools`} 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t('tools')}
          </Link>
          <Link 
            href={`/${locale}/about`} 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t('about')}
          </Link>
          <Link 
            href={`/${locale}/contact`} 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t('contact')}
          </Link>
        </nav>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          
          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-md hover:bg-accent">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
