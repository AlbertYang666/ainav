import SubmitForm from '@/components/SubmitForm';
import { generateSEO } from '@/lib/seo';
import type { Metadata } from 'next';
import { getDictionary, Locale, locales } from '@/lib/i18n';
import { getAllCategories } from '@/lib/data';

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const dictionary = getDictionary(lang);

  return generateSEO({
    title: dictionary.submit.title,
    description: dictionary.submit.subtitle,
    url: `/${lang}/submit`,
    locale: lang,
  });
}

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function SubmitPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dictionary = getDictionary(lang);
  const categories = getAllCategories(lang);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {dictionary.submit.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {dictionary.submit.subtitle}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
          <SubmitForm locale={lang} categories={categories} />
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {dictionary.submit.flowTitle}
          </h2>
          <div className="space-y-4">
            {dictionary.submit.flowSteps.map((step, index) => (
              <div key={step.title} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 p-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            {dictionary.submit.requirementsTitle}
          </h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            {dictionary.submit.requirements.map((item) => (
              <li key={item} className="flex items-start">
                <span className="mr-2">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
