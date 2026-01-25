'use client';

import { useCompare, MAX_COMPARE_ITEMS } from '@/lib/compare-store';
import { getAIServiceById } from '@/lib/data';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import { X, ArrowLeftRight } from 'lucide-react';

interface CompareBarProps {
  locale: Locale;
}

const labels: Record<
  Locale,
  { 
    compare: string; 
    clear: string; 
    selected: (count: number) => string; 
    minRequired: string;
    title: string;
  }
> = {
  zh: {
    title: '工具对比',
    compare: '开始对比',
    clear: '清空',
    selected: (count) => `已选 ${count}/${MAX_COMPARE_ITEMS}`,
    minRequired: '至少选择2个工具',
  },
  en: {
    title: 'Compare Tools',
    compare: 'Compare Now',
    clear: 'Clear All',
    selected: (count) => `${count}/${MAX_COMPARE_ITEMS} selected`,
    minRequired: 'Select at least 2 tools',
  },
  ja: {
    title: 'ツール比較',
    compare: '比較する',
    clear: 'クリア',
    selected: (count) => `${count}/${MAX_COMPARE_ITEMS}個選択`,
    minRequired: '2つ以上選択してください',
  },
  ko: {
    title: '도구 비교',
    compare: '비교하기',
    clear: '전体 삭제',
    selected: (count) => `${count}/${MAX_COMPARE_ITEMS}개 선택`,
    minRequired: '최소 2개 선택',
  },
  fr: {
    title: 'Comparer des outils',
    compare: 'Comparer',
    clear: 'Tout effacer',
    selected: (count) => `${count}/${MAX_COMPARE_ITEMS} sélectionnés`,
    minRequired: 'Sélectionnez au moins 2 outils',
  },
};

export default function CompareBar({ locale }: CompareBarProps) {
  const { selectedIds, clearCompare, removeFromCompare } = useCompare();

  if (selectedIds.length === 0) {
    return null;
  }

  const canCompare = selectedIds.length >= 2;
  const t = labels[locale];
  
  // Get tool names for display
  const selectedTools = selectedIds
    .map((id) => getAIServiceById(id, locale))
    .filter((tool) => tool !== undefined);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-t-2 border-gray-200 dark:border-gray-700 shadow-2xl animate-slide-up">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
          {/* Left: Title and counter */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center justify-center w-11 h-11 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-xl shadow-lg">
              <ArrowLeftRight className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">
                {t.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                {t.selected(selectedIds.length)}
              </p>
            </div>
          </div>

          {/* Middle: Selected tools - horizontal scroll on mobile */}
          <div className="flex items-center gap-2 flex-1 overflow-x-auto scrollbar-hide max-w-full sm:max-w-xl -mx-3 px-3 sm:mx-0 sm:px-0">
            <div className="flex gap-2">
              {selectedTools.map((tool) => (
                <div
                  key={tool.id}
                  className="group flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md transition-all duration-200 flex-shrink-0"
                >
                  <span className="text-xs sm:text-sm font-medium text-blue-700 dark:text-blue-300 whitespace-nowrap">
                    {tool.name}
                  </span>
                  <button
                    onClick={() => removeFromCompare(tool.id)}
                    className="opacity-60 group-hover:opacity-100 transition-opacity p-0.5 hover:bg-blue-200 dark:hover:bg-blue-800 rounded"
                    aria-label={`Remove ${tool.name}`}
                  >
                    <X className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-blue-600 dark:text-blue-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-3 justify-end">
            <button
              onClick={clearCompare}
              className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
            >
              {t.clear}
            </button>
            {canCompare ? (
              <Link
                href={`/${locale}/compare?ids=${selectedIds.join(',')}`}
                className="px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm"
              >
                <ArrowLeftRight className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                <span className="hidden sm:inline">{t.compare}</span>
                <span className="sm:hidden">{t.compare.split(' ')[0]}</span>
              </Link>
            ) : (
              <span className="px-3 sm:px-6 py-2 sm:py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 font-medium rounded-lg text-xs sm:text-sm">
                <span className="hidden sm:inline">{t.minRequired}</span>
                <span className="sm:hidden">2+</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
