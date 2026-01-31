import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function GET() {
  try {
    // Verify admin authentication
    const session = await auth();
    if (!session || !session.user?.isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      return NextResponse.json(
        { error: 'RESEND_API_KEY not configured' },
        { status: 500 }
      );
    }

    // Fetch emails from Resend API
    // https://resend.com/docs/api-reference/emails/list-emails
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

    return NextResponse.json({
      success: true,
      emails: data.data || [],
      hasMore: data.object === 'list',
    });
  } catch (error) {
    console.error('Fetch Resend emails error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch email history' },
      { status: 500 }
    );
  }
}

// Get details of a specific email
export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session || !session.user?.isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { emailId } = await request.json();
    if (!emailId) {
      return NextResponse.json(
        { error: 'Email ID is required' },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      return NextResponse.json(
        { error: 'RESEND_API_KEY not configured' },
        { status: 500 }
      );
    }

    // Fetch email details from Resend API
    // https://resend.com/docs/api-reference/emails/retrieve-email
    const response = await fetch(`https://api.resend.com/emails/${emailId}`, {
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
        { error: 'Failed to fetch email details' },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      email: data,
    });
  } catch (error) {
    console.error('Fetch email details error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch email details' },
      { status: 500 }
    );
  }
}
