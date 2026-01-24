import { notFound } from 'next/navigation';
import AIServiceCard from '@/components/AIServiceCard';
import { getAllCategories, getCategoryById, getAIServicesByCategory } from '@/lib/data';
import { generateSEO } from '@/lib/seo';
import { getAllRatings } from '@/lib/supabase';
import type { Metadata } from 'next';
import { getDictionary, Locale, locales } from '@/lib/i18n';

interface CategoryPageProps {
  params: Promise<{ lang: Locale; id: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { lang, id } = await params;
  const dictionary = getDictionary(lang);
  const category = getCategoryById(id, lang);

  if (!category) {
    return {};
  }

  return generateSEO({
    title: category.name,
    description: `${category.description} - ${dictionary.sections.browseCategories}`,
    url: `/${lang}/category/${id}`,
    locale: lang,
  });
}

export async function generateStaticParams() {
  const categories = getAllCategories('zh');
  return locales.flatMap((lang) =>
    categories.map((category) => ({
      lang,
      id: category.id,
    }))
  );
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { lang, id } = await params;
  const dictionary = getDictionary(lang);
  const category = getCategoryById(id, lang);

  if (!category) {
    notFound();
  }

  const services = getAIServicesByCategory(id, lang);
  const ratingsMap = await getAllRatings();

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
          {dictionary.category.count(services.length)}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <AIServiceCard 
            key={service.id} 
            service={service} 
            locale={lang} 
            rating={ratingsMap.get(service.id) || null}
          />
        ))}
      </div>

      {services.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            {dictionary.category.empty}
          </p>
        </div>
      )}
    </div>
  );
}
