'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { getAllGroupsSorted, getToolsSorted, searchTools, getPopularTools, getTotalToolCount } from '@/config/tools.registry';
import { GroupToolCard } from '@/components/ui';

export default function ToolsPage() {
  const t = useTranslations('common');
  const tToolGroups = useTranslations('toolGroups');
  const [searchQuery, setSearchQuery] = useState('');

  const groups = useMemo(() => getAllGroupsSorted(), []);
  const popularTools = useMemo(() => getPopularTools(8), []);
  const totalTools = useMemo(() => getTotalToolCount(), []);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    return searchTools(searchQuery);
  }, [searchQuery]);

  // Helper to get translated group title/description
  const getGroupTranslation = (groupId: string, field: 'title' | 'description', fallback: string) => {
    try {
      return tToolGroups(`${groupId}.${field}`);
    } catch {
      return fallback;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{t('all_tools')}</h1>
        <p className="mt-2 text-muted-foreground">
          {t('tools_count', { count: totalTools })}+ - {t('browse_tools')}
        </p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <svg
            className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder={t('search_placeholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border bg-background py-3 pl-10 pr-4 placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Search Results */}
      {searchResults !== null ? (
        <div>
          <p className="mb-4 text-sm text-muted-foreground">
            {searchResults.length} {searchResults.length !== 1 ? t('results') : t('result')} - &quot;{searchQuery}&quot;
          </p>
          {searchResults.length === 0 ? (
            <div className="rounded-lg border bg-card p-8 text-center">
              <p className="text-muted-foreground">{t('no_results')}</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {searchResults.map(({ group, tool }) => (
                <GroupToolCard key={`${group.id}-${tool.id}`} tool={tool} group={group} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Popular Tools */}
          <section className="mb-12">
            <h2 className="mb-4 flex items-center text-xl font-semibold">
              <span className="mr-2">⭐</span>
              {t('popular_tools')}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {popularTools.map(({ group, tool }) => (
                <GroupToolCard key={`${group.id}-${tool.id}`} tool={tool} group={group} />
              ))}
            </div>
          </section>

          {/* All Groups */}
          <section>
            <h2 className="mb-6 text-xl font-semibold">{t('browse_by_category')}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {groups.map((group) => {
                const tools = getToolsSorted(group.id);
                const groupTitle = getGroupTranslation(group.id, 'title', group.title);
                const groupDescription = getGroupTranslation(group.id, 'description', group.description);
                return (
                  <Link
                    key={group.id}
                    href={`/tools/${group.id}`}
                    className="group flex flex-col rounded-lg border bg-card p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
                  >
                    <span className="text-4xl">{group.icon}</span>
                    <h3 className="mt-4 font-semibold group-hover:text-primary">
                      {groupTitle}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {groupDescription}
                    </p>
                    <p className="mt-3 text-xs text-muted-foreground">
                      {tools.length} {tools.length !== 1 ? t('results') : t('result')}
                    </p>
                    <div className="mt-4 flex items-center text-sm text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      <span>{t('browse_tools')}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ml-1"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
