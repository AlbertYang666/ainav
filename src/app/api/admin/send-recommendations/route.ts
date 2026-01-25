import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { sendToolRecommendationEmail } from '@/lib/email';
import { getFeaturedAIServices } from '@/lib/data';

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

    // 准备工具数据
    const toolsData = tools.map(tool => ({
      name: tool.name,
      description: tool.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://ainav.space'}/zh/service/${tool.id}`,
      category: tool.category,
    }));

    // 发送邮件给所有收件人
    const results = await Promise.allSettled(
      emails.map(email =>
        sendToolRecommendationEmail({
          recipientEmail: email,
          tools: toolsData,
        })
      )
    );

    const successful = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;

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
