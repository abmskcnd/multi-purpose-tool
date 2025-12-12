'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import type { ToolItem, ToolGroup } from '@/config/tools.registry';

interface GroupToolCardProps {
  tool: ToolItem;
  group: ToolGroup;
}

export function GroupToolCard({ tool, group }: GroupToolCardProps) {
  const t = useTranslations('common');
  const tToolItems = useTranslations('toolItems');
  
  // Try to get translated title/description, fallback to registry values
  const getToolTitle = () => {
    try {
      return tToolItems(`${group.id}.${tool.id}.title`);
    } catch {
      return tool.title;
    }
  };
  
  const getToolDescription = () => {
    try {
      return tToolItems(`${group.id}.${tool.id}.description`);
    } catch {
      return tool.description;
    }
  };

  const toolTitle = getToolTitle();
  const toolDescription = getToolDescription();

  return (
    <Link
      href={`/tools/${group.id}/${tool.id}`}
      className="group relative flex flex-col rounded-lg border bg-card p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
    >
      {/* Status Badge */}
      <div className="absolute right-3 top-3">
        {tool.status === 'coming-soon' && (
          <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-500">
            {t('coming_soon')}
          </span>
        )}
        {tool.status === 'active' && (
          <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-500">
            {t('available')}
          </span>
        )}
      </div>

      {/* Icon */}
      <span className="text-4xl">{tool.icon || group.icon}</span>

      {/* Title */}
      <h3 className="mt-4 font-semibold group-hover:text-primary">{toolTitle}</h3>

      {/* Description */}
      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
        {toolDescription}
      </p>

      {/* Implementation Badge */}
      {tool.implementation && (
        <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
          <svg
            className="h-3 w-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <span className="capitalize">{tool.implementation.replace('-', ' ')}</span>
        </div>
      )}

      {/* Arrow indicator */}
      <div className="mt-4 flex items-center text-sm text-primary opacity-0 transition-opacity group-hover:opacity-100">
        <span>{t('open_tool')}</span>
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
}
