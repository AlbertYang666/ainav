import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

// POST - 批量操作
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;
    
    if (!action) {
      return NextResponse.json(
        { error: 'Missing action' },
        { status: 400 }
      );
    }
    
    const supabaseAdmin = getSupabaseAdmin();
    
    if (action === 'approve_all') {
      // 批准所有待审核评论
      const { data, error } = await supabaseAdmin
        .from('reviews')
        .update({ 
          status: 'approved',
          updated_at: new Date().toISOString(),
        })
        .eq('status', 'pending')
        .select();
      
      if (error) {
        console.error('Error approving all reviews:', error);
        return NextResponse.json({ error: 'Failed to approve reviews' }, { status: 500 });
      }
      
      // 记录批量审核日志
      if (data && data.length > 0) {
        const logs = data.map(review => ({
          review_id: review.id,
          action: 'approved',
          reason: 'Batch approval',
          reviewed_by: 'admin',
        }));
        
        await supabaseAdmin.from('moderation_logs').insert(logs);
      }
      
      return NextResponse.json({ 
        success: true, 
        count: data?.length || 0,
        message: `${data?.length || 0} reviews approved` 
      });
    }
    
    if (action === 'reject_all') {
      // 拒绝所有待审核评论
      const { data, error } = await supabaseAdmin
        .from('reviews')
        .update({ 
          status: 'rejected',
          updated_at: new Date().toISOString(),
        })
        .eq('status', 'pending')
        .select();
      
      if (error) {
        console.error('Error rejecting all reviews:', error);
        return NextResponse.json({ error: 'Failed to reject reviews' }, { status: 500 });
      }
      
      return NextResponse.json({ 
        success: true, 
        count: data?.length || 0,
        message: `${data?.length || 0} reviews rejected` 
      });
    }
    
    if (action === 'recalculate_ratings') {
      // 重新计算所有评分
      const { data: services, error: servicesError } = await supabaseAdmin
        .from('reviews')
        .select('service_id')
        .eq('status', 'approved');
      
      if (servicesError) {
        return NextResponse.json({ error: 'Failed to get services' }, { status: 500 });
      }
      
      // 获取唯一的 service_id 列表
      const uniqueServiceIds = [...new Set(services?.map(r => r.service_id) || [])];
      
      let updated = 0;
      for (const serviceId of uniqueServiceIds) {
        // 计算每个服务的评分
        const { data: reviews } = await supabaseAdmin
          .from('reviews')
          .select('rating')
          .eq('service_id', serviceId)
          .eq('status', 'approved');
        
        if (reviews && reviews.length > 0) {
          const avgScore = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
          
          await supabaseAdmin
            .from('ratings')
            .upsert({
              service_id: serviceId,
              average_score: Math.round(avgScore * 100) / 100,
              review_count: reviews.length,
              updated_at: new Date().toISOString(),
            }, { onConflict: 'service_id' });
          
          updated++;
        }
      }
      
      return NextResponse.json({ 
        success: true, 
        count: updated,
        message: `${updated} ratings recalculated` 
      });
    }
    
    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
