import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { createAdminClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const session = await auth();
    if (!session || !session.user?.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = await createAdminClient();
    
    // Fetch recent webhook events
    const { data, error } = await supabase
      .from('resend_webhook_events')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) {
      console.error('Failed to fetch webhook events:', error);
      return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      events: data || [],
    });
  } catch (error) {
    console.error('Get webhook events error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
