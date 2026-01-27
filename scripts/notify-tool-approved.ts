/**
 * Script to notify submitter that their tool has been approved
 * Usage: npx tsx scripts/notify-tool-approved.ts
 */

import { sendToolApprovedEmail } from '../src/lib/email';

async function main() {
  // Fast Image AI submission details
  const toolName = 'Fast Image AI';
  const toolUrl = 'https://fastimage.ai';
  const submitterEmail = 'carterliam958@gmail.com';

  console.log('Sending approval notification...');
  console.log(`Tool: ${toolName}`);
  console.log(`URL: ${toolUrl}`);
  console.log(`Submitter: ${submitterEmail}`);
  console.log('---');

  try {
    await sendToolApprovedEmail({
      toolName,
      toolUrl,
      submitterEmail,
    });

    console.log('✅ Approval notification sent successfully!');
  } catch (error) {
    console.error('❌ Failed to send notification:', error);
    process.exit(1);
  }
}

main();
