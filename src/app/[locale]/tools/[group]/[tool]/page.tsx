import { notFound } from 'next/navigation';
import { getGroup, getTool, getAllGroupsSorted, getToolsSorted } from '@/config/tools.registry';
import { Breadcrumbs, ComingSoon } from '@/components/ui';
import { getToolComponent } from '@/config/tool-components';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';

interface ToolPageProps {
  params: Promise<{
    locale: string;
    group: string;
    tool: string;
  }>;
}

export async function generateMetadata({ params }: ToolPageProps) {
  const { group: groupId, tool: toolId } = await params;
  const group = getGroup(groupId);
  const tool = getTool(groupId, toolId);
  const t = await getTranslations('common');
  const tToolItems = await getTranslations('toolItems');
  const tToolGroups = await getTranslations('toolGroups');

  if (!group || !tool) {
    return {
      title: t('tool_not_found'),
    };
  }

  // Try to get translated values, fallback to registry
  let toolTitle = tool.title;
  let toolDescription = tool.description;
  let groupTitle = group.title;
  
  try {
    toolTitle = tToolItems(`${groupId}.${toolId}.title`);
    toolDescription = tToolItems(`${groupId}.${toolId}.description`);
    groupTitle = tToolGroups(`${groupId}.title`);
  } catch {
    // Use fallback values from registry
  }

  return {
    title: `${toolTitle} - ${groupTitle} | ToolHub`,
    description: toolDescription,
    keywords: tool.keywords,
  };
}

export function generateStaticParams() {
  const params: Array<{ locale: string; group: string; tool: string }> = [];
  const groups = getAllGroupsSorted();

  for (const locale of routing.locales) {
    for (const group of groups) {
      const tools = getToolsSorted(group.id);
      for (const tool of tools) {
        params.push({
          locale,
          group: group.id,
          tool: tool.id,
        });
      }
    }
  }

  return params;
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { locale, group: groupId, tool: toolId } = await params;
  
  // Enable static rendering with correct locale
  setRequestLocale(locale);
  const group = getGroup(groupId);
  const tool = getTool(groupId, toolId);
  const t = await getTranslations('common');
  const tToolItems = await getTranslations('toolItems');
  const tToolGroups = await getTranslations('toolGroups');

  if (!group || !tool) {
    notFound();
  }

  // Get the implemented tool component (if exists)
  const ToolComponent = getToolComponent(groupId, toolId);

  // Try to get translated values, fallback to registry
  let toolTitle = tool.title;
  let toolDescription = tool.description;
  let groupTitle = group.title;
  
  try {
    toolTitle = tToolItems(`${groupId}.${toolId}.title`);
    toolDescription = tToolItems(`${groupId}.${toolId}.description`);
    groupTitle = tToolGroups(`${groupId}.title`);
  } catch {
    // Use fallback values from registry
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: t('tools'), href: '/tools' },
          { label: groupTitle, href: `/tools/${group.id}` },
          { label: toolTitle },
        ]}
      />

      {/* Tool Content */}
      <div className="rounded-lg border bg-card shadow-sm">
        {ToolComponent ? (
          /* Render the implemented tool */
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">{toolTitle}</h1>
              <p className="mt-1 text-muted-foreground">{toolDescription}</p>
            </div>
            <ToolComponent />
          </div>
        ) : tool.status === 'coming-soon' ? (
          <ComingSoon tool={tool} group={group} />
        ) : (
          /* Placeholder for tools marked active but not yet implemented */
          <div className="p-6">
            <h1 className="text-2xl font-bold">{toolTitle}</h1>
            <p className="mt-2 text-muted-foreground">{toolDescription}</p>
            <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg">
              <p className="text-sm text-amber-700 dark:text-amber-300">
                {t('tool_pending_implementation')}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
