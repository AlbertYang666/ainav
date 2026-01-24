import Link from 'next/link';
import { AIService } from '@/types';
import type { Locale } from '@/lib/i18n';
import { getPricingLabel } from '@/lib/i18n';
import CompareButton from './CompareButton';

interface AIServiceCardProps {
  service: AIService;
  locale: Locale;
  rating?: { average_score: number; review_count: number } | null;
}

// 渲染星星评分
function RatingStars({ score, count }: { score: number; count: number }) {
  const fullStars = Math.floor(score);
  const hasHalfStar = score - fullStars >= 0.5;
  
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-sm ${
              star <= fullStars
                ? 'text-yellow-400'
                : star === fullStars + 1 && hasHalfStar
                ? 'text-yellow-400/50'
                : 'text-gray-300 dark:text-gray-600'
            }`}
          >
            ★
          </span>
        ))}
      </div>
      <span className="text-xs text-gray-500 dark:text-gray-400">
        {score.toFixed(1)} ({count})
      </span>
    </div>
  );
}

export default function AIServiceCard({ service, locale, rating }: AIServiceCardProps) {
  const pricingColors = {
    free: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    freemium: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    paid: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  };

  return (
    <Link
      href={`/${locale}/service/${service.id}`}
      className="group block p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-lg transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {service.name}
        </h3>
        <div className="flex items-center gap-2">
          <CompareButton serviceId={service.id} locale={locale} />
          {service.pricing && (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${pricingColors[service.pricing]}`}>
              {getPricingLabel(locale, service.pricing)}
            </span>
          )}
        </div>
      </div>

      {/* 评分显示 */}
      {rating && rating.review_count > 0 && (
        <div className="mb-3">
          <RatingStars score={rating.average_score} count={rating.review_count} />
        </div>
      )}
      
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
        {service.description}
      </p>
      
      <div className="flex flex-wrap gap-2">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
