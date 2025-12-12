import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

/**
 * next-intl navigation helpers
 * 
 * Use these instead of next/link and next/navigation for automatic locale handling:
 * - Link: Locale-aware link component (replaces next/link)
 * - useRouter: Locale-aware router (replaces next/navigation useRouter)
 * - usePathname: Get pathname without locale prefix
 * - redirect: Locale-aware redirect
 * - getPathname: Get localized pathname
 * 
 * @example
 * // Before (manual locale handling)
 * import Link from 'next/link';
 * <Link href={`/${locale}/tools`}>Tools</Link>
 * 
 * // After (automatic locale handling)
 * import { Link } from '@/i18n/navigation';
 * <Link href="/tools">Tools</Link>
 */
export const { Link, redirect, usePathname, useRouter, getPathname } = 
  createNavigation(routing);

// Re-export routing config for convenience
export { routing } from './routing';
export type { Locale } from './routing';
