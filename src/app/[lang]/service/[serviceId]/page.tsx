import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReviewSection from '@/components/ReviewSection';
import { getAllAIServices, getAIServiceById } from '@/lib/data';
import { generateSEO } from '@/lib/seo';
import type { Metadata } from 'next';
import { Locale, locales, getPricingLabel } from '@/lib/i18n';

interface ServicePageProps {
  params: Promise<{ lang: Locale; serviceId: string }>;
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { lang, serviceId } = await params;
  const service = getAIServiceById(serviceId, lang);

  if (!service) {
    return {};
  }

  return generateSEO({
    title: `${service.name} - AI Service Review`,
    description: service.description,
    url: `/${lang}/service/${serviceId}`,
    locale: lang,
  });
}

export async function generateStaticParams() {
  const services = getAllAIServices('zh');
  return locales.flatMap((lang) =>
    services.map((service) => ({
      lang,
      serviceId: service.id,
    }))
  );
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { lang, serviceId } = await params;
  const service = getAIServiceById(serviceId, lang);

  if (!service) {
    notFound();
  }

  const pricingColors = {
    free: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    freemium: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    paid: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* 返回按钮 */}
      <Link
        href={`/${lang}/category/${service.category}`}
        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6"
      >
        ← Back to category
      </Link>

      {/* 服务头部 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 mb-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {service.name}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              {service.description}
            </p>
          </div>
          {service.pricing && (
            <span className={`px-4 py-2 text-sm font-medium rounded-full ${pricingColors[service.pricing]}`}>
              {getPricingLabel(lang, service.pricing)}
            </span>
          )}
        </div>

        {/* 标签 */}
        <div className="flex flex-wrap gap-2 mb-6">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 访问按钮 */}
        <a
          href={service.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Visit Website
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>

      {/* 评论与评分部分 */}
      <ReviewSection serviceId={serviceId} locale={lang} />
    </div>
  );
}
