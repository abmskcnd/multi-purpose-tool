import { notFound } from 'next/navigation';
import { getGroup, getToolsSorted, getAllGroupsSorted } from '@/config/tools.registry';
import { Breadcrumbs, GroupToolCard } from '@/components/ui';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';

interface GroupPageProps {
  params: Promise<{
    locale: string;
    group: string;
  }>;
}

export async function generateMetadata({ params }: GroupPageProps) {
  const { group: groupId } = await params;
  const group = getGroup(groupId);
  const t = await getTranslations('common');
  const tToolGroups = await getTranslations('toolGroups');

  if (!group) {
    return {
      title: t('group_not_found'),
    };
  }

  // Try to get translated values, fallback to registry
  let groupTitle = group.title;
  let groupDescription = group.description;
  
  try {
    groupTitle = tToolGroups(`${groupId}.title`);
    groupDescription = tToolGroups(`${groupId}.description`);
  } catch {
    // Use fallback values from registry
  }

  return {
    title: `${groupTitle} | ToolHub`,
    description: groupDescription,
  };
}

export function generateStaticParams() {
  const groups = getAllGroupsSorted();
  const params: Array<{ locale: string; group: string }> = [];
  
  for (const locale of routing.locales) {
    for (const group of groups) {
      params.push({
        locale,
        group: group.id,
      });
    }
  }
  
  return params;
}

export default async function GroupPage({ params }: GroupPageProps) {
  const { locale, group: groupId } = await params;
  
  // Enable static rendering with correct locale
  setRequestLocale(locale);
  const group = getGroup(groupId);
  const t = await getTranslations('common');
  const tToolGroups = await getTranslations('toolGroups');

  if (!group) {
    notFound();
  }

  const tools = getToolsSorted(groupId);

  // Try to get translated values, fallback to registry
  let groupTitle = group.title;
  let groupDescription = group.description;
  
  try {
    groupTitle = tToolGroups(`${groupId}.title`);
    groupDescription = tToolGroups(`${groupId}.description`);
  } catch {
    // Use fallback values from registry
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: t('tools'), href: '/tools' },
          { label: groupTitle },
        ]}
      />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4">
          <span className="text-5xl">{group.icon}</span>
          <div>
            <h1 className="text-3xl font-bold">{groupTitle}</h1>
            <p className="mt-2 text-muted-foreground">{groupDescription}</p>
          </div>
        </div>
      </div>

      {/* Tool Count */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          {tools.length === 1 
            ? t('tools_in_category', { count: tools.length })
            : t('tools_in_category_plural', { count: tools.length })
          }
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
