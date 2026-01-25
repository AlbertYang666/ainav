import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { getAllAIServices } from '@/lib/data';

export async function GET() {
  try {
    const supabase = getSupabaseAdmin();
    
    // 获取服务总数
    const services = getAllAIServices();
    const totalServices = services.length;
    
    // 获取评论统计
    const { count: totalReviews } = await supabase
      .from('reviews')
      .select('*', { count: 'exact', head: true });
    
    const { count: pendingReviews } = await supabase
      .from('reviews')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');
    
    // 获取提交统计
    const { count: pendingSubmissions } = await supabase
      .from('service_submissions')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');
    
    // 获取平均评分
    const { data: ratings } = await supabase
      .from('ratings')
      .select('average_score');
    
    const averageRating = ratings && ratings.length > 0
      ? ratings.reduce((sum, r) => sum + (r.average_score || 0), 0) / ratings.length
      : 0;
    
    // 获取最近 5 条评论
    const { data: recentReviews } = await supabase
      .from('reviews')
      .select('id, service_id, rating, content, created_at')
      .order('created_at', { ascending: false })
      .limit(5);
    
    return NextResponse.json({
      totalServices,
      totalReviews: totalReviews || 0,
      pendingReviews: pendingReviews || 0,
      pendingSubmissions: pendingSubmissions || 0,
      averageRating,
      recentReviews: recentReviews || [],
    });
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
