import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { ToolCard } from '@/components/shared/ToolCard';
import { getPopularTools, getAllTools } from '@/config/tools.config';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'home' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function HomePage() {
  const t = useTranslations('home');
  const commonT = useTranslations('common');
  const popularTools = getPopularTools();
  const allTools = getAllTools();

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              {t('hero_title')}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground md:text-xl">
              {t('hero_subtitle')}
            </p>
            
            {/* Search Bar */}
            <div className="mx-auto mt-8 max-w-md">
              <input
                type="text"
                placeholder={t('search_placeholder')}
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </section>

        {/* Popular Tools Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold md:text-3xl">{t('popular_tools')}</h2>
              <Link 
                href="/tools" 
                className="text-sm text-primary hover:underline"
              >
                {t('view_all')} →
              </Link>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {popularTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        </section>

        {/* All Tools Section */}
        <section className="bg-muted/50 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-2xl font-bold md:text-3xl">{t('all_tools')}</h2>
            
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {allTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
