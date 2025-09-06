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

// In-memory conversation history storage
// Format: { channelId: { userId: [{ role: 'user'|'assistant', content: string, timestamp: string }] } }
const conversationHistory = new Map();

// Configuration for history management
const HISTORY_CONFIG = {
  MAX_MESSAGES_PER_USER: 20,    // Maximum messages to keep per user
  HISTORY_EXPIRY_HOURS: 24,    // Clear history older than 24 hours
  CLEANUP_INTERVAL_MINUTES: 60 // Run cleanup every 60 minutes
};

// Helper function to get conversation key with thread support
function getConversationKey(channelId, userId, threadTs = null) {
  // If in a thread, create separate conversation context for thread
  // If not in thread, use 'main' as default thread identifier
  const threadId = threadTs || 'main';
  return `${channelId}:${userId}:${threadId}`;
}

// Helper function to add message to history with thread support
function addToHistory(channelId, userId, role, content, timestamp, threadTs = null) {
  const key = getConversationKey(channelId, userId, threadTs);
  
  if (!conversationHistory.has(key)) {
    conversationHistory.set(key, []);
  }
  
  const history = conversationHistory.get(key);
  
  // Add new message
  history.push({
    role: role, // 'user' or 'assistant'
    content: content,
    timestamp: timestamp || new Date().toISOString(),
    threadTs: threadTs || null // Store thread context
  });
  
  // Keep only the last MAX_MESSAGES_PER_USER messages
  if (history.length > HISTORY_CONFIG.MAX_MESSAGES_PER_USER) {
    history.splice(0, history.length - HISTORY_CONFIG.MAX_MESSAGES_PER_USER);
  }
  
  const threadInfo = threadTs ? ` (thread: ${threadTs})` : ' (main channel)';
  console.log(`💬 Added to history [${key}]: ${role} - "${content.substring(0, 50)}${content.length > 50 ? '...' : ''}"${threadInfo}`);
}

// Helper function to get conversation history for a user with thread support
function getConversationHistory(channelId, userId, threadTs = null, limit = 10) {
  const key = getConversationKey(channelId, userId, threadTs);
  const history = conversationHistory.get(key) || [];
  
  // Return the last 'limit' messages, formatted for the backend
  const recentHistory = history.slice(-limit);
  
  // Format for backend API (convert to simple string array or keep as objects)
  const formattedHistory = recentHistory.map(msg => ({
    role: msg.role,
    content: msg.content,
    timestamp: msg.timestamp,
    threadTs: msg.threadTs
  }));
  
  const threadInfo = threadTs ? ` (thread: ${threadTs})` : ' (main channel)';
  console.log(`📚 Retrieved history [${key}]: ${formattedHistory.length} messages${threadInfo}`);
  return formattedHistory;
}


// Helper function to clean up old conversation history
function cleanupOldHistory() {
  const cutoffTime = new Date();
  cutoffTime.setHours(cutoffTime.getHours() - HISTORY_CONFIG.HISTORY_EXPIRY_HOURS);
  
  let cleanedCount = 0;
  
  for (const [key, history] of conversationHistory.entries()) {
    // Filter out messages older than cutoff time
    const filteredHistory = history.filter(msg => {
      const messageTime = new Date(msg.timestamp);
      return messageTime > cutoffTime;
    });
    
    if (filteredHistory.length !== history.length) {
      const removed = history.length - filteredHistory.length;
      cleanedCount += removed;
      
      if (filteredHistory.length === 0) {
        conversationHistory.delete(key);
      } else {
        conversationHistory.set(key, filteredHistory);
      }
    }
  }
  
  if (cleanedCount > 0) {
    console.log(`🧹 Cleaned up ${cleanedCount} old messages from conversation history`);
  }
}

// Schedule periodic cleanup
setInterval(cleanupOldHistory, HISTORY_CONFIG.CLEANUP_INTERVAL_MINUTES * 60 * 1000);

// Helper function to get bot user ID
let botUserId = null;
async function getBotUserId() {
  if (!botUserId) {
    try {
      const auth = await app.client.auth.test();
      botUserId = auth.user_id;
    } catch (error) {
      console.error('❌ Error getting bot user ID:', error);
    }
  }
  return botUserId;
}

