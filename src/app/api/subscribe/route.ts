import { NextResponse } from 'next/server';
import { createClient, createAdminClient } from '@/lib/supabase/server';
import { headers } from 'next/headers';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const { email, source = 'homepage', language = 'en' } = await request.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Get IP for tracking (hashed for privacy)
    const headersList = await headers();
    const forwarded = headersList.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : headersList.get('x-real-ip') || 'unknown';
    const ipHash = crypto.createHash('sha256').update(ip).digest('hex');

    // Use admin client to check existing subscribers (bypasses RLS)
    const adminClient = await createAdminClient();

    // Check if email already exists
    const { data: existing } = await adminClient
      .from('subscribers')
      .select('id, status')
      .eq('email', email)
      .single();

    if (existing) {
      if (existing.status === 'active') {
        return NextResponse.json(
          { message: 'already_subscribed' },
          { status: 200 }
        );
      } else {
        // Reactivate unsubscribed user
        const { error } = await adminClient
          .from('subscribers')
          .update({
            status: 'active',
            subscribed_at: new Date().toISOString(),
            ip_hash: ipHash,
            source,
            language,
          })
          .eq('id', existing.id);

        if (error) throw error;

        return NextResponse.json({
          success: true,
          message: 'resubscribed',
        });
      }
    }

    // Insert new subscriber (use regular client as RLS allows anonymous insert)
    const supabase = await createClient();
    const { error } = await supabase.from('subscribers').insert({
      email,
      source,
      language,
      ip_hash: ipHash,
      status: 'active',
    });

    if (error) {
      // Handle duplicate email error
      if (error.code === '23505') {
        return NextResponse.json(
          { message: 'already_subscribed' },
          { status: 200 }
        );
      }
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: 'subscribed',
    });
  } catch (error) {
    console.error('Subscribe error:', error);
    
    // Check if it's a duplicate key error that somehow wasn't caught
    const err = error as { code?: string; message?: string };
    if (err.code === '23505') {
      return NextResponse.json(
        { message: 'already_subscribed' },
        { status: 200 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    );
  }
}
