'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Bot, 
  MessageSquare, 
  Clock, 
  FileText, 
  Star, 
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Activity
} from 'lucide-react';

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
    { label: '总服务数', value: stats?.totalServices || 0, icon: Bot, color: 'blue' },
    { label: '总评论数', value: stats?.totalReviews || 0, icon: MessageSquare, color: 'green' },
    { label: '待审评论', value: stats?.pendingReviews || 0, icon: Clock, color: 'yellow', href: '/admin/reviews' },
    { label: '待审提交', value: stats?.pendingSubmissions || 0, icon: FileText, color: 'purple', href: '/admin/submissions' },
  ];

  const colorVariants: Record<string, { bg: string, text: string, iconBg: string }> = {
    blue: { 
      bg: 'bg-blue-50 dark:bg-blue-900/10', 
      text: 'text-blue-600 dark:text-blue-400',
      iconBg: 'bg-blue-100 dark:bg-blue-900/30'
    },
    green: { 
      bg: 'bg-green-50 dark:bg-green-900/10', 
      text: 'text-green-600 dark:text-green-400',
      iconBg: 'bg-green-100 dark:bg-green-900/30'
    },
    yellow: { 
      bg: 'bg-yellow-50 dark:bg-yellow-900/10', 
      text: 'text-yellow-600 dark:text-yellow-400',
      iconBg: 'bg-yellow-100 dark:bg-yellow-900/30'
    },
    purple: { 
      bg: 'bg-purple-50 dark:bg-purple-900/10', 
      text: 'text-purple-600 dark:text-purple-400',
      iconBg: 'bg-purple-100 dark:bg-purple-900/30'
    },
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">欢迎回来, Admin 👋</h1>
        <p className="text-gray-500 dark:text-gray-400">这里是您的项目总览和统计数据</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => {
          const colors = colorVariants[card.color];
          const content = (
            <div
              className={`relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50 p-6 transition-all duration-300 ${
                card.href ? 'hover:shadow-lg hover:-translate-y-1 group cursor-pointer' : ''
              }`}
            >
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{card.label}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {card.value}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors.iconBg} ${colors.text} transition-transform duration-300 ${card.href ? 'group-hover:scale-110' : ''}`}>
                  <card.icon className="w-6 h-6" />
                </div>
              </div>
              
              {/* Decorative background element */}
              <div className={`absolute -bottom-4 -right-4 w-24 h-24 rounded-full opacity-5 ${colors.text.replace('text-', 'bg-')}`} />
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 平均评分 & 快捷操作 */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50 p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              平台评分
            </h2>
            <div className="flex flex-col items-center justify-center py-6">
              <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
                {stats?.averageRating ? stats.averageRating.toFixed(1) : '0.0'}
              </div>
              <div className="flex gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`w-6 h-6 ${
                      star <= Math.round(stats?.averageRating || 0) 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'fill-gray-200 dark:fill-gray-700 text-gray-200 dark:text-gray-700'
                    }`} 
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">基于所有已审核评论</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50 p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-500" />
              快捷操作
            </h2>
            <div className="space-y-3">
              <Link
                href="/admin/reviews?filter=pending"
                className="flex items-center justify-between p-3 rounded-xl bg-yellow-50 dark:bg-yellow-900/10 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-900/20 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="font-medium">审核待处理评论</span>
                </div>
                <ArrowRight className="w-4 h-4 opacity-50 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/admin/submissions"
                className="flex items-center justify-between p-3 rounded-xl bg-purple-50 dark:bg-purple-900/10 text-purple-700 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5" />
                  <span className="font-medium">审核服务提交</span>
                </div>
                <ArrowRight className="w-4 h-4 opacity-50 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/admin/services"
                className="flex items-center justify-between p-3 rounded-xl bg-blue-50 dark:bg-blue-900/10 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Bot className="w-5 h-5" />
                  <span className="font-medium">管理服务列表</span>
                </div>
                <ArrowRight className="w-4 h-4 opacity-50 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* 最近评论 */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              最新评论动态
            </h2>
            <Link href="/admin/reviews" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1">
              查看全部 <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          
          {stats?.recentReviews && stats.recentReviews.length > 0 ? (
            <div className="space-y-4 flex-1">
              {stats.recentReviews.map((review) => (
                <div
                  key={review.id}
                  className="group flex gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 font-bold text-sm">
                    {review.service_id.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-gray-900 dark:text-white truncate">
                        {review.service_id}
                      </h3>
                      <span className="text-xs text-gray-400">
                        {new Date(review.created_at).toLocaleDateString('zh-CN')}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`w-3 h-3 ${
                            star <= review.rating
                              ? 'fill-yellow-400 text-yellow-400' 
                              : 'fill-gray-200 dark:fill-gray-700 text-gray-200 dark:text-gray-700'
                          }`} 
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
                      {review.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center py-10 text-center">
              <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="w-8 h-8 text-gray-300 dark:text-gray-600" />
              </div>
              <p className="text-gray-500 dark:text-gray-400 font-medium">暂无评论数据</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                当用户开始评论服务时, 这里会显示最新动态
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