// Helper function to call backend API with conversation history and thread support
async function callBackendAPI(userId, message, channel, timestamp, threadTs, logger) {
  try {
    const threadInfo = threadTs ? ` (thread: ${threadTs})` : ' (main channel)';
    logger.info(`🔄 Calling backend API for user ${userId}: "${message}"${threadInfo}`);
    
    // Get conversation history from local memory with thread context
    const conversationHx = getConversationHistory(channel, userId, threadTs, 10);
    
    logger.info(`📚 Using ${conversationHx.length} messages from local conversation history${threadInfo}`);
    
    // Add current user message to history before making API call
    addToHistory(channel, userId, 'user', message, timestamp, threadTs);

    logger.info(`hey mahesh making call with history`, conversationHx);
    const response = await apiClient.post('/api/chat', {
      userId: userId,
      message: message,
      channel: channel,
      timestamp: timestamp,
      metadata: {
        thread_ts: threadTs || timestamp,
        conversation_history: conversationHx,
        history_count: conversationHx.length,
        is_thread: !!threadTs
      }
    });
    
    logger.info(`✅ Backend API response received`);
    
    // Add bot response to history with thread context
    if (response.data.reply) {
      addToHistory(channel, userId, 'assistant', response.data.reply, new Date().toISOString(), threadTs);
    }
    
    return {
      success: true,
      reply: response.data.reply,
      confidence: response.data.confidence,
      processingTime: response.data.processing_time_ms,
      historyCount: conversationHx.length,
      isThread: !!threadTs
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
  try {
    // Get bot user ID
    const currentBotUserId = await getBotUserId();
    logger.info("hey bot is called in message")
    
    // Check if bot was mentioned
    if (message.text && message.text.includes(`<@${currentBotUserId}>`)) {
      logger.info(`Bot mentioned in message: ${message.text}`);
      console.log(`💬 Processing message from user ${message.user} in channel ${message.channel}`);
      
      // Extract clean message without bot mention
      const cleanMessage = message.text.replace(`<@${currentBotUserId}>`, '').trim();
      
      // Call backend API with conversation history
      const result = await callBackendAPI(
        message.user, 
        cleanMessage || message.text, 
        message.channel, 
        message.ts,
        message.thread_ts, // Pass thread timestamp if in thread
        logger
      );
      
      if (result.success) {
        await say({
          text: result.reply,
          thread_ts: message.thread_ts || message.ts // Reply in thread if message is in thread
        });
        
        logger.info(`✅ Response sent successfully (${result.processingTime}ms, ${result.historyCount} context messages)`);
      } else {
        await say({
          text: `Sorry, I encountered an error: ${result.error}. Please make sure the backend server is running.`,
          thread_ts: message.thread_ts || message.ts
        });
      }
    }
  } catch (error) {
    logger.error('❌ Error in message handler:', error);
    await say({
      text: 'Sorry, I encountered an unexpected error. Please try again.',
      thread_ts: message.thread_ts || message.ts
    }).catch(err => logger.error('Failed to send error message:', err));
  }
});

// Direct mention handler (@bot command)
app.event('app_mention', async ({ event, say, logger }) => {
  try {
    logger.info(`Bot mentioned: ${event.text}`);
    console.log(`🎯 App mention from user ${event.user} in channel ${event.channel}`, event);

    // Get bot user ID for cleaning message
    const currentBotUserId = await getBotUserId();
    
    // Extract clean message without bot mention
    const cleanMessage = event.text.replace(`<@${currentBotUserId}>`, '').trim();

    // Call backend API with conversation history
    const result = await callBackendAPI(
      event.user, 
      cleanMessage || event.text, 
      event.channel, 
      event.ts,
      event.thread_ts, // Pass thread timestamp if in thread
      logger
    );
    
    if (result.success) {
      const responseText = result.historyCount > 0 
        ? `${result.reply}\n\n_💭 Used ${result.historyCount} previous messages for context_`
        : result.reply;
        
      await say({
        text: responseText,
        channel: event.channel,
        thread_ts: event.thread_ts || event.ts // Reply in thread if mention is in thread
      });
      
      logger.info(`✅ Mention response sent successfully (${result.processingTime}ms, ${result.historyCount} context messages)`);
    } else {
      await say({
        text: `Sorry, I encountered an error: ${result.error}. Please make sure the backend server is running on ${BACKEND_API_URL}`,
        channel: event.channel,
        thread_ts: event.thread_ts || event.ts
      });
    }
  } catch (error) {
    logger.error('❌ Error in app_mention handler:', error);
    await say({
      text: 'Sorry, I encountered an unexpected error. Please try again.',
      channel: event.channel,
      thread_ts: event.thread_ts || event.ts
    }).catch(err => logger.error('Failed to send error message:', err));
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
    console.log('  ✅ Conversation History: Local in-memory storage');
    console.log('  ✅ Thread Support: Thread-aware context tracking');
    console.log('  ✅ Auto Cleanup: 24-hour history expiry');
    console.log('');
    console.log('🎯 Ready to process Slack messages with conversation context!');
    console.log('💡 Make sure your backend server is running on port 3000');
    console.log('');
    console.log('🧠 Local Memory Conversation Features:');
    console.log('  • Maintains up to 20 messages per user per channel');
    console.log('  • Uses only local memory (no Slack API calls)');
    console.log('  • Auto-expires messages after 24 hours');
    console.log('  • Thread-aware conversation tracking');
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
