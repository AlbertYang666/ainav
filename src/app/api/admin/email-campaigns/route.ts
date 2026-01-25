import { createAdminClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { auth } from '@/auth';

// Get email campaign history
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

    const { data: campaigns, error } = await supabase
      .from('email_campaigns')
      .select('*')
      .order('sent_at', { ascending: false })
      .limit(50);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      campaigns: campaigns || [],
    });
  } catch (error) {
    console.error('Get email campaigns error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch email campaigns' },
      { status: 500 }
    );
  }
}
