import { notFound } from 'next/navigation';
import AIServiceCard from '@/components/AIServiceCard';
import { getAllCategories, getCategoryById, getAIServicesByCategory } from '@/lib/data';
import { generateSEO } from '@/lib/seo';
import type { Metadata } from 'next';

interface CategoryPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { id } = await params;
  const category = getCategoryById(id);
  
  if (!category) {
    return {};
  }

  return generateSEO({
    title: category.name,
    description: `${category.description} - 浏览所有${category.name}相关的AI工具`,
    url: `/category/${id}`,
  });
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    id: category.id,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { id } = await params;
  const category = getCategoryById(id);
  
  if (!category) {
    notFound();
  }

  const services = getAIServicesByCategory(id);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-6xl">{category.icon}</span>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              {category.name}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mt-2">
              {category.description}
            </p>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          共找到 {services.length} 个工具
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <AIServiceCard key={service.id} service={service} />
        ))}
      </div>

      {services.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            该分类下暂无工具
          </p>
        </div>
      )}
    </div>
  );
}
