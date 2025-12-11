import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { ToolCard } from '@/components/shared/ToolCard';
import { getAllTools, getToolsByCategory } from '@/config/tools.config';
import { TOOL_CATEGORIES } from '@/config/constants';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'common' });

  return {
    title: t('tools'),
    description: 'Browse all available tools',
  };
}

export default function ToolsPage() {
  const t = useTranslations('categories');
  const allTools = getAllTools();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">All Tools</h1>

      {TOOL_CATEGORIES.map((category) => {
        const categoryTools = getToolsByCategory(category.id);
        if (categoryTools.length === 0) return null;

        return (
          <section key={category.id} className="mb-12">
            <h2 className="mb-4 flex items-center text-xl font-semibold">
              <span className="mr-2">{category.icon}</span>
              {t(category.id)}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {categoryTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
