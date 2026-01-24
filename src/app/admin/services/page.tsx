'use client';

import { useState, useEffect, useCallback } from 'react';
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
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">服务管理</h1>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          共 {services.length} 个服务
        </span>
      </div>

      {/* 筛选栏 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="搜索服务 ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">所有分类</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 服务列表 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                服务
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                分类
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                定价
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                特色
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                语言
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredServices.map((service) => (
              <tr key={service.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {service.id}
                      </p>
                      <a
                        href={service.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline truncate max-w-xs block"
                      >
                        {service.url}
                      </a>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded">
                    {service.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <PricingBadge pricing={service.pricing || 'free'} />
                </td>
                <td className="px-6 py-4">
                  {service.featured ? (
                    <span className="text-yellow-500">⭐</span>
                  ) : (
                    <span className="text-gray-300">-</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-1">
                    {(service.language || []).map((lang) => (
                      <span
                        key={lang}
                        className="px-1.5 py-0.5 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded"
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
                    className="text-blue-600 hover:underline text-sm"
                  >
                    访问 ↗
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredServices.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            没有找到匹配的服务
          </div>
        )}
      </div>

      {/* 提示 */}
      <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          💡 <strong>提示：</strong>服务数据存储在 <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">data/ai-services.json</code> 文件中。
          要添加或编辑服务，请直接修改该文件。
        </p>
      </div>
    </div>
  );
}

function PricingBadge({ pricing }: { pricing: string }) {
  const styles: Record<string, string> = {
    free: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    freemium: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    paid: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  };

  const labels: Record<string, string> = {
    free: '免费',
    freemium: '免费增值',
    paid: '付费',
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded ${styles[pricing] || 'bg-gray-100'}`}>
      {labels[pricing] || pricing}
    </span>
  );
}
