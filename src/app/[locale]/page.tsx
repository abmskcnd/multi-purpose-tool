import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Header, Footer } from '@/components/layout';
import { TOOL_GROUPS, getTotalToolCount } from '@/config/tools.registry';
import { routing } from '@/i18n/routing';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: HomePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  
  // Enable static rendering with correct locale
  setRequestLocale(locale);
  
  const t = await getTranslations('home');
  const tCommon = await getTranslations('common');
  const tGroups = await getTranslations('toolGroups');
  
  // Get featured tool groups (top 3 by priority)
  const featuredGroups = TOOL_GROUPS.slice(0, 3);
  
  // Get all groups for category section
  const allGroups = TOOL_GROUPS.slice(0, 12);
  
  // Note: getPopularTools can be used for featured tools display if needed
  // const popularToolsData = getPopularTools(8);

  // Get all tools for grid
  const allTools = TOOL_GROUPS.flatMap(group =>
    group.tools.slice(0, 2).map(tool => ({
      ...tool,
      groupId: group.id,
      groupIcon: group.icon
    }))
  ).slice(0, 8);

  // Get coming soon tools
  const comingSoonTools = TOOL_GROUPS.flatMap(group =>
    group.tools
      .filter(tool => tool.status === 'coming-soon')
      .slice(0, 1)
      .map(tool => ({
        ...tool,
        groupId: group.id,
        groupIcon: group.icon
      }))
  ).slice(0, 4);

  const totalTools = getTotalToolCount();
  const totalCategories = TOOL_GROUPS.length;

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background px-4 py-16 md:py-24 lg:py-32">
          {/* Background decorations */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute top-1/4 right-0 h-[400px] w-[400px] rounded-full bg-accent/10 blur-3xl" />
          </div>
          
          <div className="container mx-auto">
            <div className="mx-auto max-w-3xl text-center">
              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-1.5 text-sm font-medium shadow-sm backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                </span>
                {t('new_tools_badge')}
              </div>
              
              {/* Headline */}
              <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="gradient-text">{t('hero_title')}</span>
              </h1>
              
              {/* Subheadline */}
              <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
                {t('hero_subtitle')}
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link 
                  href="/tools"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:bg-primary/90 hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  {t('get_started')}
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link 
                  href="/tools"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 bg-background px-8 text-base font-medium transition-all hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  {t('browse_all')}
                </Link>
              </div>
              
              {/* Stats */}
              <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary">{totalTools}+</div>
                  <div className="text-sm text-muted-foreground">{tCommon('tools')}</div>
                </div>
                <div className="h-8 w-px bg-border" />
                <div>
                  <div className="text-3xl font-bold text-primary">{totalCategories}</div>
                  <div className="text-sm text-muted-foreground">{tCommon('categories')}</div>
                </div>
                <div className="h-8 w-px bg-border" />
                <div>
                  <div className="text-3xl font-bold text-primary">100%</div>
                  <div className="text-sm text-muted-foreground">{t('free')}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Quick Picks - Horizontal Scroll Chips */}
        <section className="border-y bg-muted/30 py-8">
          <div className="container mx-auto px-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                {t('quick_picks')}
              </h3>
              <Link 
                href="/tools"
                className="text-sm font-medium text-primary hover:underline"
              >
                {tCommon('view_all')}
              </Link>
            </div>
            
            <div className="hide-scrollbar flex gap-3 overflow-x-auto pb-2">
              {/* All Tools Chip - Active State */}
              <Link
                href="/tools"
                className="flex h-10 shrink-0 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-md transition-transform hover:scale-105"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                {tCommon('all_tools')}
              </Link>
              
              {/* Category Chips - Inactive State */}
              {allGroups.slice(0, 8).map((group) => (
                <Link
                  key={group.id}
                  href={`/tools/${group.id}`}
                  className="group flex h-10 shrink-0 items-center gap-2 rounded-full border bg-card px-5 text-sm font-medium transition-all hover:border-primary/50 hover:bg-primary/5"
                >
                  <span className="text-lg transition-transform group-hover:scale-110">{group.icon}</span>
                  <span>{tGroups(`${group.id}.title`)}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Editor's Choice Carousel */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                  {t('editors_choice')}
                </h2>
                <p className="mt-2 text-muted-foreground">
                  {t('editors_choice_subtitle')}
                </p>
              </div>
              <Link
                href="/tools"
                className="text-sm font-medium text-primary hover:underline"
              >
                {tCommon('view_all')} →
              </Link>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredGroups.map((group) => (
                <Link
                  key={group.id}
                  href={`/tools/${group.id}`}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30"
                >
                  {/* Gradient Header */}
                  <div className="relative h-40 overflow-hidden bg-gradient-to-br from-primary/20 via-accent/10 to-background">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-7xl opacity-30 transition-transform duration-500 group-hover:scale-110">
                        {group.icon}
                      </span>
                    </div>
                    <div className="absolute right-4 top-4">
                      <span className="rounded-full bg-foreground/10 px-3 py-1 text-xs font-bold backdrop-blur-md">
                        {t('featured')}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-xl shadow-sm">
                          {group.icon}
                        </div>
                        <div>
                          <h3 className="font-bold group-hover:text-primary transition-colors">
                            {tGroups(`${group.id}.title`)}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {group.tools.length} {tCommon('tools').toLowerCase()}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <p className="mb-5 line-clamp-2 text-sm text-muted-foreground">
                      {tGroups(`${group.id}.description`)}
                    </p>
                    
                    <div className="mt-auto">
                      <span className="inline-flex w-full items-center justify-center rounded-xl bg-muted py-2.5 text-sm font-medium transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        {t('view_details')}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* All Tools Grid Section */}
        <section className="border-y bg-muted/30 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-2xl font-bold tracking-tight">{tCommon('all_tools')}</h2>
              <div className="flex items-center gap-3">
                <select className="rounded-xl border bg-card px-4 py-2 text-sm font-medium focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
                  <option>{t('most_popular')}</option>
                  <option>{t('newest')}</option>
                  <option>{t('a_to_z')}</option>
                </select>
              </div>
            </div>
            
            {/* Tools Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {allTools.map((tool) => {
                const isComingSoon = tool.status === 'coming-soon';
                const badge = isComingSoon 
                  ? { text: tCommon('coming_soon_badge'), className: 'bg-amber-500/20 text-amber-400' }
                  : tool.status === 'new'
                  ? { text: 'NEW', className: 'bg-emerald-500/20 text-emerald-400' }
                  : { text: tCommon('free'), className: 'bg-primary/10 text-primary' };
                
                const cardContent = (
                  <div className={`group flex items-start gap-4 rounded-2xl border p-4 transition-all ${
                    isComingSoon
                      ? 'border-border/50 bg-card/50'
                      : 'border-border bg-card hover:border-primary/40 hover:bg-card/80'
                  }`}>
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl transition-colors ${
                      isComingSoon ? 'bg-muted/50' : 'bg-primary/10 group-hover:bg-primary/20'
                    }`}>
                      {tool.icon || tool.groupIcon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center justify-between gap-2">
                        <h4 className={`truncate font-bold transition-colors ${
                          isComingSoon ? 'text-muted-foreground' : 'group-hover:text-primary'
                        }`}>
                          {tool.title}
                        </h4>
                        <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${badge.className}`}>
                          {badge.text}
                        </span>
                      </div>
                      <p className={`line-clamp-2 text-xs ${isComingSoon ? 'text-muted-foreground/60' : 'text-muted-foreground'}`}>
                        {tool.description}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        {tool.tags?.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-[10px] font-mono text-muted-foreground/70">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
                
                if (isComingSoon) {
                  return <div key={`${tool.groupId}-${tool.id}`}>{cardContent}</div>;
                }
                
                return (
                  <Link key={`${tool.groupId}-${tool.id}`} href={`/tools/${tool.groupId}/${tool.id}`}>
                    {cardContent}
                  </Link>
                );
              })}
            </div>
            
            {/* Show More Button */}
            <div className="mt-8 flex justify-center">
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 rounded-full border bg-card px-6 py-3 text-sm font-medium transition-colors hover:bg-muted hover:text-primary"
              >
                {t('show_more_tools')}
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* All Categories Grid */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                {tCommon('browse_by_category')}
              </h2>
              <p className="mt-2 text-muted-foreground">
                {t('categories_subtitle')}
              </p>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {allGroups.map((group) => (
                <Link
                  key={group.id}
                  href={`/tools/${group.id}`}
                  className="group flex items-center gap-4 rounded-xl border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-muted text-2xl transition-colors group-hover:bg-primary/10">
                    {group.icon}
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate font-semibold group-hover:text-primary transition-colors">
                      {tGroups(`${group.id}.title`)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {group.tools.length} {tCommon('tools').toLowerCase()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Coming Soon Section */}
        {comingSoonTools.length > 0 && (
          <section className="border-t bg-muted/30 py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-warning/30 bg-warning/10 px-3 py-1 text-xs font-medium text-warning">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                    </svg>
                    {tCommon('coming_soon')}
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                    {t('coming_soon_title')}
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    {t('coming_soon_subtitle')}
                  </p>
                </div>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {comingSoonTools.map((tool) => (
                  <div
                    key={`${tool.groupId}-${tool.id}`}
                    className="relative flex items-start gap-4 rounded-xl border border-dashed bg-card/50 p-4"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-muted text-2xl opacity-60">
                      {tool.icon || tool.groupIcon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="truncate font-semibold text-muted-foreground">
                        {tool.title}
                      </h4>
                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground/70">
                        {tool.description}
                      </p>
                    </div>
                    <span className="absolute right-3 top-3 rounded-full bg-warning/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-warning">
                      {tCommon('coming_soon_badge')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                {t('cta_title')}
              </h2>
              <p className="mt-4 text-muted-foreground">
                {t('cta_subtitle')}
              </p>
              <Link
                href="/tools"
                className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:bg-primary/90 hover:shadow-xl"
              >
                {t('explore_all_tools')}
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
