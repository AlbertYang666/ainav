'use client';

import { useCompare, MAX_COMPARE_ITEMS } from '@/lib/compare-store';
import type { Locale } from '@/lib/i18n';

interface CompareButtonProps {
  serviceId: string;
  locale: Locale;
}

const labels: Record<Locale, { add: string; remove: string; full: string }> = {
  zh: { add: '对比', remove: '取消', full: '已满' },
  en: { add: 'Compare', remove: 'Remove', full: 'Full' },
  ja: { add: '比較', remove: '削除', full: '満' },
  ko: { add: '비교', remove: '제거', full: '가득' },
  fr: { add: 'Comparer', remove: 'Retirer', full: 'Plein' },
};

export default function CompareButton({ serviceId, locale }: CompareButtonProps) {
  const { isSelected, addToCompare, removeFromCompare, selectedIds } = useCompare();
  const selected = isSelected(serviceId);
  const isFull = selectedIds.length >= MAX_COMPARE_ITEMS && !selected;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (selected) {
      removeFromCompare(serviceId);
    } else if (!isFull) {
      addToCompare(serviceId);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isFull}
      className={`
        px-2 py-1 text-xs font-medium rounded transition-colors
        ${
          selected
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : isFull
            ? 'bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed'
            : 'bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-blue-900 dark:hover:text-blue-400'
        }
      `}
      title={isFull ? `Max ${MAX_COMPARE_ITEMS} items` : ''}
    >
      {selected ? labels[locale].remove : isFull ? labels[locale].full : labels[locale].add}
    </button>
  );
}
