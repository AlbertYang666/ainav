import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAIServiceById } from '@/lib/data';
import { getDictionary, Locale, locales, getPricingLabel } from '@/lib/i18n';
import type { Metadata } from 'next';

interface ComparePageProps {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<{ ids?: string }>;
}

export async function generateMetadata({ params }: ComparePageProps): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: `${dict.compare.title} | AI Nav`,
    description: dict.compare.description,
  };
}

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const labels: Record<Locale, Record<string, string>> = {
  zh: {
    title: '工具对比',
    description: '并排比较 AI 工具的功能和特点',
    noTools: '未选择任何工具进行对比',
    backToHome: '返回首页',
    selectTools: '选择工具',
    name: '名称',
    category: '分类',
    pricing: '定价',
    tags: '标签',
    languages: '支持语言',
    featured: '精选',
    yes: '是',
    no: '否',
    visit: '访问网站',
    viewDetails: '查看详情',
  },
  en: {
    title: 'Tool Comparison',
    description: 'Compare AI tools side by side',
    noTools: 'No tools selected for comparison',
    backToHome: 'Back to Home',
    selectTools: 'Select Tools',
    name: 'Name',
    category: 'Category',
    pricing: 'Pricing',
    tags: 'Tags',
    languages: 'Languages',
    featured: 'Featured',
    yes: 'Yes',
    no: 'No',
    visit: 'Visit Website',
    viewDetails: 'View Details',
  },
  ja: {
    title: 'ツール比較',
    description: 'AIツールを並べて比較',
    noTools: '比較するツールが選択されていません',
    backToHome: 'ホームに戻る',
    selectTools: 'ツールを選択',
    name: '名前',
    category: 'カテゴリ',
    pricing: '価格',
    tags: 'タグ',
    languages: '対応言語',
    featured: '注目',
    yes: 'はい',
    no: 'いいえ',
    visit: 'サイトを訪問',
    viewDetails: '詳細を見る',
  },
  ko: {
    title: '도구 비교',
    description: 'AI 도구를 나란히 비교',
    noTools: '비교할 도구가 선택되지 않았습니다',
    backToHome: '홈으로 돌아가기',
    selectTools: '도구 선택',
    name: '이름',
    category: '카테고리',
    pricing: '가격',
    tags: '태그',
    languages: '지원 언어',
    featured: '추천',
    yes: '예',
    no: '아니오',
    visit: '웹사이트 방문',
    viewDetails: '상세 보기',
  },
  fr: {
    title: 'Comparaison d\'outils',
    description: 'Comparez les outils IA côte à côte',
    noTools: 'Aucun outil sélectionné pour la comparaison',
    backToHome: 'Retour à l\'accueil',
    selectTools: 'Sélectionner des outils',
    name: 'Nom',
    category: 'Catégorie',
    pricing: 'Tarification',
    tags: 'Tags',
    languages: 'Langues',
    featured: 'En vedette',
    yes: 'Oui',
    no: 'Non',
    visit: 'Visiter le site',
    viewDetails: 'Voir les détails',
  },
};

export default async function ComparePage({ params, searchParams }: ComparePageProps) {
  const { lang } = await params;
  const { ids } = await searchParams;
  const t = labels[lang];

  if (!locales.includes(lang)) {
    notFound();
  }

  // Parse selected tool IDs from URL
  const selectedIds = ids ? ids.split(',').filter(Boolean) : [];
  
  // Get tool data for each selected ID
  const tools = selectedIds
    .map((id) => getAIServiceById(id, lang))
    .filter((tool): tool is NonNullable<typeof tool> => tool !== null);

  if (tools.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t.noTools}
          </h1>
          <Link
            href={`/${lang}`}
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t.selectTools}
          </Link>
        </div>
      </div>
    );
  }

  const pricingColors: Record<string, string> = {
    free: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    freemium: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    paid: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            href={`/${lang}`}
            className="text-blue-600 hover:underline mb-4 inline-block"
          >
            ← {t.backToHome}
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {t.description}
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white w-32">
                    {t.name}
                  </th>
                  {tools.map((tool) => (
                    <th
                      key={tool.id}
                      className="px-6 py-4 text-center text-lg font-bold text-gray-900 dark:text-white min-w-[200px]"
                    >
                      {tool.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {/* Category */}
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                    {t.category}
                  </td>
                  {tools.map((tool) => (
                    <td key={tool.id} className="px-6 py-4 text-center">
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                        {tool.category}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Pricing */}
                <tr className="bg-gray-50/50 dark:bg-gray-750">
                  <td className="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                    {t.pricing}
                  </td>
                  {tools.map((tool) => (
                    <td key={tool.id} className="px-6 py-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          pricingColors[tool.pricing || 'free']
                        }`}
                      >
                        {getPricingLabel(lang, tool.pricing || 'free')}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Featured */}
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                    {t.featured}
                  </td>
                  {tools.map((tool) => (
                    <td key={tool.id} className="px-6 py-4 text-center">
                      {tool.featured ? (
                        <span className="text-yellow-500 text-xl">⭐</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Languages */}
                <tr className="bg-gray-50/50 dark:bg-gray-750">
                  <td className="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                    {t.languages}
                  </td>
                  {tools.map((tool) => (
                    <td key={tool.id} className="px-6 py-4 text-center">
                      <div className="flex flex-wrap justify-center gap-1">
                        {(tool.language || []).map((lang) => (
                          <span
                            key={lang}
                            className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs"
                          >
                            {lang.toUpperCase()}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Tags */}
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                    {t.tags}
                  </td>
                  {tools.map((tool) => (
                    <td key={tool.id} className="px-6 py-4">
                      <div className="flex flex-wrap justify-center gap-1">
                        {tool.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Description */}
                <tr className="bg-gray-50/50 dark:bg-gray-750">
                  <td className="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                    Description
                  </td>
                  {tools.map((tool) => (
                    <td
                      key={tool.id}
                      className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300 text-center"
                    >
                      {tool.description}
                    </td>
                  ))}
                </tr>

                {/* Actions */}
                <tr>
                  <td className="px-6 py-4"></td>
                  {tools.map((tool) => (
                    <td key={tool.id} className="px-6 py-4">
                      <div className="flex flex-col gap-2 items-center">
                        <a
                          href={tool.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full max-w-[160px] px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm text-center"
                        >
                          {t.visit} ↗
                        </a>
                        <Link
                          href={`/${lang}/service/${tool.id}`}
                          className="text-blue-600 hover:underline text-sm"
                        >
                          {t.viewDetails}
                        </Link>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
