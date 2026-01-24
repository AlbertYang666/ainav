'use client';

import { useCompare, MAX_COMPARE_ITEMS } from '@/lib/compare-store';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n';

interface CompareBarProps {
  locale: Locale;
}

const labels: Record<
  Locale,
  { compare: string; clear: string; selected: string; minRequired: string }
> = {
  zh: {
    compare: '开始对比',
    clear: '清空',
    selected: '已选择',
    minRequired: '至少选择2个工具',
  },
  en: {
    compare: 'Compare Now',
    clear: 'Clear',
    selected: 'Selected',
    minRequired: 'Select at least 2 tools',
  },
  ja: {
    compare: '比較する',
    clear: 'クリア',
    selected: '選択済み',
    minRequired: '2つ以上選択してください',
  },
  ko: {
    compare: '비교하기',
    clear: '초기화',
    selected: '선택됨',
    minRequired: '최소 2개 선택',
  },
  fr: {
    compare: 'Comparer',
    clear: 'Effacer',
    selected: 'Sélectionné',
    minRequired: 'Sélectionnez au moins 2 outils',
  },
};

export default function CompareBar({ locale }: CompareBarProps) {
  const { selectedIds, clearCompare, removeFromCompare } = useCompare();

  if (selectedIds.length === 0) {
    return null;
  }

  const canCompare = selectedIds.length >= 2;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Selected items */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {labels[locale].selected}: {selectedIds.length}/{MAX_COMPARE_ITEMS}
            </span>
            <div className="flex gap-2 flex-wrap">
              {selectedIds.map((id) => (
                <span
                  key={id}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-sm"
                >
                  {id}
                  <button
                    onClick={() => removeFromCompare(id)}
                    className="hover:text-red-600 dark:hover:text-red-400"
                    aria-label={`Remove ${id}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={clearCompare}
              className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            >
              {labels[locale].clear}
            </button>
            {canCompare ? (
              <Link
                href={`/${locale}/compare?ids=${selectedIds.join(',')}`}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                {labels[locale].compare}
              </Link>
            ) : (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {labels[locale].minRequired}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
