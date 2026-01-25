import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

// 获取真实客户端 IP
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const vercelIP = request.headers.get('x-vercel-forwarded-for');
  
  return (
    vercelIP ||
    forwarded?.split(',')[0].trim() ||
    realIP ||
    'unknown'
  );
}

// 简单的哈希函数
function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { reviewId, voteType } = body; // voteType: 'helpful' | 'unhelpful'

    if (!reviewId || !voteType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (voteType !== 'helpful' && voteType !== 'unhelpful') {
      return NextResponse.json(
        { error: 'Invalid vote type' },
        { status: 400 }
      );
    }

    const clientIP = getClientIP(request);
    const ipHash = hashString(clientIP);

    const supabase = getSupabaseAdmin();

    // 检查用户是否已经对这条评论投过票
    const { data: existingVote } = await supabase
      .from('review_votes')
      .select('vote_type')
      .eq('review_id', reviewId)
      .eq('ip_hash', ipHash)
      .maybeSingle();

    if (existingVote) {
      // 如果已投过票且类型相同，返回错误
      if (existingVote.vote_type === voteType) {
        return NextResponse.json(
          { error: 'You have already voted on this review' },
          { status: 403 }
        );
      }

      // 如果投票类型不同，更新投票
      const { error: updateVoteError } = await supabase
        .from('review_votes')
        .update({ vote_type: voteType, created_at: new Date().toISOString() })
        .eq('review_id', reviewId)
        .eq('ip_hash', ipHash);

      if (updateVoteError) {
        throw updateVoteError;
      }

      // 更新评论计数（减少旧类型，增加新类型）
      const oldField = existingVote.vote_type === 'helpful' ? 'helpful_count' : 'unhelpful_count';
      const newField = voteType === 'helpful' ? 'helpful_count' : 'unhelpful_count';

      const { data: review } = await supabase
        .from('reviews')
        .select('helpful_count, unhelpful_count')
        .eq('id', reviewId)
        .single();

      if (review) {
        await supabase
          .from('reviews')
          .update({
            [oldField]: Math.max(0, review[oldField as keyof typeof review] as number - 1),
            [newField]: (review[newField as keyof typeof review] as number) + 1,
          })
          .eq('id', reviewId);
      }

      // 获取更新后的数据
      const { data: updatedReview } = await supabase
        .from('reviews')
        .select('helpful_count, unhelpful_count')
        .eq('id', reviewId)
        .single();

      return NextResponse.json({
        success: true,
        message: 'Vote updated',
        helpful_count: updatedReview?.helpful_count || 0,
        unhelpful_count: updatedReview?.unhelpful_count || 0,
      });
    }

    // 新投票
    const { error: insertError } = await supabase
      .from('review_votes')
      .insert({
        review_id: reviewId,
        ip_hash: ipHash,
        vote_type: voteType,
      });

    if (insertError) {
      throw insertError;
    }

    // 更新评论的投票计数
    const field = voteType === 'helpful' ? 'helpful_count' : 'unhelpful_count';
    const { data: review } = await supabase
      .from('reviews')
      .select(field)
      .eq('id', reviewId)
      .single();

    if (review) {
      await supabase
        .from('reviews')
        .update({ [field]: (review[field as keyof typeof review] as number) + 1 })
        .eq('id', reviewId);
    }

    // 获取更新后的数据
    const { data: updatedReview } = await supabase
      .from('reviews')
      .select('helpful_count, unhelpful_count')
      .eq('id', reviewId)
      .single();

    return NextResponse.json({
      success: true,
      message: 'Vote recorded',
      helpful_count: updatedReview?.helpful_count || 0,
      unhelpful_count: updatedReview?.unhelpful_count || 0,
    });
  } catch (error) {
    console.error('Vote error:', error);
    return NextResponse.json(
      { error: 'Failed to record vote' },
      { status: 500 }
    );
  }
}
