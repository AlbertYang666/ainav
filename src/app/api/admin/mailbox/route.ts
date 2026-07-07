import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { createAdminClient } from '@/lib/supabase/server';

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

// Fetch emails for specific account
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

    const account = mailboxAccounts.find(acc => acc.id === accountId);
    if (!account) {
      return NextResponse.json(
        { error: 'Account not found' },
        { status: 404 }
      );
    }

    let emails = [];

    if (type === 'received') {
      // Get received emails from webhook events table
      const supabase = await createAdminClient();
      
      const { data: webhookEvents, error } = await supabase
        .from('resend_webhook_events')
        .select('*')
        .eq('event_type', 'email.received')
        .filter('to_emails', 'cs', `{"${account.email}"}`)
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) {
        console.error('Failed to fetch received emails:', error);
        return NextResponse.json(
          { error: 'Failed to fetch received emails from database' },
          { status: 500 }
        );
      }

      // Transform webhook events to email format
      emails = webhookEvents?.map((event: {
        email_id: string;
        from_email: string;
        to_emails: string[];
        subject: string;
        created_at: string;
        event_data?: { html?: string; text?: string };
      }) => ({
        id: event.email_id,
        from: event.from_email,
        to: event.to_emails,
        subject: event.subject || '(No subject)',
        created_at: event.created_at,
        last_event: 'received',
        html: event.event_data?.html,
        text: event.event_data?.text,
      })) || [];

    } else {
      // Get sent emails from Resend API
      const resendApiKey = process.env.RESEND_API_KEY;
      if (!resendApiKey) {
        return NextResponse.json(
          { error: 'RESEND_API_KEY not configured' },
          { status: 500 }
        );
      }

      const response = await fetch('https://api.resend.com/emails', {
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

      // Filter sent emails for specific account
      emails = data.data?.filter((email: { from: string; to?: string[] }) => {
        return email.from === account.email || 
               email.from?.includes(account.email);
      }) || [];
    }

    return NextResponse.json({
      success: true,
      account,
      emails,
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
