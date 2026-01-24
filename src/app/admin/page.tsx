'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Stats {
  totalServices: number;
  totalReviews: number;
  pendingReviews: number;
  pendingSubmissions: number;
  averageRating: number;
  recentReviews: Array<{
    id: string;
    service_id: string;
    rating: number;
    content: string;
    created_at: string;
  }>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const statCards = [
    { label: '总服务数', value: stats?.totalServices || 0, icon: '🤖', color: 'blue' },
    { label: '总评论数', value: stats?.totalReviews || 0, icon: '💬', color: 'green' },
    { label: '待审评论', value: stats?.pendingReviews || 0, icon: '⏳', color: 'yellow', href: '/admin/reviews' },
    { label: '待审提交', value: stats?.pendingSubmissions || 0, icon: '📝', color: 'purple', href: '/admin/submissions' },
  ];

  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    green: 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    yellow: 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
    purple: 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">仪表盘</h1>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const content = (
            <div
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 ${
                card.href ? 'hover:shadow-md transition-shadow cursor-pointer' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{card.label}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                    {card.value}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${colorClasses[card.color]}`}>
                  {card.icon}
                </div>
              </div>
            </div>
          );

          return card.href ? (
            <Link key={card.label} href={card.href}>
              {content}
            </Link>
          ) : (
            <div key={card.label}>{content}</div>
          );
        })}
      </div>

      {/* 平均评分 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">平均评分</h2>
        <div className="flex items-center gap-4">
          <span className="text-4xl font-bold text-yellow-500">
            {stats?.averageRating ? stats.averageRating.toFixed(1) : '-'}
          </span>
          <div className="text-2xl text-yellow-400">
            {'★'.repeat(Math.round(stats?.averageRating || 0))}
            {'☆'.repeat(5 - Math.round(stats?.averageRating || 0))}
          </div>
        </div>
      </div>

      {/* 最近评论 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">最近评论</h2>
          <Link href="/admin/reviews" className="text-sm text-blue-600 hover:underline">
            查看全部 →
          </Link>
        </div>
        
        {stats?.recentReviews && stats.recentReviews.length > 0 ? (
          <div className="space-y-3">
            {stats.recentReviews.map((review) => (
              <div
                key={review.id}
                className="flex items-start gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {review.service_id}
                    </span>
                    <span className="text-yellow-500 text-sm">
                      {'★'.repeat(review.rating)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                    {review.content}
                  </p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">
                  {new Date(review.created_at).toLocaleDateString('zh-CN')}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">
            暂无评论
          </p>
        )}
      </div>

      {/* 快捷操作 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">快捷操作</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/reviews?filter=pending"
            className="px-4 py-2 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-lg hover:opacity-80 transition-opacity"
          >
            审核待处理评论
          </Link>
          <Link
            href="/admin/submissions"
            className="px-4 py-2 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-lg hover:opacity-80 transition-opacity"
          >
            审核服务提交
          </Link>
          <Link
            href="/admin/services"
            className="px-4 py-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-lg hover:opacity-80 transition-opacity"
          >
            管理服务列表
          </Link>
        </div>
      </div>
    </div>
  );
}
