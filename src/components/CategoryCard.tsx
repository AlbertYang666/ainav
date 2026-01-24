import Link from 'next/link';
import { Category } from '@/types';
import type { Locale } from '@/lib/i18n';

interface CategoryCardProps {
  category: Category;
  count?: number;
  locale: Locale;
}

export default function CategoryCard({ category, count, locale }: CategoryCardProps) {
  return (
    <Link
      href={`/${locale}/category/${category.id}`}
      className="group flex flex-col p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-900 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
         <div className="text-6xl grayscale group-hover:grayscale-0 transition-all duration-300">{category.icon}</div>
      </div>
      
      <div className="flex flex-col h-full relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="text-4xl p-3 bg-gray-50 dark:bg-gray-700/50 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-sm">
            {category.icon}
          </div>
          {count !== undefined && (
            <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-full text-xs font-semibold">
              {count}
            </span>
          )}
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {category.name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          {category.description}
        </p>
      </div>
    </Link>
  );
}
