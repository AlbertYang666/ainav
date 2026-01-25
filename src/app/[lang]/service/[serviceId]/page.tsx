import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReviewSection from '@/components/ReviewSection';
import { getAllAIServices, getAIServiceById, getCategoryById } from '@/lib/data';
import { generateSEO, generateProductSchema, generateBreadcrumbSchema } from '@/lib/seo';
import type { Metadata } from 'next';
import { Locale, locales, getPricingLabel, getDictionary } from '@/lib/i18n';
import { getServiceRating } from '@/lib/supabase';

interface ServicePageProps {
  params: Promise<{ lang: Locale; serviceId: string }>;
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { lang, serviceId } = await params;
  const service = getAIServiceById(serviceId, lang);

  if (!service) {
    return {};
  }

  const rating = await getServiceRating(serviceId);
  const keywords = [
    service.name,
    ...service.tags,
    service.category,
    'AI tool',
    'artificial intelligence',
  ];

  return generateSEO({
    title: service.name,
    description: service.description,
    keywords,
    url: `/${lang}/service/${serviceId}`,
    locale: lang,
    type: 'article',
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

  const dictionary = getDictionary(lang);
  const category = getCategoryById(service.category, lang);

  // Generate JSON-LD structured data
  const rating = await getServiceRating(serviceId);
  const productSchema = generateProductSchema({
    name: service.name,
    description: service.description,
    url: `https://ainav.space/${lang}/service/${serviceId}`,
    category: category?.name || service.category,
    pricing: service.pricing || 'free',
    rating: rating?.average_score,
    reviewCount: rating?.review_count,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: dictionary.siteName, url: `https://ainav.space/${lang}` },
    {
      name: category?.name || service.category,
      url: `https://ainav.space/${lang}/category/${service.category}`,
    },
    {
      name: service.name,
      url: `https://ainav.space/${lang}/service/${serviceId}`,
    },
  ]);

  const pricingColors = {
    free: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    freemium: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    paid: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  };

  return (
    <>
      {/* JSON-LD 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="container mx-auto px-4 py-12">
      {/* 返回按钮 */}
      <Link
        href={`/${lang}/category/${service.category}`}
        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6"
      >
        {dictionary.serviceDetail.backToCategory}
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
          {dictionary.serviceDetail.visitWebsite}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>

      {/* 功能特点和使用场景 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* 主要功能 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {dictionary.serviceDetail.keyFeatures}
          </h2>
          <ul className="space-y-3">
            {service.tags.slice(0, 5).map((tag, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                <span className="text-gray-700 dark:text-gray-300">{tag}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 使用场景 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {dictionary.serviceDetail.useCases}
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
              <span className="text-gray-700 dark:text-gray-300">
                {lang === 'zh' ? '提高工作效率和自动化流程' : lang === 'ja' ? '作業効率の向上と自動化' : lang === 'ko' ? '작업 효율성 향상 및 자동화' : lang === 'fr' ? "Améliorer l'efficacité et l'automatisation" : 'Boost productivity and automation'}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
              <span className="text-gray-700 dark:text-gray-300">
                {lang === 'zh' ? '创意内容生成和优化' : lang === 'ja' ? 'クリエイティブコンテンツの生成と最適化' : lang === 'ko' ? '창의적인 콘텐츠 생성 및 최적화' : lang === 'fr' ? 'Génération et optimisation de contenu créatif' : 'Creative content generation and optimization'}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
              <span className="text-gray-700 dark:text-gray-300">
                {lang === 'zh' ? '数据分析和洞察提取' : lang === 'ja' ? 'データ分析と洞察の抽出' : lang === 'ko' ? '데이터 분석 및 인사이트 추출' : lang === 'fr' ? "Analyse de données et extraction d'insights" : 'Data analysis and insights extraction'}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
              <span className="text-gray-700 dark:text-gray-300">
                {lang === 'zh' ? '客户服务和支持优化' : lang === 'ja' ? 'カスタマーサービスとサポートの最適化' : lang === 'ko' ? '고객 서비스 및 지원 최적화' : lang === 'fr' ? 'Optimisation du service client et du support' : 'Customer service and support optimization'}
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* 快速开始指南 */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-lg border border-blue-100 dark:border-gray-700 p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          {dictionary.serviceDetail.quickStart}
        </h2>
        <ol className="space-y-3">
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">1</span>
            <span className="text-gray-700 dark:text-gray-300">
              {lang === 'zh' ? '访问官方网站并注册账号' : lang === 'ja' ? '公式サイトにアクセスしてアカウントを登録' : lang === 'ko' ? '공식 웹사이트를 방문하여 계정 등록' : lang === 'fr' ? 'Visitez le site officiel et créez un compte' : 'Visit the official website and create an account'}
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">2</span>
            <span className="text-gray-700 dark:text-gray-300">
              {lang === 'zh' ? '选择适合您需求的计划' : lang === 'ja' ? 'ニーズに合ったプランを選択' : lang === 'ko' ? '필요에 맞는 플랜 선택' : lang === 'fr' ? 'Choisissez un plan adapté à vos besoins' : 'Choose a plan that fits your needs'}
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">3</span>
            <span className="text-gray-700 dark:text-gray-300">
              {lang === 'zh' ? '浏览教程和文档开始使用' : lang === 'ja' ? 'チュートリアルとドキュメントを参照して使用開始' : lang === 'ko' ? '튜토리얼 및 문서를 보고 사용 시작' : lang === 'fr' ? 'Consultez les tutoriels et la documentation pour commencer' : 'Explore tutorials and documentation to get started'}
            </span>
          </li>
        </ol>
      </div>

      {/* 评论与评分部分 */}
      <ReviewSection serviceId={serviceId} locale={lang} />
    </div>
    </>
  );
}
