import { NextResponse } from 'next/server';
import { auth } from '@/auth';

// 邮箱账户配置接口
interface MailboxAccount {
  id: string;
  name: string;
  email: string;
  provider: 'resend' | 'custom';
  apiKey?: string;
}

// 模拟存储（实际应该存在数据库中）
// 你可以根据需要将这些配置存储在 Supabase 中
const mailboxAccounts: MailboxAccount[] = [
  {
    id: 'default',
    name: '默认账户',
    email: process.env.EMAIL_FROM || 'noreply@ainav.space',
    provider: 'resend',
  },
  {
    id: 'admin',
    name: '管理员账户',
    email: process.env.ADMIN_EMAIL || 'admin@ainav.space',
    provider: 'resend',
  },
  {
    id: 'privacy',
    name: '隐私账户',
    email: 'privacy@ainav.space',
    provider: 'resend',
  },
  {
    id: 'contact',
    name: '联系账户',
    email: 'contact@ainav.space',
    provider: 'resend',
  },
];

// 获取所有邮箱账户
export async function GET() {
  try {
    const session = await auth();
    if (!session || !session.user?.isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      accounts: mailboxAccounts,
    });
  } catch (error) {
    console.error('Get mailbox accounts error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch mailbox accounts' },
      { status: 500 }
    );
  }
}

// 获取指定账户的邮件列表
export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session || !session.user?.isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { accountId, type = 'sent' } = await request.json();

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      return NextResponse.json(
        { error: 'RESEND_API_KEY not configured' },
        { status: 500 }
      );
    }

    const account = mailboxAccounts.find(acc => acc.id === accountId);
    if (!account) {
      return NextResponse.json(
        { error: 'Account not found' },
        { status: 404 }
      );
    }

    // 根据类型获取邮件
    const apiUrl = 'https://api.resend.com/emails';
    
    // Resend API 参数
    // 注意：Resend 主要用于发送邮件，接收邮件需要使用 webhooks
    // 这里我们先实现发送邮件的查询
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Resend API error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch emails from Resend' },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Filter emails for specific account
    const filteredEmails = data.data?.filter((email: { from: string; to?: string[] }) => {
      return email.from === account.email || 
             email.from?.includes(account.email) ||
             email.to?.includes(account.email);
    }) || [];

    return NextResponse.json({
      success: true,
      account,
      emails: filteredEmails,
      type,
    });
  } catch (error) {
    console.error('Fetch emails error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch emails' },
      { status: 500 }
    );
  }
}
