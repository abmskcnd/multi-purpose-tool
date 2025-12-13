'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Tool } from '@/types/tools';

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  const locale = useLocale() as keyof Tool['name'];

  return (
    <Link
      href={`/${locale}/tools/${tool.slug}`}
      className="group relative flex flex-col rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/50"
    >
      {/* Badges */}
      <div className="absolute right-3 top-3 flex gap-1">
        {tool.isNew && (
          <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
            New
          </span>
        )}
        {tool.isPremium && (
          <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700">
            Pro
          </span>
        )}
      </div>

      {/* Icon */}
      <span className="text-4xl">{tool.icon}</span>

      {/* Title */}
      <h3 className="mt-4 font-semibold group-hover:text-primary">
        {tool.name[locale]}
      </h3>

      {/* Description */}
      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
        {tool.description[locale]}
      </p>

      {/* Arrow indicator */}
      <div className="mt-4 flex items-center text-sm text-primary opacity-0 transition-opacity group-hover:opacity-100">
        <span>Open tool</span>
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
