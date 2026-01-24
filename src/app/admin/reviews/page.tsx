'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  Check, 
  X, 
  Trash2, 
  AlertCircle, 
  Star, 
  MessageSquare, 
  Calendar,
  CheckCircle2,
  XCircle,
  Clock
} from 'lucide-react';interface Review {
  id: string;
  service_id: string;
  rating: number;
  title: string | null;
  content: string;
  language: string;
  status: string;
  created_at: string;
  ip_hash: string | null;
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'pending' | 'approved' | 'rejected' | 'all'>('pending');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/reviews?status=${filter}`);
      if (!res.ok) throw new Error('Failed to fetch reviews');
      const data = await res.json();
      setReviews(data.reviews || []);
    } catch {
      setMessage({ type: 'error', text: '获取评论失败' });
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleApprove = async (reviewId: string) => {
    setActionLoading(reviewId);
    try {
      const res = await fetch('/api/admin/reviews', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ review_id: reviewId, action: 'approve' }),
      });
      if (!res.ok) throw new Error('Failed');
      setMessage({ type: 'success', text: '评论已批准' });
      setReviews(prev => prev.filter(r => r.id !== reviewId));
    } catch {
      setMessage({ type: 'error', text: '批准失败' });
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (reviewId: string) => {
    const reason = prompt('请输入拒绝原因（可选）：');
    setActionLoading(reviewId);
    try {
      const res = await fetch('/api/admin/reviews', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ review_id: reviewId, action: 'reject', reason: reason || undefined }),
      });
      if (!res.ok) throw new Error('Failed');
      setMessage({ type: 'success', text: '评论已拒绝' });
      setReviews(prev => prev.filter(r => r.id !== reviewId));
    } catch {
      setMessage({ type: 'error', text: '拒绝失败' });
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (reviewId: string) => {
    if (!confirm('确定要永久删除这条评论吗？')) return;
    setActionLoading(reviewId);
    try {
      const res = await fetch('/api/admin/reviews', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ review_id: reviewId }),
      });
      if (!res.ok) throw new Error('Failed');
      setMessage({ type: 'success', text: '评论已删除' });
      setReviews(prev => prev.filter(r => r.id !== reviewId));
    } catch {
      setMessage({ type: 'error', text: '删除失败' });
    } finally {
      setActionLoading(null);
    }
  };

  const handleApproveAll = async () => {
    if (!confirm(`确定要批准所有 ${reviews.length} 条评论吗？`)) return;
    setLoading(true);
    try {
      const res = await fetch('/api/admin/reviews/batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'approve_all' }),
      });
      if (!res.ok) throw new Error('Failed');
      setMessage({ type: 'success', text: '所有评论已批准' });
      setReviews([]);
    } catch {
      setMessage({ type: 'error', text: '批量批准失败' });
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => '★'.repeat(rating) + '☆'.repeat(5 - rating);

  const getStatusBadge = (s: string) => {
    const styles: Record<string, string> = {
      pending: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-900',
      approved: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-900',
      rejected: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-900',
    };
    const icons: Record<string, React.ComponentType<{ className?: string }>> = {
      pending: Clock,
      approved: CheckCircle2,
      rejected: XCircle,
    };
    const labels: Record<string, string> = { pending: '待审核', approved: '已批准', rejected: '已拒绝' };
    
    const Icon = icons[s] || AlertCircle;
    
    return (
      <span className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border ${styles[s] || 'bg-gray-100'}`}>
        <Icon className="w-3.5 h-3.5" />
        {labels[s] || s}
      </span>
    );
  };

  const tabs = [
    { key: 'pending', label: '待审核' },
    { key: 'approved', label: '已批准' },
    { key: 'rejected', label: '已拒绝' },
    { key: 'all', label: '全部' },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            评论管理
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            管理用户提交的服务评价
          </p>
        </div>
      </div>

      {message && (
        <div className={`flex items-center p-4 rounded-xl border ${message.type === 'success' ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-900' : 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-900'}`}>
          {message.type === 'success' ? <CheckCircle2 className="w-5 h-5 mr-3" /> : <AlertCircle className="w-5 h-5 mr-3" />}
          {message.text}
          <button onClick={() => setMessage(null)} className="ml-auto hover:bg-black/5 dark:hover:bg-white/10 p-1 rounded-full"><X className="w-4 h-4" /></button>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50">
        <div className="flex p-1 gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button key={tab.key} onClick={() => setFilter(tab.key)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                filter === tab.key 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
              }`}>
              {tab.label}
            </button>
          ))}
        </div>
        
        {filter === 'pending' && reviews.length > 0 && (
          <button 
            onClick={handleApproveAll} 
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 text-sm font-medium transition-colors shadow-sm w-full sm:w-auto justify-center"
          >
            <CheckCircle2 className="w-4 h-4" />
            批量批准 ({reviews.length})
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-500">加载评论中...</p>
        </div>
      ) : reviews.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-16 text-center border border-gray-100 dark:border-gray-700/50">
          <div className="w-20 h-20 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-10 h-10 text-gray-300 dark:text-gray-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">暂无评论</h3>
          <p className="text-gray-500 dark:text-gray-400">当前筛选条件下没有找到相关评论</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700/50 hover:shadow-md transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="inline-flex items-center justify-center px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-700/50 text-sm font-semibold text-gray-900 dark:text-white">
                      {review.service_id}
                    </span>
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`w-4 h-4 ${
                            star <= review.rating 
                              ? 'fill-yellow-400 text-yellow-400' 
                              : 'fill-gray-200 dark:fill-gray-700 text-gray-200 dark:text-gray-700'
                          }`} 
                        />
                      ))}
                    </div>
                    {getStatusBadge(review.status)}
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 mb-4">
                    {review.title && <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{review.title}</h3>}
                    <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                      {review.content}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                      <span className="font-semibold">LANG:</span> {review.language.toUpperCase()}
                    </span>
                    <span className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(review.created_at).toLocaleString('zh-CN')}
                    </span>
                    {review.ip_hash && (
                       <span className="px-2 py-1 rounded-md bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700" title="IP Hash">
                          IP: {review.ip_hash.substring(0, 8)}...
                       </span>
                    )}
                  </div>
                </div>
                
                <div className="flex lg:flex-col gap-2 border-t lg:border-t-0 lg:border-l border-gray-100 dark:border-gray-700/50 pt-4 lg:pt-0 lg:pl-6">
                  {review.status === 'pending' && (
                    <>
                      <button 
                        onClick={() => handleApprove(review.id)} 
                        disabled={actionLoading === review.id}
                        className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-sm transition-all disabled:opacity-50 text-sm font-medium w-full lg:min-w-[100px]"
                      >
                        <Check className="w-4 h-4" />
                        批准
                      </button>
                      <button 
                        onClick={() => handleReject(review.id)} 
                        disabled={actionLoading === review.id}
                        className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl shadow-sm transition-all disabled:opacity-50 text-sm font-medium w-full lg:min-w-[100px]"
                      >
                        <X className="w-4 h-4" />
                        拒绝
                      </button>
                    </>
                  )}
                  {review.status === 'rejected' && (
                    <button 
                      onClick={() => handleApprove(review.id)} 
                      disabled={actionLoading === review.id}
                      className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-sm transition-all disabled:opacity-50 text-sm font-medium w-full lg:min-w-[100px]"
                    >
                      <Check className="w-4 h-4" />
                      批准
                    </button>
                  )}
                  {review.status === 'approved' && (
                    <button 
                      onClick={() => handleReject(review.id)} 
                      disabled={actionLoading === review.id}
                      className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl shadow-sm transition-all disabled:opacity-50 text-sm font-medium w-full lg:min-w-[100px]"
                    >
                      <X className="w-4 h-4" />
                      撤销
                    </button>
                  )}
                  <button 
                    onClick={() => handleDelete(review.id)} 
                    disabled={actionLoading === review.id}
                    className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 border border-gray-200 dark:border-gray-600 rounded-xl transition-all disabled:opacity-50 text-sm font-medium w-full lg:min-w-[100px]"
                  >
                    <Trash2 className="w-4 h-4" />
                    删除
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
