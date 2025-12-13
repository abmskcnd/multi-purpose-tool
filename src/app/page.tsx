import { redirect } from 'next/navigation';
import { routing } from '@/i18n/routing';

// This page handles the root URL and redirects to the default locale
// Middleware should handle this, but this is a fallback
export default function RootPage() {
  redirect(`/${routing.defaultLocale}`);
}
