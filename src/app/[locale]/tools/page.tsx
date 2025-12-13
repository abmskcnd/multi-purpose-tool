'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { 
  useToolGroups, 
  usePopularTools, 
  type TransformedTool,
  type ToolWithGroup 
} from '@/hooks/useTools';
import type { ToolStatus, ImplementationType, Locale } from '@/lib/supabase/types';

// Filter state type
interface FilterState {
  category: string;
  status: ToolStatus | 'all';
  implementation: ImplementationType | 'all';
  sortBy: 'popular' | 'newest' | 'a-z';
}

export default function ToolsPage() {
  const t = useTranslations('common');
  const tHome = useTranslations('home');
  const tToolGroups = useTranslations('toolGroups');
  const tToolItems = useTranslations('toolItems');
  const locale = useLocale() as Locale;
  
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    status: 'all',
    implementation: 'all',
    sortBy: 'popular'
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Fetch data from Supabase with fallback
  const { groups, isLoading: isLoadingGroups } = useToolGroups();
  const { tools: popularToolsData } = usePopularTools(8);
  
  // Calculate total tools
  const totalTools = useMemo(() => {
    return groups.reduce((sum, group) => sum + group.tools.length, 0);
  }, [groups]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Get all tools with group info
  const allTools = useMemo(() => {
    return groups.flatMap(group => 
      group.tools.map(tool => ({
        ...tool,
        groupTitle: group.title,
        groupIcon: group.icon,
        groupPriority: group.priority,
      }))
    );
  }, [groups]);

  // Filter and sort tools
  const filteredTools = useMemo(() => {
    let tools = [...allTools];
    
    // Search filter
    if (debouncedSearch.trim()) {
      const lowerQuery = debouncedSearch.toLowerCase();
      tools = tools.filter(t => {
        const title = t.title[locale] || t.title.en;
        const description = t.description[locale] || t.description.en;
        const keywords = t.keywords.join(' ').toLowerCase();
        return (
          title.toLowerCase().includes(lowerQuery) ||
          description.toLowerCase().includes(lowerQuery) ||
          keywords.includes(lowerQuery)
        );
      });
    }
    
    // Category filter
    if (filters.category !== 'all') {
      tools = tools.filter(t => t.groupId === filters.category);
    }
    
    // Status filter
    if (filters.status !== 'all') {
      tools = tools.filter(t => t.status === filters.status);
    }
    
    // Implementation filter
    if (filters.implementation !== 'all') {
      tools = tools.filter(t => t.implementation === filters.implementation);
    }
    
    // Sort
    switch (filters.sortBy) {
      case 'a-z': {
        tools.sort((a, b) => {
          const titleA = a.title[locale] || a.title.en;
          const titleB = b.title[locale] || b.title.en;
          return titleA.localeCompare(titleB);
        });
        break;
      }
      case 'newest':
        // For now, reverse priority order (lower priority = newer assumption)
        tools.sort((a, b) => b.priority - a.priority);
        break;
      case 'popular':
      default:
        tools.sort((a, b) => a.priority - b.priority);
        break;
    }
    
    return tools;
  }, [allTools, debouncedSearch, filters, locale]);

  const hasActiveFilters = filters.category !== 'all' || filters.status !== 'all' || filters.implementation !== 'all';

  const clearFilters = useCallback(() => {
    setFilters({
      category: 'all',
      status: 'all',
      implementation: 'all',
      sortBy: 'popular'
    });
    setSearchQuery('');
  }, []);

  // Helper to get translated group title/description
  const getGroupTranslation = (groupId: string, field: 'title' | 'description', fallbackObj: { [key: string]: string }) => {
    try {
      return tToolGroups(`${groupId}.${field}`);
    } catch {
      return fallbackObj[locale] || fallbackObj.en || '';
    }
  };

  // Helper to get translated tool title
  const getToolTitle = (groupId: string, toolId: string, titleObj: { [key: string]: string }) => {
    try {
      return tToolItems(`${groupId}.${toolId}.title`);
    } catch {
      return titleObj[locale] || titleObj.en || '';
    }
  };

  const getToolDescription = (groupId: string, toolId: string, descObj: { [key: string]: string }) => {
    try {
      return tToolItems(`${groupId}.${toolId}.description`);
    } catch {
      return descObj[locale] || descObj.en || '';
    }
  };

  // Loading state
  if (isLoadingGroups) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
          <p className="mt-4 text-sm text-muted-foreground">{t('loading')}...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          {/* Title Row */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold md:text-3xl">{t('all_tools')}</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {totalTools}+ {t('tools').toLowerCase()} - {t('browse_tools')}
              </p>
            </div>
            
            {/* Desktop Sort */}
            <div className="hidden items-center gap-3 sm:flex">
              <span className="text-sm text-muted-foreground">{t('sort_by')}:</span>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as FilterState['sortBy'] }))}
                className="rounded-lg border bg-background px-3 py-2 text-sm font-medium focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="popular">{tHome('most_popular')}</option>
                <option value="newest">{tHome('newest')}</option>
                <option value="a-z">{tHome('a_to_z')}</option>
              </select>
            </div>
          </div>
          
          {/* Search & Filter Bar */}
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* Search */}
            <div className="relative flex-1">
              <svg
                className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder={t('search_placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border bg-background py-2.5 pl-10 pr-10 placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={t('clear')}
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            
            {/* Filter Toggle (Mobile) */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center justify-center gap-2 rounded-lg border bg-background px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted sm:hidden"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              {t('filters')}
              {hasActiveFilters && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  !
                </span>
              )}
            </button>
            
            {/* Desktop Filters */}
            <div className="hidden gap-2 sm:flex">
              {/* Category Filter */}
              <select
                value={filters.category}
                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                className="rounded-lg border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="all">{t('all_categories')}</option>
                {groups.map(group => (
                  <option key={group.id} value={group.id}>
                    {group.icon} {getGroupTranslation(group.id, 'title', group.title)}
                  </option>
                ))}
              </select>
              
              {/* Status Filter */}
              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value as FilterState['status'] }))}
                className="rounded-lg border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="all">{t('all_status')}</option>
                <option value="active">{t('available')}</option>
                <option value="coming-soon">{t('coming_soon')}</option>
              </select>
              
              {/* Implementation Filter */}
              <select
                value={filters.implementation}
                onChange={(e) => setFilters(prev => ({ ...prev, implementation: e.target.value as FilterState['implementation'] }))}
                className="rounded-lg border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="all">{t('all_types')}</option>
                <option value="client-side">{t('client_side_short')}</option>
                <option value="server-side">{t('server_side_short')}</option>
                <option value="hybrid">{t('hybrid_short')}</option>
              </select>
              
              {/* Clear Filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-primary hover:bg-primary/10 transition-colors"
                >
                  {t('clear_all')}
                </button>
              )}
            </div>
          </div>
          
          {/* Mobile Filter Panel */}
          {isFilterOpen && (
            <div className="mt-3 rounded-lg border bg-muted/50 p-4 sm:hidden">
              <div className="space-y-3">
                {/* Sort */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">{t('sort_by')}</label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as FilterState['sortBy'] }))}
                    className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
                  >
                    <option value="popular">{tHome('most_popular')}</option>
                    <option value="newest">{tHome('newest')}</option>
                    <option value="a-z">{tHome('a_to_z')}</option>
                  </select>
                </div>
                
                {/* Category */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">{t('category')}</label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
                  >
                    <option value="all">{t('all_categories')}</option>
                    {groups.map(group => (
                      <option key={group.id} value={group.id}>
                        {group.icon} {getGroupTranslation(group.id, 'title', group.title)}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Status */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">{t('status')}</label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value as FilterState['status'] }))}
                    className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
                  >
                    <option value="all">{t('all_status')}</option>
                    <option value="active">{t('available')}</option>
                    <option value="coming-soon">{t('coming_soon')}</option>
                  </select>
                </div>
                
                {/* Implementation */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">{t('type')}</label>
                  <select
                    value={filters.implementation}
                    onChange={(e) => setFilters(prev => ({ ...prev, implementation: e.target.value as FilterState['implementation'] }))}
                    className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
                  >
                    <option value="all">{t('all_types')}</option>
                    <option value="client-side">{t('client_side_short')}</option>
                    <option value="server-side">{t('server_side_short')}</option>
                    <option value="hybrid">{t('hybrid_short')}</option>
                  </select>
                </div>
                
                {/* Clear All */}
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="w-full rounded-lg bg-primary/10 py-2 text-sm font-medium text-primary"
                  >
                    {t('clear_all')}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Search/Filter Results Info */}
        {(debouncedSearch || hasActiveFilters) && (
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filteredTools.length} {filteredTools.length !== 1 ? t('results') : t('result')}
              {debouncedSearch && <span> {t('for')} &quot;{debouncedSearch}&quot;</span>}
            </p>
          </div>
        )}

        {/* Empty State */}
        {filteredTools.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <svg className="h-8 w-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold">{t('no_results')}</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              {t('try_different_search')}
            </p>
            <button
              onClick={clearFilters}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              {t('clear_filters')}
            </button>
          </div>
        ) : (
          <>
            {/* Popular Tools Section (only when no filters) */}
            {!debouncedSearch && !hasActiveFilters && popularToolsData.length > 0 && (
              <section className="mb-12">
                <h2 className="mb-4 flex items-center text-lg font-semibold">
                  <span className="mr-2">⭐</span>
                  {t('popular_tools')}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {popularToolsData.slice(0, 4).map((tool) => (
                    <ToolCard 
                      key={`${tool.groupId}-${tool.id}`} 
                      tool={tool} 
                      groupId={tool.groupId}
                      groupIcon={tool.groupIcon}
                      getToolTitle={getToolTitle}
                      getToolDescription={getToolDescription}
                      t={t}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* All Tools / Filtered Tools */}
            <section>
              {!debouncedSearch && !hasActiveFilters && (
                <h2 className="mb-6 text-lg font-semibold">{t('browse_by_category')}</h2>
              )}
              
              {/* Show category groups if no search/filter */}
              {!debouncedSearch && !hasActiveFilters ? (
                <div className="space-y-10">
                  {groups.map((group) => {
                    const tools = group.tools;
                    const groupTitle = getGroupTranslation(group.id, 'title', group.title as { [key: string]: string });

                    return (
                      <div key={group.id}>
                        <div className="mb-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{group.icon}</span>
                            <div>
                              <h3 className="font-semibold">{groupTitle}</h3>
                              <p className="text-sm text-muted-foreground">
                                {tools.length} {tools.length !== 1 ? t('results') : t('result')}
                              </p>
                            </div>
                          </div>
                          <Link
                            href={`/tools/${group.id}`}
                            className="text-sm font-medium text-primary hover:underline"
                          >
                            {t('view_all')} →
                          </Link>
                        </div>
                        
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                          {tools.slice(0, 4).map((tool) => (
                            <ToolCard 
                              key={`${group.id}-${tool.id}`}
                              tool={tool}
                              groupId={group.id}
                              groupIcon={group.icon}
                              getToolTitle={getToolTitle}
                              getToolDescription={getToolDescription}
                              t={t}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Flat grid when searching/filtering */
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredTools.map((tool) => (
                    <ToolCard 
                      key={`${tool.groupId}-${tool.id}`}
                      tool={tool}
                      groupId={tool.groupId}
                      groupIcon={tool.groupIcon}
                      getToolTitle={getToolTitle}
                      getToolDescription={getToolDescription}
                      t={t}
                    />
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}

// Tool Card Component - Matching the new dark theme design
interface ToolCardProps {
  tool: TransformedTool | ToolWithGroup;
  groupId: string;
  groupIcon: string;
  getToolTitle: (groupId: string, toolId: string, titleObj: { [key: string]: string }) => string;
  getToolDescription: (groupId: string, toolId: string, descObj: { [key: string]: string }) => string;
  t: ReturnType<typeof useTranslations>;
}

function ToolCard({ tool, groupId, groupIcon, getToolTitle, getToolDescription, t }: ToolCardProps) {
  const title = getToolTitle(groupId, tool.id, tool.title as { [key: string]: string });
  const description = getToolDescription(groupId, tool.id, tool.description as { [key: string]: string });
  const isComingSoon = tool.status === 'coming-soon';
  const icon = tool.icon || groupIcon;
  
  // Badge logic
  const getBadge = () => {
    if (isComingSoon) {
      return { text: t('coming_soon_badge'), className: 'bg-amber-500/20 text-amber-400 border-amber-500/30' };
    }
    if (tool.status === 'new') {
      return { text: 'NEW', className: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' };
    }
    if (tool.status === 'beta') {
      return { text: 'BETA', className: 'bg-purple-500/20 text-purple-400 border-purple-500/30' };
    }
    return null;
  };
  
  const badge = getBadge();
  
  const cardContent = (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-200 ${
        isComingSoon
          ? 'border-border/50 bg-card/50 cursor-not-allowed'
          : 'border-border bg-card hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5'
      }`}
    >
      {/* Badge */}
      {badge && (
        <div className="absolute right-3 top-3 z-10">
          <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${badge.className}`}>
            {badge.text}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col p-5">
        {/* Icon */}
        <div
          className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition-colors ${
            isComingSoon
              ? 'bg-muted/50'
              : 'bg-primary/10 group-hover:bg-primary/20'
          }`}
        >
          {icon}
        </div>

        {/* Title */}
        <h3
          className={`mb-2 font-bold leading-tight transition-colors ${
            isComingSoon
              ? 'text-muted-foreground'
              : 'text-foreground group-hover:text-primary'
          }`}
        >
          {title}
        </h3>
        
        {/* Description */}
        <p
          className={`line-clamp-2 text-sm ${
            isComingSoon ? 'text-muted-foreground/60' : 'text-muted-foreground'
          }`}
        >
          {description}
        </p>

        {/* Tags Row */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {tool.implementation && (
            <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-[10px] font-medium text-muted-foreground">
              {tool.implementation === 'client-side' ? t('client_side_short') : 
               tool.implementation === 'server-side' ? t('server_side_short') : t('hybrid_short')}
            </span>
          )}
          {tool.tags?.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-muted/70 px-2 py-1 text-[10px] font-medium text-muted-foreground"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Footer Action */}
        <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-4">
          <span
            className={`text-xs font-medium ${
              isComingSoon ? 'text-muted-foreground/50' : 'text-muted-foreground'
            }`}
          >
            {t('free')}
          </span>
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
              isComingSoon
                ? 'bg-muted/50 text-muted-foreground/50'
                : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground'
            }`}
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );

  if (isComingSoon) {
    return <div className="h-full">{cardContent}</div>;
  }

  return (
    <Link href={`/tools/${groupId}/${tool.id}`} className="block h-full">
      {cardContent}
    </Link>
  );
}
