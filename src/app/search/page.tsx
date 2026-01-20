'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { searchAIServices } from '@/lib/data';
import AIServiceCard from '@/components/AIServiceCard';
import SearchBar from '@/components/SearchBar';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const results = query ? searchAIServices(query) : [];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* 搜索框 */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          搜索 AI 工具
        </h1>
        <SearchBar />
      </div>

      {/* 搜索结果提示 */}
      {query && (
        <div className="mb-8">
          <p className="text-xl text-gray-600 dark:text-gray-300">
            搜索 <span className="font-semibold text-blue-600 dark:text-blue-400">"{query}"</span>
            {' '}- 找到 <span className="font-semibold">{results.length}</span> 个结果
          </p>
        </div>
      )}

      {/* 搜索结果 */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((service) => (
            <AIServiceCard key={service.id} service={service} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          {query ? (
            <div>
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-xl text-gray-700 dark:text-gray-300 font-semibold mb-2">
                未找到相关工具
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                试试其他关键词，比如 "对话"、"绘画"、"编程" 等
              </p>
            </div>
          ) : (
            <div>
              <div className="text-6xl mb-4">💡</div>
              <p className="text-xl text-gray-700 dark:text-gray-300 font-semibold mb-2">
                开始搜索
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                输入关键词搜索你想要的 AI 工具
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-12">
        <div className="text-center py-20">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mx-auto mb-4"></div>
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded max-w-2xl mx-auto"></div>
          </div>
        </div>
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
}
