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
  console.log(`🔍 DEBUG: addToHistory called with key: ${key}`);
  
  if (!conversationHistory.has(key)) {
    conversationHistory.set(key, []);
    console.log(`🔍 DEBUG: Created new history for key: ${key}`);
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
  console.log(`🔍 DEBUG: History now has ${history.length} messages for key: ${key}`);
  console.log(`🔍 DEBUG: Full history for this key:`, history);
}

// Helper function to get conversation history for a user with thread support
function getConversationHistory(channelId, userId, threadTs = null, limit = 10) {
  const key = getConversationKey(channelId, userId, threadTs);
  console.log(`🔍 DEBUG: getConversationHistory called with key: ${key}`);
  const history = conversationHistory.get(key) || [];
  console.log(`🔍 DEBUG: Retrieved history for key ${key}:`, history);
  
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
    
    // Add current user message to history BEFORE getting conversation history
    console.log(`🔍 DEBUG: Adding message to history - Channel: ${channel}, User: ${userId}, ThreadTs: ${threadTs}`);
    addToHistory(channel, userId, 'user', message, timestamp, threadTs);
    
    // Get conversation history from local memory with thread context (now includes current message)
    const conversationHx = getConversationHistory(channel, userId, threadTs, 10);
    
    logger.info(`📚 Using ${conversationHx.length} messages from local conversation history${threadInfo}`);
    console.log(`🔍 DEBUG: Conversation key: ${getConversationKey(channel, userId, threadTs)}`);
    console.log(`🔍 DEBUG: Full conversation history:`, conversationHx);
    console.log(`🔍 DEBUG: Total stored conversations:`, conversationHistory.size);
    console.log(`🔍 DEBUG: All conversation keys:`, Array.from(conversationHistory.keys()));

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
    
    // Add bot response to history with thread context (clean response without metadata)
    if (response.data.reply) {
      // Clean the response by removing metadata and formatting
      let cleanResponse = response.data.reply;
      
      // Remove context metadata like ":thought_bubble: Used X previous messages for context"
      cleanResponse = cleanResponse.replace(/:thought_bubble: Used \d+ previous messages for context/g, '');
      
      // Remove extra whitespace and newlines
      cleanResponse = cleanResponse.trim();
      
      addToHistory(channel, userId, 'assistant', cleanResponse, new Date().toISOString(), threadTs);
    }
    
    return {
      success: true,
      reply: response.data.reply || response.data.text,
      text: response.data.text,
      blocks: response.data.blocks,
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

// Basic message handler - responds when bot is mentioned OR in threads
app.message(async ({ message, say, logger }) => {
  try {
    // Get bot user ID
    const currentBotUserId = await getBotUserId();
    logger.info("hey bot is called in message")
    
    // Check if bot was mentioned OR if we're in a thread (for multi-message conversations)
    const isBotMentioned = message.text && message.text.includes(`<@${currentBotUserId}>`);
    const isInThread = message.thread_ts; // This indicates we're in a thread
    
    console.log(`🔍 DEBUG: Message details:`, {
      text: message.text,
      thread_ts: message.thread_ts,
      ts: message.ts,
      isBotMentioned,
      isInThread,
      channel: message.channel,
      user: message.user
    });
    
    if (isBotMentioned || isInThread) {
      logger.info(`Processing message: ${isBotMentioned ? 'bot mentioned' : 'in thread'} - ${message.text}`);
      console.log(`💬 Processing message from user ${message.user} in channel ${message.channel}${isInThread ? ' (thread)' : ''}`);
      
      // Extract clean message without bot mention
      const cleanMessage = message.text ? message.text.replace(`<@${currentBotUserId}>`, '').trim() : message.text;
      
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
      // Always reply in a thread to maintain conversation continuity
      const threadTs = message.thread_ts || message.ts;
      
      // Clean the response text by removing metadata
      let responseText = result.reply;
      
      // Remove context metadata like ":thought_bubble: Used X previous messages for context"
      responseText = responseText.replace(/:thought_bubble: Used \d+ previous messages for context/g, '');
      
      // Remove extra whitespace and newlines
      responseText = responseText.trim();
      
      await say({
        text: responseText,
        thread_ts: threadTs
      });
      
      // If this is the first message in a thread (no thread_ts), we need to copy the conversation
      // to the new thread context so future thread messages have the full context
      if (!message.thread_ts) {
        // Get the main conversation history (including all previous messages and responses)
        const mainHistory = getConversationHistory(message.channel, message.user, null, 20);
        
        // Copy ALL main conversation messages to the new thread context
        mainHistory.forEach(msg => {
          addToHistory(message.channel, message.user, msg.role, msg.content, msg.timestamp, threadTs);
        });
        
        console.log(`🔄 Copied ${mainHistory.length} messages from main conversation to new thread ${threadTs}`);
      }
      
      // Add bot response to history with thread context (clean response without metadata)
      if (result.reply) {
        // Clean the response by removing metadata and formatting
        let cleanResponse = result.reply.replace(/:thought_bubble: Used \d+ previous messages for context/g, '').trim();
        addToHistory(message.channel, message.user, 'assistant', cleanResponse, new Date().toISOString(), threadTs);
      }
        
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

// Note: app_mention handler removed - using unified app.message handler instead

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
