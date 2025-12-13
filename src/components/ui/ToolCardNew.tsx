'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import type { ToolItem } from '@/config/tools.registry';

interface ToolCardNewProps {
  tool: ToolItem;
  groupId: string;
  groupIcon?: string;
}

export function ToolCardNew({ tool, groupId, groupIcon }: ToolCardNewProps) {
  const t = useTranslations('common');
  
  const isComingSoon = tool.status === 'coming-soon';
  const icon = tool.icon || groupIcon || '🔧';
  
  // Get badge info based on status
  const getBadge = () => {
    if (isComingSoon) {
      return {
        text: t('coming_soon_badge'),
        className: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      };
    }
    if (tool.status === 'new') {
      return {
        text: 'NEW',
        className: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      };
    }
    if (tool.status === 'beta') {
      return {
        text: 'BETA',
        className: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      };
    }
    return null;
  };

  // Get implementation tag
  const getImplementationTag = () => {
    switch (tool.implementation) {
      case 'client-side':
        return { text: t('client_side_short'), icon: '🖥️' };
      case 'server-side':
        return { text: t('server_side_short'), icon: '☁️' };
      case 'hybrid':
        return { text: t('hybrid_short'), icon: '🔄' };
      default:
        return null;
    }
  };

  const badge = getBadge();
  const implTag = getImplementationTag();
  const href = `/tools/${groupId}/${tool.id}`;

  const cardContent = (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-200 ${
        isComingSoon
          ? 'border-border/50 bg-card/50 cursor-not-allowed'
          : 'border-border bg-card hover:border-primary/40 hover:bg-card/80 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5'
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

        {/* Title & Description */}
        <h3
          className={`mb-2 font-bold leading-tight transition-colors ${
            isComingSoon
              ? 'text-muted-foreground'
              : 'text-foreground group-hover:text-primary'
          }`}
        >
          {tool.title}
        </h3>
        <p
          className={`line-clamp-2 text-sm ${
            isComingSoon ? 'text-muted-foreground/60' : 'text-muted-foreground'
          }`}
        >
          {tool.description}
        </p>

        {/* Tags Row */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {implTag && (
            <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-[10px] font-medium text-muted-foreground">
              {implTag.text}
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
    <Link href={href} className="block h-full">
      {cardContent}
    </Link>
  );
}

// Horizontal variant for lists
interface ToolCardHorizontalProps {
  tool: ToolItem;
  groupId: string;
  groupIcon?: string;
}

export function ToolCardHorizontal({ tool, groupId, groupIcon }: ToolCardHorizontalProps) {
  const t = useTranslations('common');
  
  const isComingSoon = tool.status === 'coming-soon';
  const icon = tool.icon || groupIcon || '🔧';
  const href = `/tools/${groupId}/${tool.id}`;

  // Get badge
  const getBadge = () => {
    if (isComingSoon) {
      return { text: t('coming_soon_badge'), className: 'bg-amber-500/20 text-amber-400' };
    }
    if (tool.status === 'new') {
      return { text: 'NEW', className: 'bg-emerald-500/20 text-emerald-400' };
    }
    return { text: t('free'), className: 'bg-primary/10 text-primary' };
  };

  const badge = getBadge();

  const cardContent = (
    <div
      className={`group flex items-start gap-4 rounded-2xl border p-4 transition-all ${
        isComingSoon
          ? 'border-border/50 bg-card/50 cursor-not-allowed'
          : 'border-border bg-card hover:border-primary/40 hover:bg-card/80'
      }`}
    >
      {/* Icon */}
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl transition-colors ${
          isComingSoon
            ? 'bg-muted/50'
            : 'bg-primary/10 group-hover:bg-primary/20'
        }`}
      >
        {icon}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center justify-between gap-2">
          <h4
            className={`truncate font-bold transition-colors ${
              isComingSoon
                ? 'text-muted-foreground'
                : 'text-foreground group-hover:text-primary'
            }`}
          >
            {tool.title}
          </h4>
          <span
            className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${badge.className}`}
          >
            {badge.text}
          </span>
        </div>
        <p
          className={`line-clamp-2 text-sm ${
            isComingSoon ? 'text-muted-foreground/60' : 'text-muted-foreground'
          }`}
        >
          {tool.description}
        </p>
        
        {/* Tags */}
        <div className="mt-2 flex flex-wrap gap-2">
          {tool.tags?.slice(0, 3).map((tag: string) => (
            <span
              key={tag}
              className="text-[10px] font-mono text-muted-foreground/70"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  if (isComingSoon) {
    return cardContent;
  }

  return (
    <Link href={href} className="block">
      {cardContent}
    </Link>
  );
}
