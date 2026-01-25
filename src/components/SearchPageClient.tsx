"use client";

import { useSearchParams } from 'next/navigation';
import { Suspense, useState, useEffect, useMemo } from 'react';
import { searchAIServices, getAllCategories } from '@/lib/data';
import AIServiceCard from '@/components/AIServiceCard';
import SearchBar from '@/components/SearchBar';
import { getDictionary, Locale } from '@/lib/i18n';
import { supabase } from '@/lib/supabase';

type RatingData = { average_score: number; review_count: number };
type SortOption = 'relevance' | 'rating' | 'reviewCount' | 'nameAsc' | 'nameDesc';

function SearchResults({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  // State management
  const [ratingsMap, setRatingsMap] = useState<Map<string, RatingData>>(new Map());
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  
  const categories = getAllCategories(locale);
  
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

  // Filter and sort results
  const filteredAndSortedResults = useMemo(() => {
    const searchResults = query ? searchAIServices(query, locale) : [];
    let results = [...searchResults];
    
    // Filter by category
    if (selectedCategory !== 'all') {
      results = results.filter(service => service.category === selectedCategory);
    }
    
    // Sort results
    results.sort((a, b) => {
      const ratingA = ratingsMap.get(a.id);
      const ratingB = ratingsMap.get(b.id);
      
      switch (sortBy) {
        case 'rating':
          return (ratingB?.average_score || 0) - (ratingA?.average_score || 0);
        case 'reviewCount':
          return (ratingB?.review_count || 0) - (ratingA?.review_count || 0);
        case 'nameAsc':
          return a.name.localeCompare(b.name);
        case 'nameDesc':
          return b.name.localeCompare(a.name);
        case 'relevance':
        default:
          return 0; // Keep original search relevance order
      }
    });
    
    return results;
  }, [query, locale, selectedCategory, sortBy, ratingsMap]);

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
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {dictionary.search.results(query, filteredAndSortedResults.length)}
              </span>
              <div className="h-px bg-gray-200 dark:bg-gray-700 flex-1 ml-4"></div>
            </div>
            
            {/* Filters and Sort Controls */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 text-left">
              {/* Category Filter */}
              <div className="flex-1">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {dictionary.search.filters.category}
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                >
                  <option value="all">{dictionary.search.filters.allCategories}</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Sort By */}
              <div className="flex-1">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {dictionary.search.filters.sortBy}
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                >
                  <option value="relevance">{dictionary.search.filters.relevance}</option>
                  <option value="rating">{dictionary.search.filters.rating}</option>
                  <option value="reviewCount">{dictionary.search.filters.reviewCount}</option>
                  <option value="nameAsc">{dictionary.search.filters.nameAsc}</option>
                  <option value="nameDesc">{dictionary.search.filters.nameDesc}</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {filteredAndSortedResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {filteredAndSortedResults.map((service) => (
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
