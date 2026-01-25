import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { sendToolRecommendationEmail } from '@/lib/email';
import { getFeaturedAIServices } from '@/lib/data';
import { createAdminClient } from '@/lib/supabase/server';

/**
 * 发送工具推荐邮件 API
 * 仅管理员可以调用
 */
export async function POST(request: NextRequest) {
  try {
    // 验证管理员身份
    const session = await auth();
    if (!session || !session.user?.isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { emails, toolIds } = body;

    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return NextResponse.json(
        { error: '请提供收件人邮箱列表' },
        { status: 400 }
      );
    }

    // 获取推荐的工具
    let tools;
    if (toolIds && Array.isArray(toolIds) && toolIds.length > 0) {
      // 如果指定了工具ID，获取这些工具
      const allTools = getFeaturedAIServices('zh');
      tools = allTools.filter(tool => toolIds.includes(tool.id)).slice(0, 5);
    } else {
      // 否则使用精选工具
      tools = getFeaturedAIServices('zh').slice(0, 5);
    }

    if (tools.length === 0) {
      return NextResponse.json(
        { error: '未找到可推荐的工具' },
        { status: 400 }
      );
    }

    // Get subscribers to add unsubscribe links
    const supabase = await createAdminClient();
    const { data: subscribers } = await supabase
      .from('subscribers')
      .select('email, unsubscribe_token')
      .in('email', emails);

    const subscriberMap = new Map(
      subscribers?.map(s => [s.email, s.unsubscribe_token]) || []
    );

    // 准备工具数据
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ainav.space';
    const toolsData = tools.map(tool => ({
      name: tool.name,
      description: tool.description,
      url: `${baseUrl}/zh/service/${tool.id}`,
      category: tool.category,
    }));

    // 发送邮件给所有收件人
    const results = await Promise.allSettled(
      emails.map(email => {
        const unsubscribeToken = subscriberMap.get(email);
        const unsubscribeUrl = unsubscribeToken
          ? `${baseUrl}/api/unsubscribe?token=${unsubscribeToken}`
          : undefined;

        return sendToolRecommendationEmail({
          recipientEmail: email,
          tools: toolsData,
          unsubscribeUrl,
        });
      })
    );

    const successful = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;

    // Update last_sent_at for successful sends
    if (successful > 0) {
      const successfulEmails = emails.filter((_, idx) => results[idx].status === 'fulfilled');
      await supabase
        .from('subscribers')
        .update({ last_sent_at: new Date().toISOString() })
        .in('email', successfulEmails);
    }

    // Record campaign
    await supabase.from('email_campaigns').insert({
      subject: '精选 AI 工具推荐',
      recipient_count: emails.length,
      successful_count: successful,
      failed_count: failed,
      sent_by: session.user.email || 'admin',
      campaign_type: 'newsletter',
    });

    return NextResponse.json({
      success: true,
      message: `成功发送 ${successful} 封邮件${failed > 0 ? `，失败 ${failed} 封` : ''}`,
      stats: {
        total: emails.length,
        successful,
        failed,
      },
    });
  } catch (error) {
    console.error('Send recommendation emails error:', error);
    return NextResponse.json(
      { error: '发送邮件失败' },
      { status: 500 }
    );
  }
}
