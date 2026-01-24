'use client';

import { useState, useEffect, useCallback } from 'react';

interface Submission {
  id: string;
  name: string;
  url: string;
  category: string;
  description: string;
  pricing: string | null;
  tags: string | null;
  submitter_email: string | null;
  status: string;
  created_at: string;
  reviewed_at: string | null;
  review_note: string | null;
}

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'pending' | 'approved' | 'rejected' | 'all'>('pending');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchSubmissions = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/submissions?status=${filter}`);
      if (!res.ok) throw new Error('Failed to fetch submissions');
      const data = await res.json();
      setSubmissions(data.submissions || []);
    } catch {
      setMessage({ type: 'error', text: '获取提交列表失败' });
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  const handleAction = async (id: string, action: 'approve' | 'reject', note?: string) => {
    setActionLoading(id);
    try {
      const res = await fetch('/api/admin/submissions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action, note }),
      });

      if (!res.ok) throw new Error('Action failed');

      setMessage({
        type: 'success',
        text: action === 'approve' ? '已批准提交' : '已拒绝提交',
      });
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
    } catch {
      setMessage({ type: 'error', text: '操作失败' });
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = (id: string) => {
    const note = prompt('请输入拒绝原因（可选）：');
    handleAction(id, 'reject', note || undefined);
  };

  const filterTabs = [
    { key: 'pending', label: '待审核' },
    { key: 'approved', label: '已批准' },
    { key: 'rejected', label: '已拒绝' },
    { key: 'all', label: '全部' },
  ] as const;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">提交审核</h1>

      {/* 消息提示 */}
      {message && (
        <div
          className={`p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}
        >
          {message.text}
          <button
            onClick={() => setMessage(null)}
            className="float-right font-bold"
          >
            ×
          </button>
        </div>
      )}

      {/* 筛选标签 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-1 inline-flex overflow-x-auto">
        {filterTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
              filter === tab.key
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 提交列表 */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : submissions.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 sm:p-12 text-center">
          <p className="text-gray-500 dark:text-gray-400">暂无提交记录</p>
        </div>
      ) : (
        <div className="space-y-4">
          {submissions.map((submission) => (
            <div
              key={submission.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                      {submission.name}
                    </h3>
                    <StatusBadge status={submission.status} />
                  </div>

                  <a
                    href={submission.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm block mb-2 break-all"
                  >
                    {submission.url} ↗
                  </a>

                  <p className="text-gray-600 dark:text-gray-300 mb-3 text-sm sm:text-base">
                    {submission.description}
                  </p>

                  <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    <span>分类：{submission.category}</span>
                    {submission.pricing && (
                      <span>
                        定价：
                        <PricingBadge pricing={submission.pricing} />
                      </span>
                    )}
                    {submission.tags && (
                      <span className="break-all">标签：{submission.tags}</span>
                    )}
                    {submission.submitter_email && (
                      <span className="break-all">提交者：{submission.submitter_email}</span>
                    )}
                    <span>
                      提交时间：{new Date(submission.created_at).toLocaleString('zh-CN')}
                    </span>
                  </div>

                  {submission.review_note && (
                    <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm">
                      <span className="font-medium">审核备注：</span>
                      {submission.review_note}
                    </div>
                  )}
                </div>

                {/* 操作按钮 */}
                {submission.status === 'pending' && (
                  <div className="flex flex-row sm:flex-col gap-2">
                    <button
                      onClick={() => handleAction(submission.id, 'approve')}
                      disabled={actionLoading === submission.id}
                      className="flex-1 sm:flex-none px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 text-sm font-medium"
                    >
                      {actionLoading === submission.id ? '处理中...' : '批准'}
                    </button>
                    <button
                      onClick={() => handleReject(submission.id)}
                      disabled={actionLoading === submission.id}
                      className="flex-1 sm:flex-none px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 text-sm font-medium"
                    >
                      拒绝
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    approved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  const labels: Record<string, string> = {
    pending: '待审核',
    approved: '已批准',
    rejected: '已拒绝',
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status] || 'bg-gray-100'}`}>
      {labels[status] || status}
    </span>
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
    freemium: '部分免费',
    paid: '付费',
  };

  return (
    <span className={`px-2 py-0.5 text-xs font-medium rounded ${styles[pricing] || 'bg-gray-100'}`}>
      {labels[pricing] || pricing}
    </span>
  );
}
