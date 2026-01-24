// src/app/api/services/[id]/reviews/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { getClientIP, hashIP } from '@/lib/ip-hash';

interface ReviewSubmission {
  rating: number;
  title?: string;
  content: string;
  user_id?: string;
  language?: string;
}

// GET /api/services/[id]/reviews
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const page = new URL(request.url).searchParams.get('page') || '1';
  const limit = 10;
  const offset = (Number(page) - 1) * limit;

  try {
    const supabase = getSupabaseAdmin();

    // 获取评分汇总
    const { data: ratingData } = await supabase
      .from('ratings')
      .select('*')
      .eq('service_id', id)
      .single();

    // 获取已批准的评论
    const { data: reviews, count } = await supabase
      .from('reviews')
      .select('*', { count: 'exact' })
      .eq('service_id', id)
      .eq('status', 'approved')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    return NextResponse.json({
      rating: ratingData,
      reviews: reviews || [],
      total: count || 0,
    });
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

// POST /api/services/[id]/reviews
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  
  try {
    const body: ReviewSubmission = await request.json();
    const { rating, title, content, user_id, language = 'en' } = body;

    // 验证输入
    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 });
    }
    if (!content || content.trim().length < 10) {
      return NextResponse.json({ error: 'Review must be at least 10 characters' }, { status: 400 });
    }
    if (content.length > 5000) {
      return NextResponse.json({ error: 'Review is too long (max 5000 characters)' }, { status: 400 });
    }

    // 获取客户端 IP 并哈希
    const clientIP = getClientIP(request);
    const ipHash = hashIP(clientIP);

    const supabase = getSupabaseAdmin();

    // 检查用户是否已经评分过（防刷）
    const checkQuery = supabase
      .from('user_votes')
      .select('id', { count: 'exact' })
      .eq('service_id', id);

    if (user_id) {
      checkQuery.eq('user_id', user_id);
    } else if (ipHash) {
      checkQuery.eq('ip_hash', ipHash);
    }

    const { count } = await checkQuery;

    if (count && count > 0) {
      return NextResponse.json(
        { error: 'You have already reviewed this service' },
        { status: 403 }
      );
    }

    // 插入评论（待审核）
    const { data: review, error: reviewError } = await supabase
      .from('reviews')
      .insert([
        {
          service_id: id,
          user_id: user_id || null,
          rating: Math.round(rating),
          title: title ? title.slice(0, 255) : null,
          content: content.trim(),
          language,
          status: 'pending',
          ip_hash: ipHash,
        },
      ])
      .select()
      .single();

    if (reviewError) throw reviewError;

    // 记录投票（防刷）
    const { error: voteError } = await supabase
      .from('user_votes')
      .insert([
        {
          user_id: user_id || null,
          service_id: id,
          ip_hash: ipHash,
        },
      ]);

    if (voteError) {
      console.warn('Failed to record vote:', voteError);
      // 不中断流程，评论已记录
    }

    return NextResponse.json(
      { 
        review,
        message: 'Thank you! Your review will be published after moderation.'
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Failed to submit review:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to submit review' },
      { status: 500 }
    );
  }
}
