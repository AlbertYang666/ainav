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
    <div className="min-h-screen relative">
      {/* Background Gradient */}
      <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-blue-100 dark:bg-blue-900/10 blur-[100px] rounded-full -z-10 pointer-events-none" />
      
      <div className="container mx-auto px-4 py-16">
        <div className="mb-16 relative">
           <div className="flex flex-col md:flex-row items-center md:items-start md:gap-8 text-center md:text-left">
            <div className="text-8xl mb-6 md:mb-0 p-6 bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700">
              {category.icon}
            </div>
            <div className="flex-1 pt-4">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
                {category.name}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-4 max-w-2xl leading-relaxed">
                {category.description}
              </p>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-medium text-sm">
                {dictionary.category.count(services.length)}
              </div>
            </div>
          </div>
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
          <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {dictionary.category.empty}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
