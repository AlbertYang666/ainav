import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { sendToolApprovedEmail } from '@/lib/email';
import { createAdminClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    // Check authentication and admin privileges
    const session = await auth();
    
    if (!session || !session.user?.isAdmin) {
      return NextResponse.json(
        { error: '未授权访问' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { toolName, toolUrl, submitterEmail } = body;

    // Validate input
    if (!toolName || !toolUrl || !submitterEmail) {
      return NextResponse.json(
        { error: '缺少必填字段' },
        { status: 400 }
      );
    }

    if (!submitterEmail.includes('@')) {
      return NextResponse.json(
        { error: '邮箱格式无效' },
        { status: 400 }
      );
    }

    // Send approval notification email
    let emailSent = false;
    try {
      await sendToolApprovedEmail({
        toolName,
        toolUrl,
        submitterEmail,
      });
      emailSent = true;
    } catch (emailError) {
      console.error('Email send error:', emailError);
    }

    // Record to email_campaigns table
    const supabase = await createAdminClient();
    await supabase.from('email_campaigns').insert({
      subject: `[AI Nav] 🎉 Your tool "${toolName}" has been approved!`,
      recipient_count: 1,
      successful_count: emailSent ? 1 : 0,
      failed_count: emailSent ? 0 : 1,
      sent_by: session.user.email || 'admin',
      campaign_type: 'approval_notification',
      metadata: {
        toolName,
        toolUrl,
        submitterEmail,
      },
    });

    if (!emailSent) {
      return NextResponse.json(
        { error: '发送邮件失败，但记录已保存' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `批准通知已发送至 ${submitterEmail}`,
    });

  } catch (error) {
    console.error('Failed to send tool approval notification:', error);
    return NextResponse.json(
      { error: '发送邮件失败，请检查配置' },
      { status: 500 }
    );
  }
}
