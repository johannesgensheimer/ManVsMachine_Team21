require('dotenv').config();
const { App } = require('@slack/bolt');
const axios = require('axios');

// Backend API configuration
const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:3000';

// Initialize HTTP client for backend API calls
const apiClient = axios.create({
  baseURL: BACKEND_API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000 // 30 second timeout
});

// Initialize Slack app with Socket Mode
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  port: process.env.SLACK_PORT || 3001 // Use different port for Slack bot
});

// Helper function to call backend API
async function callBackendAPI(userId, message, channel, timestamp, logger) {
  try {
    logger.info(`🔄 Calling backend API for user ${userId}: "${message}"`);
    
    const response = await apiClient.post('/api/chat', {
      userId: userId,
      message: message,
      channel: channel,
      timestamp: timestamp,
      metadata: {
        thread_ts: timestamp,
        conversation_history: []
      }
    });
    
    logger.info(`✅ Backend API response received`);
    return {
      success: true,
      reply: response.data.reply || response.data.text,
      text: response.data.text,
      blocks: response.data.blocks,
      confidence: response.data.confidence,
      processingTime: response.data.processing_time_ms
    };
  } catch (error) {
    logger.error('❌ Backend API error:', error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.error?.message || error.message
    };
  }
}

// Basic message handler - responds when bot is mentioned
app.message(async ({ message, say, logger }) => {
  // Check if bot was mentioned
  if (message.text && message.text.includes(`<@${app.client.auth.test().user_id}>`)) {
    logger.info(`Bot mentioned in message: ${message.text}`);
    
    // Call backend API
    const result = await callBackendAPI(
      message.user, 
      message.text, 
      message.channel, 
      message.ts, 
      logger
    );
    
    if (result.success) {
      await say({
        text: result.reply,
        thread_ts: message.ts
      });
    } else {
      await say({
        text: `Sorry, I encountered an error: ${result.error}. Please make sure the backend server is running.`,
        thread_ts: message.ts
      });
    }
  }
});

// Direct mention handler (@bot command)
app.event('app_mention', async ({ event, say, logger }) => {
  logger.info(`Bot mentioned: ${event.text}`);
  
  // Call backend API
  const result = await callBackendAPI(
    event.user, 
    event.text, 
    event.channel, 
    event.ts, 
    logger
  );
  
  if (result.success) {
    // Debug: Log what we received from backend
    logger.info('Backend response data:', JSON.stringify({
      hasText: !!result.text,
      hasReply: !!result.reply,
      hasBlocks: !!result.blocks,
      textValue: result.text,
      replyValue: result.reply
    }));
    
    // Handle both text and Block Kit responses
    const response = {
      channel: event.channel,
      thread_ts: event.ts
    };
    
    // Always ensure we have text (required by Slack)
    const fallbackText = result.text || result.reply || 'Response received from backend';
    response.text = fallbackText;
    
    // If backend returns blocks (button format), add them
    if (result.blocks) {
      response.blocks = result.blocks;
    }
    
    logger.info('Sending to Slack:', JSON.stringify({
      hasText: !!response.text,
      hasBlocks: !!response.blocks,
      textLength: response.text?.length
    }));
    
    await say(response);
  } else {
    await say({
      text: `Sorry, I encountered an error: ${result.error}. Please make sure the backend server is running on ${BACKEND_API_URL}`,
      channel: event.channel,
      thread_ts: event.ts
    });
  }
});

// Error handling
app.error((error) => {
  console.error('Slack app error:', error);
});

// Start the app
(async () => {
  try {
    await app.start();
    const slackPort = process.env.SLACK_PORT || 3001;
    console.log('⚡️ ManVsMachine Team21 Slack bot is running!');
    console.log(`🚀 Slack Bot Port: ${slackPort}`);
    console.log(`🔗 Backend API URL: ${BACKEND_API_URL}`);
    console.log('🔌 Socket Mode: Enabled');
    console.log('');
    console.log('📋 Integration Status:');
    console.log('  ✅ Slack Bot Framework: @slack/bolt');
    console.log('  ✅ HTTP Client: axios');
    console.log('  ✅ Backend Integration: Configured');
    console.log('');
    console.log('🎯 Ready to process Slack messages and forward to LangChain backend!');
    console.log('💡 Make sure your backend server is running on port 3000');
    console.log('');
    
    // Test backend connection
    try {
      console.log('🔍 Testing backend connection...');
      const healthCheck = await apiClient.get('/health');
      console.log('✅ Backend connection successful:', healthCheck.data.status);
    } catch (healthError) {
      console.log('⚠️ Backend connection failed:', healthError.message);
      console.log('💡 Start backend with: npm run server');
    }
    
    // Send startup notification to a channel (optional)
    if (process.env.SLACK_NOTIFICATION_CHANNEL) {
      try {
        await app.client.chat.postMessage({
          token: process.env.SLACK_BOT_TOKEN,
          channel: process.env.SLACK_NOTIFICATION_CHANNEL,
          text: '🤖 ManVsMachine Team21 bot is now online and ready! Mention me to interact with the supplier management system.'
        });
        console.log('📨 Startup message sent to Slack');
      } catch (msgError) {
        console.log('⚠️ Could not send startup message:', msgError.message);
        console.log('💡 Bot is running but may need to be invited to channels');
      }
    }
  } catch (error) {
    console.error('Failed to start app:', error);
    process.exit(1);
  }
})();
