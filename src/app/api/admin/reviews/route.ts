// src/app/api/admin/reviews/route.ts
// 管理员审核评论的后端路由
import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

// 审核评论（仅内部使用，需要管理员令牌）
export async function PATCH(request: NextRequest) {
  try {
    // TODO: 在实际应用中，添加管理员身份验证
    // const token = request.headers.get('authorization');
    // if (!token || !verifyAdminToken(token)) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const { review_id, action, reason } = await request.json();

    if (!review_id || !['approve', 'reject'].includes(action)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    // 更新评论状态
    const { error: updateError } = await supabase
      .from('reviews')
      .update({ status: action === 'approve' ? 'approved' : 'rejected' })
      .eq('id', review_id);

    if (updateError) throw updateError;

    // 记录审核日志
    const { error: logError } = await supabase
      .from('moderation_logs')
      .insert([
        {
          review_id,
          action,
          reason: reason || null,
          reviewed_by: 'admin',  // TODO: 使用真实管理员 ID
        },
      ]);

    if (logError) console.warn('Failed to log moderation:', logError);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Admin review error:', error);
    return NextResponse.json({ error: 'Failed to process review' }, { status: 500 });
  }
}

// 获取待审核评论列表
export async function GET(request: NextRequest) {
  try {
    // TODO: 添加管理员身份验证
    const supabase = getSupabaseAdmin();

    const { data: pendingReviews } = await supabase
      .from('reviews')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: true })
      .limit(50);

    return NextResponse.json({ reviews: pendingReviews });
  } catch (error) {
    console.error('Failed to fetch pending reviews:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}
