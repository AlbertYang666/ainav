import { createAdminClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { auth } from '@/auth';

// Get all active subscribers
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

    const supabase = await createAdminClient();

    const { data: subscribers, error } = await supabase
      .from('subscribers')
      .select('id, email, status, source, language, subscribed_at, last_sent_at')
      .eq('status', 'active')
      .order('subscribed_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({
      success: true,
      subscribers: subscribers || [],
      count: subscribers?.length || 0,
    });
  } catch (error) {
    console.error('Get subscribers error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscribers' },
      { status: 500 }
    );
  }
}

// Export subscribers as CSV
export async function POST(request: Request) {
  try {
    // Verify admin authentication
    const session = await auth();
    if (!session || !session.user?.isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { format = 'json' } = await request.json();
    const supabase = await createAdminClient();

    const { data: subscribers, error } = await supabase
      .from('subscribers')
      .select('email, status, source, language, subscribed_at')
      .eq('status', 'active')
      .order('subscribed_at', { ascending: false });

    if (error) throw error;

    if (format === 'csv') {
      // Generate CSV
      const headers = ['Email', 'Status', 'Source', 'Language', 'Subscribed At'];
      const rows = subscribers?.map(s => [
        s.email,
        s.status,
        s.source || 'unknown',
        s.language || 'en',
        new Date(s.subscribed_at).toISOString(),
      ]) || [];

      const csv = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
      ].join('\n');

      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="subscribers-${new Date().toISOString().split('T')[0]}.csv"`,
        },
      });
    }

    return NextResponse.json({
      success: true,
      subscribers: subscribers || [],
    });
  } catch (error) {
    console.error('Export subscribers error:', error);
    return NextResponse.json(
      { error: 'Failed to export subscribers' },
      { status: 500 }
    );
  }
}
