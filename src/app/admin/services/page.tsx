'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  Search, 
  ExternalLink, 
  Filter, 
  Bot, 
  Star, 
  Info,
  Zap, 
  Coins
} from 'lucide-react';
import type { AIService } from '@/types';

export default function AdminServicesPage() {
  const [services, setServices] = useState<AIService[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  const fetchServices = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/services');
      if (res.ok) {
        const data = await res.json();
        setServices(data.services || []);
      }
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  // 获取所有分类
  const categories = [...new Set(services.map((s) => s.category))];

  // 筛选服务
  const filteredServices = services.filter((service) => {
    const matchesSearch = service.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || service.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-500">加载服务中...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Bot className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            服务管理
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            共 {services.length} 个服务
          </p>
        </div>
      </div>

      {/* 筛选栏 */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-2 flex flex-col sm:flex-row gap-2 border border-gray-100 dark:border-gray-700/50">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="搜索服务 ID 或名称..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-transparent border-none text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-0"
          />
        </div>
        <div className="h-px w-full sm:h-10 sm:w-px bg-gray-100 dark:bg-gray-700" />
        <div className="relative min-w-[200px]">
          <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full pl-10 pr-8 py-2.5 bg-transparent border-none text-gray-900 dark:text-white appearance-none cursor-pointer focus:outline-none focus:ring-0"
            style={{ backgroundImage: 'none' }}
          >
            <option value="all">所有分类</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </div>
        </div>
      </div>

      {/* 服务列表 - 桌面端表格 */}
      <div className="hidden lg:block bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700/50">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">服务</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">分类</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">定价</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">特色</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">语言</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
              {filteredServices.map((service) => (
                <tr key={service.id} className="group hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 font-bold text-sm bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                        {service.id.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 dark:text-white truncate max-w-[180px]">
                          {service.id}
                        </p>
                        <a
                          href={service.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 truncate max-w-[180px] block flex items-center gap-1"
                        >
                          <ExternalLink className="w-3 h-3" />
                          {service.url.replace(/^https?:\/\//, '')}
                        </a>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg">
                      {service.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <PricingBadge pricing={service.pricing || 'free'} />
                  </td>
                  <td className="px-6 py-4">
                    {service.featured ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 text-xs font-medium border border-yellow-200 dark:border-yellow-900">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        Featured
                      </span>
                    ) : (
                      <span className="text-gray-300 dark:text-gray-600">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1.5">
                      {(service.language || []).map((lang) => (
                        <span
                          key={lang}
                          className="px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-md border border-gray-200 dark:border-gray-700"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <a
                      href={service.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                      title="访问网站"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredServices.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500 dark:text-gray-400">
             <Search className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-4" />
             <p>没有找到与搜索条件匹配的服务</p>
          </div>
        )}
      </div>

      {/* 服务列表 - 移动端卡片 */}
      <div className="lg:hidden grid gap-4">
        {filteredServices.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-12 text-center text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-gray-700/50">
            <Search className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p>没有找到匹配的服务</p>
          </div>
        ) : (
          filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-5 border border-gray-100 dark:border-gray-700/50"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3 min-w-0">
                   <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 font-bold text-sm flex-shrink-0">
                      {service.id.substring(0, 2).toUpperCase()}
                   </div>
                   <div className="min-w-0">
                      <p className="font-medium text-gray-900 dark:text-white truncate">
                        {service.id}
                      </p>
                      <a
                        href={service.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline truncate block flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                         访问
                      </a>
                   </div>
                </div>
                {service.featured && <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 flex-shrink-0" />}
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg">
                  {service.category}
                </span>
                <PricingBadge pricing={service.pricing || 'free'} />
              </div>
              
              <div className="flex flex-wrap gap-1 border-t border-gray-100 dark:border-gray-700 pt-3">
                 {(service.language || []).map((lang) => (
                  <span
                    key={lang}
                    className="px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded border border-gray-200 dark:border-gray-700"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* 提示 */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-5 flex gap-4">
        <Info className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
        <div className="text-sm text-blue-800 dark:text-blue-300">
          <p className="font-semibold mb-1">数据源管理提示</p>
          <p className="opacity-90">
            服务数据目前存储在 <code className="bg-blue-100 dark:bg-blue-900 px-1.5 py-0.5 rounded font-mono text-xs">data/ai-services.json</code> 文件中。
            要添加或编辑服务，请直接修改该文件，系统会自动重新加载。
          </p>
        </div>
      </div>
    </div>
  );
}

function PricingBadge({ pricing }: { pricing: string }) {
  const styles: Record<string, string> = {
    free: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-900',
    freemium: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-900',
    paid: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-900',
  };
  
  const icons: Record<string, React.ComponentType<{ className?: string }>> = {
    free: Zap,
    freemium: Coins,
    paid: Star
  };

  const labels: Record<string, string> = {
    free: '免费',
    freemium: '免费增值',
    paid: '付费',
  };

  const Icon = icons[pricing] || Zap;

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg border ${styles[pricing] || 'bg-gray-100'}`}>
      <Icon className="w-3 h-3" />
      {labels[pricing] || pricing}
    </span>
  );
}
