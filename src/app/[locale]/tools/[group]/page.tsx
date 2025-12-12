import { notFound } from 'next/navigation';
import { getGroup, getToolsSorted, getAllGroupsSorted } from '@/config/tools.registry';
import { Breadcrumbs, GroupToolCard } from '@/components/ui';

interface GroupPageProps {
  params: Promise<{
    locale: string;
    group: string;
  }>;
}

export async function generateMetadata({ params }: GroupPageProps) {
  const { group: groupId } = await params;
  const group = getGroup(groupId);

  if (!group) {
    return {
      title: 'Group Not Found',
    };
  }

  return {
    title: `${group.title} | ToolHub`,
    description: group.description,
  };
}

export function generateStaticParams() {
  const groups = getAllGroupsSorted();
  return groups.map((group) => ({
    group: group.id,
  }));
}

export default async function GroupPage({ params }: GroupPageProps) {
  const { group: groupId } = await params;
  const group = getGroup(groupId);

  if (!group) {
    notFound();
  }

  const tools = getToolsSorted(groupId);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Tools', href: '/tools' },
          { label: group.title },
        ]}
      />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4">
          <span className="text-5xl">{group.icon}</span>
          <div>
            <h1 className="text-3xl font-bold">{group.title}</h1>
            <p className="mt-2 text-muted-foreground">{group.description}</p>
          </div>
        </div>
      </div>

      {/* Tool Count */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          {tools.length} tool{tools.length !== 1 ? 's' : ''} in this category
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tools.map((tool) => (
          <GroupToolCard key={tool.id} tool={tool} group={group} />
        ))}
      </div>
    </div>
  );
}
