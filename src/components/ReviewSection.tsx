// src/components/ReviewSection.tsx
'use client';

import { useState, useEffect } from 'react';
import { ServiceRating, Review } from '@/types';
import type { Locale } from '@/lib/i18n';
import { supabase } from '@/lib/supabase';

interface ReviewSectionProps {
  serviceId: string;
  locale: Locale;
}

interface ReviewsData {
  rating: ServiceRating | null;
  reviews: Review[];
  total: number;
}

const RATING_LABELS: Record<number, string> = {
  1: 'Poor',
  2: 'Fair',
  3: 'Good',
  4: 'Very Good',
  5: 'Excellent',
};

export default function ReviewSection({ serviceId, locale }: ReviewSectionProps) {
  const [data, setData] = useState<ReviewsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [page, setPage] = useState(1);

  // 表单状态
  const [formRating, setFormRating] = useState(5);
  const [formTitle, setFormTitle] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, [serviceId, page]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      
      // 获取评分汇总（使用 maybeSingle 允许返回 null）
      const { data: ratingData } = await supabase
        .from('ratings')
        .select('*')
        .eq('service_id', serviceId)
        .maybeSingle();

      // 获取已批准的评论
      const limit = 10;
      const offset = (page - 1) * limit;
      const { data: reviews, count } = await supabase
        .from('reviews')
        .select('*', { count: 'exact' })
        .eq('service_id', serviceId)
        .eq('status', 'approved')
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      setData({
        rating: ratingData || null,
        reviews: reviews || [],
        total: count || 0,
      });
    } catch (error) {
      console.error('Failed to load reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess(false);

    if (formContent.trim().length < 10) {
      setFormError('Review must be at least 10 characters');
      return;
    }
    if (formContent.length > 5000) {
      setFormError('Review is too long (max 5000 characters)');
      return;
    }

    setSubmitting(true);
    try {
      // 通过安全的服务端 API 提交评论
      const res = await fetch('/api/reviews/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: serviceId,
          rating: formRating,
          title: formTitle || null,
          content: formContent,
          language: locale,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit review');
      }

      setFormSuccess(true);
      setFormTitle('');
      setFormContent('');
      setFormRating(5);
      
      // 重置表单，1秒后重新加载评论
      setTimeout(() => {
        setFormSuccess(false);
        setPage(1);  // 回到第一页
        fetchReviews();
      }, 2000);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (score: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < Math.round(score) ? 'text-yellow-400' : 'text-gray-300'}>
        ★
      </span>
    ));
  };

  if (loading && !data) {
    return (
      <div className="mt-8 p-8 text-center text-gray-600 dark:text-gray-400">
        Loading reviews...
      </div>
    );
  }

  return (
    <div className="mt-8 border-t pt-8 space-y-8">
      <h2 className="text-2xl font-bold">Reviews & Ratings</h2>

      {/* 评分摘要 */}
      {data?.rating && (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-lg">
          <div className="flex items-center gap-6">
            <div className="text-5xl font-bold text-blue-600">
              {data.rating.average_score.toFixed(1)}
            </div>
            <div>
              <div className="flex gap-1 text-2xl">
                {renderStars(data.rating.average_score)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Based on {data.rating.review_count} review{data.rating.review_count !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 提交评论表单 */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4">Share Your Experience</h3>
        <form onSubmit={handleSubmitReview} className="space-y-4">
          <div>
            <label className="block mb-2 font-medium text-sm">Your Rating</label>
            <select
              value={formRating}
              onChange={(e) => setFormRating(Number(e.target.value))}
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n} Star{n !== 1 ? 's' : ''} — {RATING_LABELS[n]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium text-sm">Title (Optional)</label>
            <input
              type="text"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              maxLength={100}
              placeholder="Summary of your experience"
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-sm">Your Review</label>
            <textarea
              value={formContent}
              onChange={(e) => setFormContent(e.target.value)}
              rows={4}
              minLength={10}
              maxLength={5000}
              placeholder="Share your thoughts about this AI tool..."
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 dark:bg-gray-700 dark:text-white resize-none"
            />
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {formContent.length}/5000 characters
            </div>
          </div>

          {formError && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded text-sm">
              {formError}
            </div>
          )}
          {formSuccess && (
            <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 rounded text-sm">
              ✓ Thank you! Your review will be published after moderation.
            </div>
          )}

          <button
            type="submit"
            disabled={submitting || formSuccess}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Submitting...' : formSuccess ? 'Review Submitted' : 'Submit Review'}
          </button>
        </form>
      </div>

      {/* 评论列表 */}
      <div>
        <h3 className="font-semibold text-lg mb-4">Recent Reviews</h3>
        {!data?.reviews || data.reviews.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">
            No reviews yet. Be the first to share your experience!
          </p>
        ) : (
          <div className="space-y-4">
            {data.reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white dark:bg-gray-800 p-4 rounded border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    {review.title && (
                      <div className="font-medium mb-1">{review.title}</div>
                    )}
                    <div className="flex gap-1 text-lg">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 ml-4">
                    {new Date(review.created_at).toLocaleDateString(locale, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                  {review.content}
                </p>
                <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <button className="hover:text-green-600 dark:hover:text-green-400 transition-colors">
                    👍 Helpful ({review.helpful_count})
                  </button>
                  <button className="hover:text-red-600 dark:hover:text-red-400 transition-colors">
                    👎 Not Helpful ({review.unhelpful_count})
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 分页 */}
        {data && data.total > 10 && (
          <div className="flex justify-center gap-2 mt-6">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-4 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">
              Page {page} of {Math.ceil(data.total / 10)}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page >= Math.ceil(data.total / 10)}
              className="px-4 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
