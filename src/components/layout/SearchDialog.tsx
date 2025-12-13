'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { TOOL_GROUPS } from '@/config/tools.registry';

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResult {
  type: 'tool' | 'group';
  id: string;
  groupId?: string;
  title: string;
  description: string;
  icon: string;
  href: string;
}

export function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const t = useTranslations('common');
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Build search index
  const searchIndex = useCallback((): SearchResult[] => {
    const items: SearchResult[] = [];
    
    TOOL_GROUPS.forEach((group) => {
      // Add group
      items.push({
        type: 'group',
        id: group.id,
        title: group.title,
        description: group.description,
        icon: group.icon,
        href: `/tools/${group.id}`,
      });
      
      // Add tools
      group.tools.forEach((tool) => {
        items.push({
          type: 'tool',
          id: tool.id,
          groupId: group.id,
          title: tool.title,
          description: tool.description,
          icon: tool.icon || group.icon,
          href: `/tools/${group.id}/${tool.id}`,
        });
      });
    });
    
    return items;
  }, []);

  // Search function
  const search = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) {
      // Show popular/recent items when empty
      const items = searchIndex();
      setResults(items.filter(item => item.type === 'group').slice(0, 6));
      return;
    }

    const items = searchIndex();
    const lowerQuery = searchQuery.toLowerCase();
    
    const filtered = items.filter((item) => {
      return (
        item.title.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery) ||
        item.id.toLowerCase().includes(lowerQuery)
      );
    });

    // Sort: exact matches first, then tools, then groups
    filtered.sort((a, b) => {
      const aExact = a.title.toLowerCase() === lowerQuery ? 1 : 0;
      const bExact = b.title.toLowerCase() === lowerQuery ? 1 : 0;
      if (aExact !== bExact) return bExact - aExact;
      
      if (a.type !== b.type) return a.type === 'tool' ? -1 : 1;
      return 0;
    });

    setResults(filtered.slice(0, 10));
  }, [searchIndex]);

  // Handle query change
  useEffect(() => {
    const timer = setTimeout(() => {
      search(query);
    }, 150);
    return () => clearTimeout(timer);
  }, [query, search]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (results[selectedIndex]) {
            router.push(results[selectedIndex].href);
            onClose();
          }
          break;
        case 'Escape':
          onClose();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, router, onClose]);

  // Global keyboard shortcut
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (!isOpen) {
          // This would need to be handled by parent
        } else {
          onClose();
        }
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm animate-in fade-in-0"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="fixed left-1/2 top-[15%] z-50 w-full max-w-lg -translate-x-1/2 px-4 animate-in fade-in-0 zoom-in-95 slide-in-from-top-2">
        <div className="overflow-hidden rounded-2xl border bg-card shadow-2xl">
          {/* Search Input */}
          <div className="flex items-center gap-3 border-b px-4 py-3">
            <svg
              className="h-5 w-5 shrink-0 text-muted-foreground"
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
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('search_placeholder')}
              className="h-10 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
            />
            <kbd className="hidden rounded-md border bg-muted px-2 py-1 text-xs font-medium text-muted-foreground sm:inline">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <div className="max-h-[400px] overflow-y-auto p-2">
            {results.length === 0 && query && (
              <div className="px-4 py-8 text-center text-muted-foreground">
                <svg
                  className="mx-auto mb-3 h-10 w-10 opacity-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p>{t('no_results')}</p>
                <p className="mt-1 text-sm">{t('try_different_search')}</p>
              </div>
            )}

            {results.length > 0 && (
              <div className="space-y-1">
                {!query && (
                  <p className="px-3 py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {t('categories')}
                  </p>
                )}
                {results.map((result, index) => (
                  <button
                    key={`${result.type}-${result.id}`}
                    onClick={() => {
                      router.push(result.href);
                      onClose();
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors ${
                      selectedIndex === index
                        ? 'bg-primary/10 text-primary'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xl ${
                        selectedIndex === index ? 'bg-primary/20' : 'bg-muted'
                      }`}
                    >
                      {result.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate font-medium">{result.title}</span>
                        {result.type === 'group' && (
                          <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium uppercase text-muted-foreground">
                            {t('category')}
                          </span>
                        )}
                      </div>
                      <p className="truncate text-sm text-muted-foreground">
                        {result.description}
                      </p>
                    </div>
                    <svg
                      className={`h-4 w-4 shrink-0 ${
                        selectedIndex === index ? 'text-primary' : 'text-muted-foreground'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t bg-muted/50 px-4 py-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <kbd className="rounded border bg-background px-1.5 py-0.5 font-mono">↑↓</kbd>
                navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rounded border bg-background px-1.5 py-0.5 font-mono">↵</kbd>
                select
              </span>
            </div>
            <span className="flex items-center gap-1">
              <kbd className="rounded border bg-background px-1.5 py-0.5 font-mono">esc</kbd>
              close
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
