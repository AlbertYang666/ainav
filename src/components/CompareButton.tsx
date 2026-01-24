'use client';

import { useCompare, MAX_COMPARE_ITEMS } from '@/lib/compare-store';
import type { Locale } from '@/lib/i18n';
import { ArrowLeftRight, Check } from 'lucide-react';

interface CompareButtonProps {
  serviceId: string;
  locale: Locale;
}

const labels: Record<Locale, { add: string; remove: string; full: string }> = {
  zh: { add: '加入对比', remove: '取消对比', full: '对比已满' },
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
        relative px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 border flex items-center gap-1.5
        ${
          selected
            ? 'bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400'
            : isFull
            ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:border-gray-700'
            : 'bg-white border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:border-blue-700 dark:hover:text-blue-400 shadow-sm'
        }
      `}
      title={isFull ? `Max ${MAX_COMPARE_ITEMS} items` : ''}
    >
      {selected ? <Check className="w-3.5 h-3.5" /> : <ArrowLeftRight className="w-3.5 h-3.5" />}
      <span>{selected ? labels[locale].remove : isFull ? labels[locale].full : labels[locale].add}</span>
    </button>
  );
}
