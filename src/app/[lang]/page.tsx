import SearchBar from '@/components/SearchBar';
import AIServiceCard from '@/components/AIServiceCard';
import CategoryCard from '@/components/CategoryCard';
import { getAllAIServices, getAllCategories, getFeaturedAIServices, getAIServicesByCategory } from '@/lib/data';
import { getDictionary, Locale } from '@/lib/i18n';
import { generateSEO } from '@/lib/seo';
import type { Metadata } from 'next';
import { locales } from '@/lib/i18n';

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const dictionary = getDictionary(lang);

  return generateSEO({
    locale: lang,
    title: dictionary.siteName,
    description: dictionary.siteDescription,
    url: `/${lang}`,
  });
}

export default async function Home({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dictionary = getDictionary(lang);
  const categories = getAllCategories(lang);
  const featuredServices = getFeaturedAIServices(lang);
  const allServices = getAllAIServices(lang);

  const categoryCounts = categories.map((category) => ({
    ...category,
    count: getAIServicesByCategory(category.id, lang).length,
  }));

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {dictionary.hero.title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          {dictionary.hero.subtitle}
        </p>
        <SearchBar
          locale={lang}
          placeholder={dictionary.search.placeholder}
          buttonText={dictionary.search.button}
        />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center border border-gray-200 dark:border-gray-700">
          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            {allServices.length}
          </div>
          <div className="text-gray-600 dark:text-gray-300">{dictionary.stats.tools}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center border border-gray-200 dark:border-gray-700">
          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            {categories.length}
          </div>
          <div className="text-gray-600 dark:text-gray-300">{dictionary.stats.categories}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center border border-gray-200 dark:border-gray-700">
          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            {featuredServices.length}
          </div>
          <div className="text-gray-600 dark:text-gray-300">{dictionary.stats.featured}</div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          {dictionary.sections.browseCategories}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categoryCounts.map((category) => (
            <CategoryCard key={category.id} category={category} count={category.count} locale={lang} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          {dictionary.sections.featured}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredServices.map((service) => (
            <AIServiceCard key={service.id} service={service} locale={lang} />
          ))}
        </div>
      </section>
    </div>
  );
}
