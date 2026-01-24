import AIServiceCard from '@/components/AIServiceCard';
import { getAllAIServices } from '@/lib/data';
import { getDictionary, Locale, locales } from '@/lib/i18n';
import { generateSEO } from '@/lib/seo';
import { getAllRatings } from '@/lib/supabase';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const dictionary = getDictionary(lang);

  return generateSEO({
    locale: lang,
    title: `${dictionary.stats.tools} - ${dictionary.siteName}`,
    description: dictionary.siteDescription,
    url: `/${lang}/tools`,
  });
}

export default async function AllToolsPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dictionary = getDictionary(lang);
  const allServices = getAllAIServices(lang);
  
  // Get all ratings data
  const ratingsMap = await getAllRatings();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            href={`/${lang}`}
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{dictionary.common?.back || 'Back'}</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {dictionary.stats.tools}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {dictionary.category.count(allServices.length)}
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allServices.map((service) => (
            <AIServiceCard
              key={service.id}
              service={service}
              locale={lang}
              rating={ratingsMap.get(service.id) || null}
            />
          ))}
        </div>

        {/* Empty State */}
        {allServices.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {dictionary.category.empty}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
