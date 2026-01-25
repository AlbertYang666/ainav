'use client';

import { useBookmark } from '@/lib/bookmark-store';
import { getAllAIServices } from '@/lib/data';
import AIServiceCard from '@/components/AIServiceCard';
import { Locale } from '@/lib/i18n';
import { supabase } from '@/lib/supabase';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bookmark } from 'lucide-react';

type RatingData = { average_score: number; review_count: number };

const labels: Record<Locale, {
  title: string;
  description: string;
  empty: string;
  emptyHint: string;
  backToHome: string;
  count: (count: number) => string;
}> = {
  zh: {
    title: '我的收藏',
    description: '你收藏的所有 AI 工具',
    empty: '还没有收藏任何工具',
    emptyHint: '浏览工具页面，点击书签图标添加到收藏',
    backToHome: '返回首页',
    count: (count) => `共 ${count} 个收藏`,
  },
  en: {
    title: 'My Bookmarks',
    description: 'All your bookmarked AI tools',
    empty: 'No bookmarks yet',
    emptyHint: 'Browse tools and click the bookmark icon to save your favorites',
    backToHome: 'Back to Home',
    count: (count) => `${count} bookmarks`,
  },
  ja: {
    title: 'ブックマーク',
    description: 'ブックマークしたAIツール',
    empty: 'まだブックマークがありません',
    emptyHint: 'ツールを閲覧してブックマークアイコンをクリックしてください',
    backToHome: 'ホームへ',
    count: (count) => `${count}個のブックマーク`,
  },
  ko: {
    title: '내 북마크',
    description: '북마크한 모든 AI 도구',
    empty: '아직 북마크가 없습니다',
    emptyHint: '도구를 둘러보고 북마크 아이콘을 클릭하세요',
    backToHome: '홈으로',
    count: (count) => `${count}개의 북마크`,
  },
  fr: {
    title: 'Mes Favoris',
    description: 'Tous vos outils IA favoris',
    empty: 'Aucun favori pour le moment',
    emptyHint: 'Parcourez les outils et cliquez sur l\'icône de favori',
    backToHome: 'Retour à l\'accueil',
    count: (count) => `${count} favoris`,
  },
};

export default function BookmarksPageClient({ locale }: { locale: Locale }) {
  const { bookmarkedIds } = useBookmark();
  const [ratingsMap, setRatingsMap] = useState<Map<string, RatingData>>(new Map());
  const t = labels[locale];
  
  // Fetch ratings data
  useEffect(() => {
    async function fetchRatings() {
      const { data } = await supabase
        .from('ratings')
        .select('service_id, average_score, review_count');
      
      if (data) {
        const map = new Map<string, RatingData>();
        data.forEach((r) => {
          map.set(r.service_id, { average_score: r.average_score, review_count: r.review_count });
        });
        setRatingsMap(map);
      }
    }
    fetchRatings();
  }, []);

  const allServices = getAllAIServices(locale);
  const bookmarkedServices = allServices.filter(service => 
    bookmarkedIds.includes(service.id)
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl shadow-lg mb-6">
            <Bookmark className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t.title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            {t.description}
          </p>
          {bookmarkedServices.length > 0 && (
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {t.count(bookmarkedServices.length)}
            </p>
          )}
        </div>

        {/* Bookmarked Tools Grid */}
        {bookmarkedServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarkedServices.map((service) => (
              <AIServiceCard 
                key={service.id} 
                service={service} 
                locale={locale}
                rating={ratingsMap.get(service.id) || null}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700 max-w-2xl mx-auto">
            <div className="text-6xl mb-6">📑</div>
            <h3 className="text-2xl text-gray-900 dark:text-white font-bold mb-3">
              {t.empty}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8 leading-relaxed">
              {t.emptyHint}
            </p>
            <Link
              href={`/${locale}`}
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {t.backToHome}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
