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
    <div className="min-h-screen relative">
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="mb-16 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
            {dictionary.search.title}
          </h1>
          <SearchBar
            locale={locale}
            placeholder={dictionary.search.placeholder}
            buttonText={dictionary.search.button}
          />
        </div>

        {query && (
          <div className="mb-10 text-left">
             <div className="flex items-center gap-2 mb-6">
               <span className="text-2xl font-bold text-gray-900 dark:text-white">{dictionary.search.results(query, results.length)}</span>
               <div className="h-px bg-gray-200 dark:bg-gray-700 flex-1 ml-4"></div>
             </div>
          </div>
        )}

        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
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
          <div className="text-center py-24 bg-gray-50 dark:bg-gray-800/50 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700 mx-auto max-w-2xl mt-12">
            {query ? (
              <div className="px-6">
                <div className="text-6xl mb-6 bg-white dark:bg-gray-700 w-24 h-24 rounded-full flex items-center justify-center mx-auto shadow-sm">🔍</div>
                <h3 className="text-2xl text-gray-900 dark:text-white font-bold mb-3">
                  {dictionary.search.noResultsTitle}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
                  {dictionary.search.noResultsHint}
                </p>
              </div>
            ) : (
              <div className="px-6">
                <div className="text-6xl mb-6 bg-blue-50 dark:bg-gray-700 w-24 h-24 rounded-full flex items-center justify-center mx-auto shadow-sm">💡</div>
                <h3 className="text-2xl text-gray-900 dark:text-white font-bold mb-3">
                  {dictionary.search.emptyTitle}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
                  {dictionary.search.emptyHint}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
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
