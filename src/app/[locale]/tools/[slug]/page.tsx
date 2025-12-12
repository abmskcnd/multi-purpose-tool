import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getToolBySlug, getAllTools } from '@/config/tools.config';
import { ToolInterface } from '@/components/features';

interface ToolPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export async function generateMetadata({ params }: ToolPageProps) {
  const tool = getToolBySlug(params.slug);
  
  if (!tool) {
    return {
      title: 'Tool Not Found',
    };
  }

  const locale = params.locale as keyof typeof tool.name;

  return {
    title: tool.name[locale],
    description: tool.description[locale],
    keywords: tool.keywords,
  };
}

export function generateStaticParams() {
  const tools = getAllTools();
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

export default async function ToolPage({ params }: ToolPageProps) {
  const tool = getToolBySlug(params.slug);

  if (!tool) {
    notFound();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const t = await getTranslations({ locale: params.locale, namespace: 'tools' });
  const locale = params.locale as keyof typeof tool.name;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Tool Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4">
          <span className="text-5xl">{tool.icon}</span>
          <div>
            <h1 className="text-3xl font-bold">{tool.name[locale]}</h1>
            <p className="mt-2 text-muted-foreground">{tool.description[locale]}</p>
          </div>
        </div>
      </div>

      {/* Tool Interface */}
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <ToolInterface toolId={tool.id} />
      </div>

      {/* Tool Description */}
      <div className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">How to use</h2>
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <ol className="list-decimal pl-6 space-y-2">
            <li>Select or configure your options above</li>
            <li>Click the action button to process</li>
            <li>Download or copy your result</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
