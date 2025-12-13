'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Share2, Heart, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils/cn';

interface ToolPageLayoutProps {
  children: React.ReactNode;
  toolId: string;
  groupId: string;
  title: string;
  description: string;
  icon?: string;
  // SEO & Related
  relatedTools?: Array<{
    id: string;
    groupId: string;
    title: string;
    description: string;
  }>;
  // FAQ for SEO
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
}

export function ToolPageLayout({
  children,
  toolId,
  groupId,
  title,
  description,
  icon,
  relatedTools,
  faqs,
}: ToolPageLayoutProps) {
  const t = useTranslations('common');
  const [isFavorite, setIsFavorite] = React.useState(false);

  // Check favorite status on mount
  React.useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('tool_favorites') || '[]');
    setIsFavorite(favorites.includes(`${groupId}/${toolId}`));
  }, [groupId, toolId]);

  const handleShare = React.useCallback(async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        });
      } catch {
        // User cancelled or error
      }
    } else {
      await navigator.clipboard.writeText(url);
      // TODO: Show toast
    }
  }, [title, description]);

  const handleFavorite = React.useCallback(() => {
    const toolKey = `${groupId}/${toolId}`;
    const favorites = JSON.parse(localStorage.getItem('tool_favorites') || '[]');
    
    if (isFavorite) {
      const newFavorites = favorites.filter((f: string) => f !== toolKey);
      localStorage.setItem('tool_favorites', JSON.stringify(newFavorites));
    } else {
      favorites.push(toolKey);
      localStorage.setItem('tool_favorites', JSON.stringify(favorites));
    }
    
    setIsFavorite(!isFavorite);
  }, [groupId, toolId, isFavorite]);

  return (
    <div className="min-h-screen">
      {/* Main Content Area with Ad Slots */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-8">
          {/* Main Tool Area */}
          <div className="space-y-6">
            {/* Tool Header */}
            <header className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  {icon && (
                    <span className="text-4xl" role="img" aria-hidden="true">
                      {icon}
                    </span>
                  )}
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                      {title}
                    </h1>
                    <p className="mt-1 text-muted-foreground max-w-2xl">
                      {description}
                    </p>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleFavorite}
                    title={isFavorite ? t('remove_favorite') : t('add_favorite')}
                  >
                    <Heart
                      className={cn(
                        'h-4 w-4',
                        isFavorite && 'fill-red-500 text-red-500'
                      )}
                    />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleShare}
                    title={t('share')}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </header>

            {/* Ad Slot - Top Banner (Responsive) */}
            <div
              id="ad-slot-top"
              className="w-full min-h-[90px] bg-muted/30 rounded-lg border border-dashed border-muted-foreground/20 flex items-center justify-center text-muted-foreground/50 text-sm"
              data-ad-slot="tool-top-banner"
            >
              {/* Google AdSense or Affiliate Ad Placeholder */}
              <span className="hidden md:inline">Ad Space - 728x90</span>
              <span className="md:hidden">Ad Space - 320x100</span>
            </div>

            {/* Main Tool Content */}
            <main className="space-y-6" id="tool-main-content">
              {children}
            </main>

            {/* Ad Slot - Middle Content */}
            <div
              id="ad-slot-middle"
              className="w-full min-h-[250px] bg-muted/30 rounded-lg border border-dashed border-muted-foreground/20 flex items-center justify-center text-muted-foreground/50 text-sm"
              data-ad-slot="tool-middle-content"
            >
              {/* Google AdSense or Affiliate Ad Placeholder */}
              <span>Ad Space - 300x250 / 336x280</span>
            </div>

            {/* FAQ Section for SEO */}
            {faqs && faqs.length > 0 && (
              <section className="space-y-4" id="tool-faq">
                <h2 className="text-xl font-semibold">
                  {t('frequently_asked_questions')}
                </h2>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <article
                      key={index}
                      className="rounded-lg border bg-card p-4"
                      itemScope
                      itemType="https://schema.org/Question"
                    >
                      <h3
                        className="font-medium"
                        itemProp="name"
                      >
                        {faq.question}
                      </h3>
                      <div
                        className="mt-2 text-sm text-muted-foreground"
                        itemScope
                        itemType="https://schema.org/Answer"
                        itemProp="acceptedAnswer"
                      >
                        <p itemProp="text">{faq.answer}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* Related Tools for SEO Internal Linking */}
            {relatedTools && relatedTools.length > 0 && (
              <section className="space-y-4" id="related-tools">
                <h2 className="text-xl font-semibold">
                  {t('related_tools')}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {relatedTools.map((tool) => (
                    <a
                      key={`${tool.groupId}/${tool.id}`}
                      href={`/tools/${tool.groupId}/${tool.id}`}
                      className="group flex items-start gap-3 rounded-lg border bg-card p-4 transition-colors hover:bg-accent"
                    >
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium group-hover:text-primary truncate">
                          {tool.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                          {tool.description}
                        </p>
                      </div>
                      <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" />
                    </a>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar - Ad Slots for Desktop */}
          <aside className="hidden xl:block space-y-6">
            {/* Sticky Sidebar Ads */}
            <div className="sticky top-24 space-y-6">
              {/* Ad Slot - Sidebar Top */}
              <div
                id="ad-slot-sidebar-top"
                className="w-full h-[250px] bg-muted/30 rounded-lg border border-dashed border-muted-foreground/20 flex items-center justify-center text-muted-foreground/50 text-sm"
                data-ad-slot="tool-sidebar-top"
              >
                Ad Space - 300x250
              </div>

              {/* Ad Slot - Sidebar Middle */}
              <div
                id="ad-slot-sidebar-middle"
                className="w-full h-[600px] bg-muted/30 rounded-lg border border-dashed border-muted-foreground/20 flex items-center justify-center text-muted-foreground/50 text-sm"
                data-ad-slot="tool-sidebar-middle"
              >
                Ad Space - 300x600
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile Bottom Ad */}
      <div
        id="ad-slot-mobile-bottom"
        className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-background border-t p-2"
        data-ad-slot="tool-mobile-bottom"
      >
        <div className="container mx-auto">
          <div className="h-[50px] bg-muted/30 rounded border border-dashed border-muted-foreground/20 flex items-center justify-center text-muted-foreground/50 text-xs">
            Ad Space - 320x50
          </div>
        </div>
      </div>

      {/* Add padding for mobile bottom ad */}
      <div className="xl:hidden h-[66px]" />
    </div>
  );
}
