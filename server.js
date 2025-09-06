require('dotenv').config();
const { App } = require('@slack/bolt');

// Initialize Slack app with Socket Mode
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  port: process.env.PORT || 3000
});

// Basic message handler - responds when bot is mentioned
app.message(async ({ message, say, logger }) => {
  // Check if bot was mentioned
  if (message.text && message.text.includes(`<@${app.client.auth.test().user_id}>`)) {
    logger.info(`Bot mentioned in message: ${message.text}`);
    
    await say({
      text: `Hello <@${message.user}>! I'm your ManVsMachine Team21 bot. Ready to help!`,
      thread_ts: message.ts
    });
  }
});

// Direct mention handler (@bot command)
app.event('app_mention', async ({ event, say, logger }) => {
  logger.info(`Bot mentioned: ${event.text}`);
  
  // TODO: Add LLM integration here
  // TODO: Connect to teammate's backend API
  
  await say({
    text: `Hi <@${event.user}>! You mentioned me. What can I help you with?`,
    channel: event.channel,
    thread_ts: event.ts
  });
});

// Error handling
app.error((error) => {
  console.error('Slack app error:', error);
});

// Start the app
(async () => {
  try {
    await app.start();
    console.log('⚡️ ManVsMachine Team21 Slack bot is running!');
    console.log(`🚀 Port: ${process.env.PORT || 3000}`);
    console.log('🔌 Socket Mode: Enabled');
    
    // Send startup notification to a channel
    // Replace 'CHANNEL_ID' with your actual channel ID or channel name
    try {
      await app.client.chat.postMessage({
        token: process.env.SLACK_BOT_TOKEN,
        channel: '#dev-frontend', // Send DM to yourself
        text: '🤖 ManVsMachine Team21 bot is now online and ready! Mention me with @bot to interact.'
      });
      console.log('📨 Startup message sent to Slack');
    } catch (msgError) {
      console.log('⚠️ Could not send startup message:', msgError.message);
      console.log('💡 Bot is running but may need to be invited to channels');
    }
  } catch (error) {
    console.error('Failed to start app:', error);
    process.exit(1);
  }
})();
