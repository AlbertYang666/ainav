'use client';

import { useState, useEffect, useCallback } from 'react';

interface Review {
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
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      approved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    };
    const labels: Record<string, string> = { pending: '待审核', approved: '已批准', rejected: '已拒绝' };
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[s] || 'bg-gray-100'}`}>{labels[s] || s}</span>;
  };

  const tabs = [
    { key: 'pending', label: '待审核' },
    { key: 'approved', label: '已批准' },
    { key: 'rejected', label: '已拒绝' },
    { key: 'all', label: '全部' },
  ] as const;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">评论管理</h1>

      {message && (
        <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
          {message.text}
          <button onClick={() => setMessage(null)} className="float-right font-bold">×</button>
        </div>
      )}

      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-1 inline-flex">
          {tabs.map((tab) => (
            <button key={tab.key} onClick={() => setFilter(tab.key)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === tab.key ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
              {tab.label}
            </button>
          ))}
        </div>
        {filter === 'pending' && reviews.length > 0 && (
          <button onClick={handleApproveAll} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium">
            批量批准 ({reviews.length})
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : reviews.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-12 text-center">
          <p className="text-gray-500 dark:text-gray-400">暂无评论</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-medium text-gray-900 dark:text-white">{review.service_id}</span>
                    <span className="text-yellow-500">{renderStars(review.rating)}</span>
                    {getStatusBadge(review.status)}
                  </div>
                  {review.title && <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{review.title}</h3>}
                  <p className="text-gray-600 dark:text-gray-300 mb-3 whitespace-pre-wrap">{review.content}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>语言：{review.language.toUpperCase()}</span>
                    <span>时间：{new Date(review.created_at).toLocaleString('zh-CN')}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {review.status === 'pending' && (
                    <>
                      <button onClick={() => handleApprove(review.id)} disabled={actionLoading === review.id}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 text-sm font-medium">批准</button>
                      <button onClick={() => handleReject(review.id)} disabled={actionLoading === review.id}
                        className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50 text-sm font-medium">拒绝</button>
                    </>
                  )}
                  {review.status === 'rejected' && (
                    <button onClick={() => handleApprove(review.id)} disabled={actionLoading === review.id}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 text-sm font-medium">批准</button>
                  )}
                  {review.status === 'approved' && (
                    <button onClick={() => handleReject(review.id)} disabled={actionLoading === review.id}
                      className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50 text-sm font-medium">撤销</button>
                  )}
                  <button onClick={() => handleDelete(review.id)} disabled={actionLoading === review.id}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 text-sm font-medium">删除</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
