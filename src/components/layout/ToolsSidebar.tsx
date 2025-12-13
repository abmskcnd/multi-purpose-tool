'use client';

import { useState, useMemo, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { getAllGroupsSorted, getToolsSorted, searchTools } from '@/config/tools.registry';

interface ToolsSidebarProps {
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function ToolsSidebar({ isCollapsed = false, onToggleCollapse }: ToolsSidebarProps) {
  const pathname = usePathname();
  const t = useTranslations('toolGroups');
  const tCommon = useTranslations('common');
  const tToolItems = useTranslations('toolItems');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const groups = useMemo(() => getAllGroupsSorted(), []);
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    return searchTools(searchQuery);
  }, [searchQuery]);

  // Extract current group and tool from pathname
  const pathParts = pathname.split('/').filter(Boolean);
  const currentGroup = pathParts[2]; // [locale]/tools/[group]
  const currentTool = pathParts[3]; // [locale]/tools/[group]/[tool]

  const toggleGroup = useCallback((groupId: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(groupId)) {
        next.delete(groupId);
      } else {
        next.add(groupId);
      }
      return next;
    });
  }, []);

  const isGroupExpanded = useCallback((groupId: string) => {
    return expandedGroups.has(groupId) || currentGroup === groupId;
  }, [expandedGroups, currentGroup]);

  const isToolsHome = pathname.endsWith('/tools') || pathname.endsWith('/tools/');

  // Collapsed sidebar for desktop
  if (isCollapsed) {
    return (
      <aside className="hidden lg:flex w-16 flex-col border-r bg-muted/30">
        <div className="sticky top-16 h-[calc(100vh-4rem)] flex flex-col items-center py-4">
          {/* Expand Button */}
          <button
            onClick={onToggleCollapse}
            className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg hover:bg-muted transition-colors"
            aria-label={tCommon('expand_sidebar')}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </button>

          {/* Icons only */}
          <nav className="flex flex-col items-center gap-1 overflow-y-auto custom-scrollbar">
            <Link
              href="/tools"
              className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
                isToolsHome ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
              }`}
              title={tCommon('all_tools')}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </Link>
            {groups.slice(0, 10).map((group) => (
              <Link
                key={group.id}
                href={`/tools/${group.id}`}
                className={`flex h-10 w-10 items-center justify-center rounded-lg text-lg transition-colors ${
                  currentGroup === group.id ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
                }`}
                title={t(`${group.id}.title`)}
              >
                {group.icon}
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    );
  }

  return (
    <aside className="hidden md:flex w-72 flex-shrink-0 flex-col border-r bg-muted/20">
      <div className="sticky top-16 h-[calc(100vh-4rem)] flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 border-b p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold">{tCommon('tools')}</h2>
            {onToggleCollapse && (
              <button
                onClick={onToggleCollapse}
                className="hidden lg:flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted transition-colors"
                aria-label={tCommon('collapse_sidebar')}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              </button>
            )}
          </div>

          {/* Search */}
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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
              placeholder={tCommon('search_placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border bg-background py-2.5 pl-10 pr-8 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label={tCommon('clear')}
              >
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Navigation - Scrollable */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-3">
          {/* Search Results */}
          {searchResults !== null ? (
            <div className="space-y-1">
              <p className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                {searchResults.length} {searchResults.length !== 1 ? tCommon('results') : tCommon('result')}
              </p>
              {searchResults.length === 0 ? (
                <div className="py-8 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <svg className="h-6 w-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {tCommon('no_tools_found')} &quot;{searchQuery}&quot;
                  </p>
                </div>
              ) : (
                <div className="space-y-0.5">
                  {searchResults.slice(0, 15).map(({ group, tool }) => {
                    let toolTitle = tool.title;
                    try {
                      const translated = tToolItems(`${group.id}.${tool.id}.title`);
                      if (translated) toolTitle = translated;
                    } catch {
                      // Use fallback
                    }
                    return (
                      <Link
                        key={`${group.id}-${tool.id}`}
                        href={`/tools/${group.id}/${tool.id}`}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all hover:bg-muted group"
                      >
                        <span className="text-lg opacity-80 group-hover:opacity-100 transition-opacity">
                          {tool.icon || group.icon}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="truncate font-medium group-hover:text-primary transition-colors">
                            {toolTitle}
                          </div>
                          <div className="truncate text-xs text-muted-foreground">
                            {t(`${group.id}.title`)}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            /* Groups Navigation */
            <nav className="space-y-1">
              {/* All Tools Link */}
              <Link
                href="/tools"
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                  isToolsHome
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'hover:bg-muted'
                }`}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
                <span>{tCommon('all_tools')}</span>
              </Link>

              {/* Divider */}
              <div className="my-3 border-t" />

              {/* Categories Label */}
              <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {tCommon('categories')}
              </p>

              {/* Groups */}
              <div className="space-y-0.5">
                {groups.map((group) => {
                  const isActive = currentGroup === group.id;
                  const isExpanded = isGroupExpanded(group.id);
                  const tools = getToolsSorted(group.id);

                  return (
                    <div key={group.id}>
                      {/* Group Header */}
                      <button
                        onClick={() => toggleGroup(group.id)}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-all group ${
                          isActive
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'hover:bg-muted'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="text-lg flex-shrink-0 w-[25px] h-[28px]">{group.icon}</span>
                          <span className="truncate">{t(`${group.id}.title`)}</span>
                        </div>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                            {tools.length}
                          </span>
                          <svg
                            className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </button>

                      {/* Expanded Tools */}
                      {isExpanded && (
                        <div className="mt-1 ml-3 pl-3 border-l-2 border-border space-y-0.5">
                          {/* View All Link */}
                          <Link
                            href={`/tools/${group.id}`}
                            className={`flex items-center gap-2 rounded-md px-2.5 py-2 text-xs transition-all ${
                              isActive && !currentTool
                                ? 'bg-primary text-primary-foreground font-medium'
                                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                            }`}
                          >
                            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                            </svg>
                            <span>{tCommon('view_all')}</span>
                          </Link>

                          {/* Tool Links */}
                          {tools.slice(0, 5).map((tool) => {
                            const isToolActive = currentTool === tool.id;
                            let toolTitle = tool.title;
                            try {
                              const translated = tToolItems(`${group.id}.${tool.id}.title`);
                              if (translated) toolTitle = translated;
                            } catch {
                              // Use fallback
                            }
                            return (
                              <Link
                                key={tool.id}
                                href={`/tools/${group.id}/${tool.id}`}
                                className={`flex items-center gap-2 rounded-md px-2.5 py-2 text-xs transition-all ${
                                  isToolActive
                                    ? 'bg-primary text-primary-foreground font-medium'
                                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                }`}
                              >
                                <span className="flex-shrink-0">{tool.icon || '•'}</span>
                                <span className="truncate">{toolTitle}</span>
                              </Link>
                            );
                          })}

                          {/* More Link */}
                          {tools.length > 5 && (
                            <Link
                              href={`/tools/${group.id}`}
                              className="flex items-center gap-1 px-2.5 py-2 text-xs text-primary hover:text-primary/80 transition-colors"
                            >
                              <span>+{tools.length - 5} {tCommon('more')}</span>
                              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </nav>
          )}
        </div>
      </div>
    </aside>
  );
}
