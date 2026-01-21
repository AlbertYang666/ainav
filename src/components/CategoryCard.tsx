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
      className="group block p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-lg transition-all duration-200"
    >
      <div className="flex items-center gap-4">
        <div className="text-4xl">{category.icon}</div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {category.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            {category.description}
          </p>
        </div>
        {count !== undefined && (
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {count}
          </div>
        )}
      </div>
    </Link>
  );
}
