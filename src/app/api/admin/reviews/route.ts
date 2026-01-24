import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

// GET - 获取评论列表
export async function GET(request: NextRequest) {
  // 暂时跳过验证，方便本地测试
  // if (!isAdmin(request)) {
  //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  // }

  const status = request.nextUrl.searchParams.get('status') || 'pending';
  
  try {
    const supabaseAdmin = getSupabaseAdmin();
    
    let query = supabaseAdmin
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (status !== 'all') {
      query = query.eq('status', status);
    }
    
    const { data, error } = await query.limit(100);
    
    if (error) {
      console.error('Error fetching reviews:', error);
      return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
    }
    
    return NextResponse.json({ reviews: data });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PATCH - 批准或拒绝评论
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { review_id, action, reason } = body;
    
    if (!review_id || !action) {
      return NextResponse.json(
        { error: 'Missing review_id or action' },
        { status: 400 }
      );
    }
    
    if (!['approve', 'reject'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action. Use "approve" or "reject"' },
        { status: 400 }
      );
    }
    
    const supabaseAdmin = getSupabaseAdmin();
    const newStatus = action === 'approve' ? 'approved' : 'rejected';
    
    // 更新评论状态
    const { data, error } = await supabaseAdmin
      .from('reviews')
      .update({ 
        status: newStatus,
        updated_at: new Date().toISOString(),
      })
      .eq('id', review_id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating review:', error);
      return NextResponse.json({ error: 'Failed to update review' }, { status: 500 });
    }
    
    // 记录审核日志
    await supabaseAdmin.from('moderation_logs').insert({
      review_id,
      action: newStatus,
      reason: reason || null,
      reviewed_by: 'admin', // 可以改为实际的管理员 ID
    });
    
    return NextResponse.json({ 
      success: true, 
      review: data,
      message: `Review ${newStatus}` 
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - 删除评论
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { review_id } = body;
    
    if (!review_id) {
      return NextResponse.json(
        { error: 'Missing review_id' },
        { status: 400 }
      );
    }
    
    const supabaseAdmin = getSupabaseAdmin();
    
    // 先记录删除日志
    await supabaseAdmin.from('moderation_logs').insert({
      review_id,
      action: 'deleted',
      reason: 'Permanently deleted by admin',
      reviewed_by: 'admin',
    });
    
    // 删除评论
    const { error } = await supabaseAdmin
      .from('reviews')
      .delete()
      .eq('id', review_id);
    
    if (error) {
      console.error('Error deleting review:', error);
      return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Review deleted' 
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
