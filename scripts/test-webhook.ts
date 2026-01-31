// Test script for Resend webhook endpoint
// Usage: npx tsx scripts/test-webhook.ts

const testWebhook = async () => {
  const webhookUrl = 'http://localhost:3000/api/webhooks/resend';
  
  // Simulate a Resend webhook event
  const mockEvent = {
    type: 'email.delivered',
    created_at: new Date().toISOString(),
    data: {
      email_id: 'test-email-' + Date.now(),
      from: 'noreply@ainav.space',
      to: ['test@example.com'],
      subject: 'Test Email from Webhook',
      created_at: new Date().toISOString(),
      html: '<h1>Test Email</h1><p>This is a test email.</p>',
      text: 'Test Email - This is a test email.',
    },
  };

  console.log('🧪 Testing Resend webhook endpoint...\n');
  console.log('📤 Sending mock event:', JSON.stringify(mockEvent, null, 2));

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'svix-signature': 'test-signature',
        'svix-timestamp': Date.now().toString(),
        'svix-id': 'test-webhook-id',
      },
      body: JSON.stringify(mockEvent),
    });

    const data = await response.json();
    
    console.log('\n✅ Response status:', response.status);
    console.log('📥 Response data:', JSON.stringify(data, null, 2));

    if (data.success) {
      console.log('\n🎉 Webhook endpoint is working correctly!');
      console.log('💡 Check your Supabase database for the stored event.');
    } else {
      console.log('\n⚠️  Webhook processed but returned error');
    }
  } catch (error) {
    console.error('\n❌ Error testing webhook:', error);
  }
};

testWebhook();
