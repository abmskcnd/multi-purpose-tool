'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { getAllGroupsSorted, getToolsSorted } from '@/config/tools.registry';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const t = useTranslations('common');
  const tGroups = useTranslations('toolGroups');
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const groups = getAllGroupsSorted();

  // Close on route change
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

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

  // Extract current group from pathname
  const pathParts = pathname.split('/').filter(Boolean);
  const currentGroup = pathParts[2];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className="fixed inset-y-0 left-0 z-50 w-[85%] max-w-sm bg-background shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label={t('navigation')}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b p-4">
            <Link href="/" className="flex items-center gap-2" onClick={onClose}>
              <span className="text-2xl">🛠️</span>
              <span className="text-lg font-bold">{t('site_name')}</span>
            </Link>
            <button
              onClick={onClose}
              className="rounded-lg p-2 hover:bg-muted transition-colors"
              aria-label={t('close_menu')}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            {/* Main Links */}
            <div className="space-y-1">
              <Link
                href="/"
                onClick={onClose}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                {t('home')}
              </Link>
              <Link
                href="/tools"
                onClick={onClose}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                {t('all_tools')}
              </Link>
            </div>

            {/* Divider */}
            <div className="my-4 border-t" />

            {/* Categories */}
            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t('categories')}
            </p>
            <div className="space-y-1">
              {groups.map((group) => {
                const isExpanded = expandedGroups.has(group.id);
                const isActive = currentGroup === group.id;
                const tools = getToolsSorted(group.id);

                return (
                  <div key={group.id}>
                    <button
                      onClick={() => toggleGroup(group.id)}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'hover:bg-muted'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg w-[25px] h-[28px]">{group.icon}</span>
                        <span className="truncate">{tGroups(`${group.id}.title`)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                          {tools.length}
                        </span>
                        <svg
                          className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
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
                      <div className="ml-4 mt-1 space-y-1 border-l-2 border-muted pl-4">
                        {tools.slice(0, 6).map((tool) => (
                          <Link
                            key={tool.id}
                            href={`/tools/${group.id}/${tool.id}`}
                            onClick={onClose}
                            className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                          >
                            <span className="mr-2">{tool.icon || '•'}</span>
                            {tool.title}
                          </Link>
                        ))}
                        {tools.length > 6 && (
                          <Link
                            href={`/tools/${group.id}`}
                            onClick={onClose}
                            className="block rounded-md px-3 py-2 text-sm text-primary hover:bg-primary/10 transition-colors"
                          >
                            {t('view_all')} ({tools.length - 6} {t('more')})
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="border-t p-4 space-y-2">
            <Link
              href="/about"
              onClick={onClose}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted transition-colors"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t('about')}
            </Link>
            <Link
              href="/contact"
              onClick={onClose}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted transition-colors"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {t('contact')}
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
