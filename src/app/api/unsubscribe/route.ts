import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { error: 'Missing unsubscribe token' },
        { status: 400 }
      );
    }

    const supabase = await createAdminClient();

    // Find subscriber by token
    const { data: subscriber, error: findError } = await supabase
      .from('subscribers')
      .select('id, email, status')
      .eq('unsubscribe_token', token)
      .single();

    if (findError || !subscriber) {
      return NextResponse.json(
        { error: 'Invalid unsubscribe token' },
        { status: 404 }
      );
    }

    if (subscriber.status === 'unsubscribed') {
      return NextResponse.json({
        success: true,
        message: 'already_unsubscribed',
        email: subscriber.email,
      });
    }

    // Update subscriber status
    const { error: updateError } = await supabase
      .from('subscribers')
      .update({
        status: 'unsubscribed',
        unsubscribed_at: new Date().toISOString(),
      })
      .eq('id', subscriber.id);

    if (updateError) throw updateError;

    return NextResponse.json({
      success: true,
      message: 'unsubscribed',
      email: subscriber.email,
    });
  } catch (error) {
    console.error('Unsubscribe error:', error);
    return NextResponse.json(
      { error: 'Failed to unsubscribe' },
      { status: 500 }
    );
  }
}

// GET method for email link unsubscribe
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  const lang = searchParams.get('lang') || 'en'; // Get language from query param, default to 'en'

  if (!token) {
    return new NextResponse('Missing token', { status: 400 });
  }

  const supabase = await createAdminClient();

  const { data: subscriber, error: findError } = await supabase
    .from('subscribers')
    .select('id, email, status, language')
    .eq('unsubscribe_token', token)
    .single();

  if (findError || !subscriber) {
    return new NextResponse('Invalid token', { status: 404 });
  }

  if (subscriber.status !== 'unsubscribed') {
    await supabase
      .from('subscribers')
      .update({
        status: 'unsubscribed',
        unsubscribed_at: new Date().toISOString(),
      })
      .eq('id', subscriber.id);
  }

  // Use subscriber's language preference, fallback to query param, then to 'en'
  const userLang = subscriber.language || lang;
  
  // Redirect to localized unsubscribe confirmation page
  return NextResponse.redirect(
    new URL(`/${userLang}/unsubscribe/success?email=${encodeURIComponent(subscriber.email)}`, request.url)
  );
}
