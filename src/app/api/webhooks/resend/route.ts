import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

// Resend webhook event types
interface ResendWebhookEvent {
  type: string;
  created_at: string;
  data: {
    email_id: string;
    from: string;
    to: string[];
    subject: string;
    created_at: string;
    html?: string;
    text?: string;
    headers?: Record<string, string>;
  };
}

export async function POST(request: Request) {
  try {
    // Get webhook signature for verification
    const signature = request.headers.get('svix-signature');
    const timestamp = request.headers.get('svix-timestamp');
    const webhookId = request.headers.get('svix-id');

    // Parse webhook payload
    const payload: ResendWebhookEvent = await request.json();

    console.log('Resend webhook received:', {
      type: payload.type,
      emailId: payload.data.email_id,
      from: payload.data.from,
      to: payload.data.to,
    });

    // Store webhook event in database
    const supabase = await createAdminClient();
    
    const { error } = await supabase.from('resend_webhook_events').insert({
      event_type: payload.type,
      email_id: payload.data.email_id,
      from_email: payload.data.from,
      to_emails: payload.data.to,
      subject: payload.data.subject,
      event_data: payload.data,
      webhook_signature: signature,
      webhook_timestamp: timestamp,
      webhook_id: webhookId,
      created_at: payload.created_at,
    });

    if (error) {
      console.error('Failed to store webhook event:', error);
      // Don't return error to Resend to avoid retries
    }

    // Handle specific event types
    switch (payload.type) {
      case 'email.sent':
        console.log('Email sent:', payload.data.email_id);
        break;
      case 'email.delivered':
        console.log('Email delivered:', payload.data.email_id);
        break;
      case 'email.bounced':
        console.log('Email bounced:', payload.data.email_id);
        // TODO: Update subscriber status if applicable
        break;
      case 'email.complained':
        console.log('Email complained:', payload.data.email_id);
        // TODO: Update subscriber status if applicable
        break;
      case 'email.opened':
        console.log('Email opened:', payload.data.email_id);
        break;
      case 'email.clicked':
        console.log('Email clicked:', payload.data.email_id);
        break;
      case 'email.received':
        console.log('Email received:', payload.data.email_id);
        // TODO: Store received email for inbox
        break;
      default:
        console.log('Unknown event type:', payload.type);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    // Return 200 to prevent Resend from retrying
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 200 });
  }
}
