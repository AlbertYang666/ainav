'use client';

import { useBookmark } from '@/lib/bookmark-store';
import type { Locale } from '@/lib/i18n';
import { Bookmark, BookmarkCheck } from 'lucide-react';

interface BookmarkButtonProps {
  serviceId: string;
  locale: Locale;
  variant?: 'icon' | 'text';
}

const labels: Record<Locale, { add: string; remove: string }> = {
  zh: { add: '收藏', remove: '已收藏' },
  en: { add: 'Bookmark', remove: 'Bookmarked' },
  ja: { add: 'ブックマーク', remove: 'ブックマーク済み' },
  ko: { add: '북마크', remove: '북마크됨' },
  fr: { add: 'Favori', remove: 'Favoris' },
};

export default function BookmarkButton({ 
  serviceId, 
  locale, 
  variant = 'icon' 
}: BookmarkButtonProps) {
  const { isBookmarked, addBookmark, removeBookmark, mounted } = useBookmark();
  const bookmarked = mounted ? isBookmarked(serviceId) : false;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (bookmarked) {
      removeBookmark(serviceId);
    } else {
      addBookmark(serviceId);
    }
  };

  if (variant === 'icon') {
    return (
      <button
        onClick={handleClick}
        className={`
          p-2 rounded-lg transition-all duration-200 border
          ${
            bookmarked
              ? 'bg-yellow-50 border-yellow-200 text-yellow-600 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-900/30'
              : 'bg-white border-gray-200 text-gray-400 hover:border-yellow-300 hover:text-yellow-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-500 dark:hover:border-yellow-700 dark:hover:text-yellow-400'
          }
        `}
        title={bookmarked ? labels[locale].remove : labels[locale].add}
        aria-label={bookmarked ? labels[locale].remove : labels[locale].add}
      >
        {bookmarked ? (
          <BookmarkCheck className="w-4 h-4" />
        ) : (
          <Bookmark className="w-4 h-4" />
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`
        px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 border flex items-center gap-1.5
        ${
          bookmarked
            ? 'bg-yellow-50 border-yellow-200 text-yellow-600 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-400'
            : 'bg-white border-gray-200 text-gray-600 hover:border-yellow-300 hover:text-yellow-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:border-yellow-700 dark:hover:text-yellow-400 shadow-sm'
        }
      `}
    >
      {bookmarked ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
      <span>{bookmarked ? labels[locale].remove : labels[locale].add}</span>
    </button>
  );
}
