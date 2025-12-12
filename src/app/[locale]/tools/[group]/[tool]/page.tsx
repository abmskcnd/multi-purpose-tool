import { notFound } from 'next/navigation';
import { getGroup, getTool, getAllGroupsSorted, getToolsSorted } from '@/config/tools.registry';
import { Breadcrumbs, ComingSoon } from '@/components/ui';
import { getToolComponent } from '@/config/tool-components';

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

  if (!group || !tool) {
    return {
      title: 'Tool Not Found',
    };
  }

  return {
    title: `${tool.title} - ${group.title} | ToolHub`,
    description: tool.description,
    keywords: tool.keywords,
  };
}

export function generateStaticParams() {
  const params: Array<{ group: string; tool: string }> = [];
  const groups = getAllGroupsSorted();

  for (const group of groups) {
    const tools = getToolsSorted(group.id);
    for (const tool of tools) {
      params.push({
        group: group.id,
        tool: tool.id,
      });
    }
  }

  return params;
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { group: groupId, tool: toolId } = await params;
  const group = getGroup(groupId);
  const tool = getTool(groupId, toolId);

  if (!group || !tool) {
    notFound();
  }

  // Get the implemented tool component (if exists)
  const ToolComponent = getToolComponent(groupId, toolId);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Tools', href: '/tools' },
          { label: group.title, href: `/tools/${group.id}` },
          { label: tool.title },
        ]}
      />

      {/* Tool Content */}
      <div className="rounded-lg border bg-card shadow-sm">
        {ToolComponent ? (
          /* Render the implemented tool */
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">{tool.title}</h1>
              <p className="mt-1 text-muted-foreground">{tool.description}</p>
            </div>
            <ToolComponent />
          </div>
        ) : tool.status === 'coming-soon' ? (
          <ComingSoon tool={tool} group={group} />
        ) : (
          /* Placeholder for tools marked active but not yet implemented */
          <div className="p-6">
            <h1 className="text-2xl font-bold">{tool.title}</h1>
            <p className="mt-2 text-muted-foreground">{tool.description}</p>
            <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg">
              <p className="text-sm text-amber-700 dark:text-amber-300">
                This tool is marked as active but implementation is pending.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
