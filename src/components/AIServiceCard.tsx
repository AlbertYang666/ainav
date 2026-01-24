import Link from 'next/link';
import { AIService } from '@/types';
import type { Locale } from '@/lib/i18n';
import { getPricingLabel } from '@/lib/i18n';
import CompareButton from './CompareButton';
import { Star, StarHalf } from 'lucide-react';

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
    <div className="flex items-center gap-1.5">
      <div className="flex text-yellow-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star}>
            {star <= fullStars ? (
              <Star className="w-4 h-4 fill-current" />
            ) : star === fullStars + 1 && hasHalfStar ? (
               <div className="relative">
                 <Star className="w-4 h-4 text-gray-300 dark:text-gray-600" />
                 <StarHalf className="w-4 h-4 absolute top-0 left-0 fill-current" />
               </div>
            ) : (
              <Star className="w-4 h-4 text-gray-300 dark:text-gray-600" />
            )}
          </span>
        ))}
      </div>
      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-0.5">
        ({count})
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
      className="group block h-full p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-blue-100 dark:hover:border-gray-600 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden"
    >
      {/* Decorative gradient blob */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
            {service.name}
          </h3>
          <div className="flex items-center gap-2 shrink-0">
             <CompareButton serviceId={service.id} locale={locale} />
             {service.pricing && (
              <span className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-md ${pricingColors[service.pricing]}`}>
                {getPricingLabel(locale, service.pricing)}
              </span>
            )}
          </div>
        </div>

        {/* 评分显示 */}
        {rating && rating.review_count > 0 && (
          <div className="mb-4">
            <RatingStars score={rating.average_score} count={rating.review_count} />
          </div>
        )}
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 line-clamp-2 leading-relaxed flex-grow">
          {service.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-50 dark:border-gray-700/50">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-[11px] font-medium bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 rounded-full border border-gray-100 dark:border-gray-600 transition-colors group-hover:border-gray-200 dark:group-hover:border-gray-500"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
