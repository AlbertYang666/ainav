"use client";

import { useSearchParams } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
import { searchAIServices } from '@/lib/data';
import AIServiceCard from '@/components/AIServiceCard';
import SearchBar from '@/components/SearchBar';
import { getDictionary, Locale } from '@/lib/i18n';
import { supabase } from '@/lib/supabase';

type RatingData = { average_score: number; review_count: number };

function SearchResults({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const results = query ? searchAIServices(query, locale) : [];
  
  // 客户端获取评分数据
  const [ratingsMap, setRatingsMap] = useState<Map<string, RatingData>>(new Map());
  
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

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          {dictionary.search.title}
        </h1>
        <SearchBar
          locale={locale}
          placeholder={dictionary.search.placeholder}
          buttonText={dictionary.search.button}
        />
      </div>

      {query && (
        <div className="mb-8">
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {dictionary.search.results(query, results.length)}
          </p>
        </div>
      )}

      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((service) => (
            <AIServiceCard 
              key={service.id} 
              service={service} 
              locale={locale}
              rating={ratingsMap.get(service.id) || null}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          {query ? (
            <div>
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-xl text-gray-700 dark:text-gray-300 font-semibold mb-2">
                {dictionary.search.noResultsTitle}
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                {dictionary.search.noResultsHint}
              </p>
            </div>
          ) : (
            <div>
              <div className="text-6xl mb-4">💡</div>
              <p className="text-xl text-gray-700 dark:text-gray-300 font-semibold mb-2">
                {dictionary.search.emptyTitle}
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                {dictionary.search.emptyHint}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function SearchPageClient({ locale }: { locale: Locale }) {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-12">
          <div className="text-center py-20">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mx-auto mb-4"></div>
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded max-w-2xl mx-auto"></div>
            </div>
          </div>
        </div>
      }
    >
      <SearchResults locale={locale} />
    </Suspense>
  );
}
