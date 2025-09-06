import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { SupplierManagementApp } from './index';

// Load environment variables
dotenv.config();

// Helper function to convert mailto links to Slack Block Kit buttons
function formatSlackResponse(text: string) {
  // Check if the response contains a mailto link
  const mailtoMatch = text.match(/\*\*\[([^\]]+)\]\((mailto:[^)]+)\)\*\*/);
  
  if (mailtoMatch) {
    const buttonText = mailtoMatch[1];
    const mailtoUrl = mailtoMatch[2];
    
    // Extract email info from the response
    const subjectMatch = text.match(/Subject:\s*([^\n]+)/);
    const recipientMatch = text.match(/Email draft ready for ([^!]+)!/);
    
    const subject = subjectMatch ? subjectMatch[1] : 'Email Draft';
    const recipient = recipientMatch ? recipientMatch[1] : 'Contact';
    
    // Create fallback text for accessibility
    const fallbackText = `📧 Email draft ready for ${recipient}! Subject: ${subject}. Click the button to open in your email client.`;
    
    // Create Block Kit format with required text fallback
    return {
      text: fallbackText, // Required fallback text
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `📧 *Email draft ready for ${recipient}!*\n*Subject:* ${subject}`
          }
        },
        {
          type: 'actions',
          elements: [
            {
              type: 'button',
              text: {
                type: 'plain_text',
                text: '📧 Review Email and Send',
                emoji: true
              },
              style: 'primary',
              url: mailtoUrl
            }
          ]
        },
        {
          type: 'context',
          elements: [
            {
              type: 'mrkdwn',
              text: '💡 Click the button above to open your email client with the pre-filled draft'
            }
          ]
        }
      ]
    };
  }
  
  // Return original text if no mailto link found
  return { text };
}

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize the supplier management app
let supplierApp: SupplierManagementApp;

// Initialize the LangChain app on server startup
async function initializeApp() {
  try {
    console.log('🚀 Initializing Supplier Management App...');
    supplierApp = new SupplierManagementApp();
    const initialized = await supplierApp.initialize();
    
    if (!initialized) {
      throw new Error('Failed to initialize SupplierManagementApp');
    }
    
    console.log('✅ Supplier Management App initialized successfully');
    return true;
  } catch (error) {
    console.error('❌ Failed to initialize app:', error);
    return false;
  }
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'Supplier Management API'
  });
});

// Main chat endpoint for Slack bot integration
app.post('/api/chat', async (req, res) => {
  try {
    const { userId, message, channel, timestamp, metadata } = req.body;
    console.log(`hey mahesh recieved history`, metadata);
    
    // Validate input
    if (!userId || !message || !channel) {
      return res.status(400).json({
        error: {
          code: 'INVALID_INPUT',
          message: 'Missing required fields: userId, message, and channel are required',
          details: 'Request body must contain userId, message, and channel fields',
          timestamp: new Date().toISOString(),
          request_id: `req_${Date.now()}`
        }
      });
    }

    // Check if app is initialized
    if (!supplierApp) {
      return res.status(503).json({
        error: {
          code: 'SERVICE_UNAVAILABLE',
          message: 'OpenAI agent is not initialized',
          details: 'The supplier management system is still starting up',
          timestamp: new Date().toISOString(),
          request_id: `req_${Date.now()}`
        }
      });
    }

    console.log(`📝 Processing Slack message from user ${userId}: "${message}"`);
    
    const startTime = Date.now();
    
    // Extract conversation history if provided in metadata
    const conversationHistory = metadata?.conversation_history || [];
    
    // Convert conversation history from objects to strings for the agent
    const chatHistory = conversationHistory.map((msg: any) => {
      const role = msg.role === 'user' ? '👤 User' : '🤖 Assistant';
      return `${role}: ${msg.content}`;
    });
    
    console.log(`📚 Converted conversation history for agent:`, chatHistory);
    
    // Call the OpenAI agent
    const result = await supplierApp.query(message, chatHistory);
    
    const processingTime = Date.now() - startTime;
    
    // Format response for Slack (convert mailto links to buttons)
    const slackResponse = formatSlackResponse(result.output);
    
    // Return the response in Slack bot expected format
    res.json({
      ...slackResponse,
      confidence: result.error ? 0.1 : 0.95,
      processing_time_ms: processingTime,
      context_used: chatHistory.length > 0,
      metadata: {
        model_used: 'gpt-4-turbo-preview',
        tokens_used: Math.ceil(message.length / 4), // Rough estimate
        embedding_matches: result.intermediateSteps?.length || 0,
        user_id: userId,
        channel_id: channel,
        timestamp: timestamp
      }
    });

  } catch (error) {
    console.error('❌ Chat processing error:', error);
    
    res.status(500).json({
      error: {
        code: 'CHAT_PROCESSING_ERROR',
        message: 'Failed to process chat message',
        details: error instanceof Error ? error.message : 'Unknown error occurred',
        timestamp: new Date().toISOString(),
        request_id: `req_${Date.now()}`
      }
    });
  }
});

// OpenAI processing endpoint
app.post('/api/openai/process', async (req, res) => {
  try {
    const { message, userId, context, model, temperature, max_tokens } = req.body;
    
    // Validate input
    if (!message || !userId) {
      return res.status(400).json({
        error: {
          code: 'INVALID_INPUT',
          message: 'Missing required fields: message and userId are required',
          details: 'Request body must contain message and userId fields',
          timestamp: new Date().toISOString(),
          request_id: `req_${Date.now()}`
        }
      });
    }

    // Check if app is initialized
    if (!supplierApp) {
      return res.status(503).json({
        error: {
          code: 'SERVICE_UNAVAILABLE',
          message: 'OpenAI agent is not initialized',
          details: 'The supplier management system is still starting up',
          timestamp: new Date().toISOString(),
          request_id: `req_${Date.now()}`
        }
      });
    }

    console.log(`🤖 Processing OpenAI request from user ${userId}: "${message}"`);
    
    const startTime = Date.now();
    
    // Extract conversation history from context
    const chatHistory = context?.conversation_history || [];
    
    // Call the OpenAI agent
    const result = await supplierApp.query(message, chatHistory);
    
    const processingTime = Date.now() - startTime;
    const tokensUsed = Math.ceil(message.length / 4); // Rough estimate
    
    // Return detailed OpenAI response
    res.json({
      response: result.output,
      sources: [
        {
          document_id: 'supplier_db',
          document_name: 'Supplier Management Database',
          page: 1,
          confidence: result.error ? 0.1 : 0.89
        }
      ],
      embedding_matches: result.intermediateSteps?.map((step, index) => ({
        text: `Tool: ${step.action?.tool || 'unknown'}`,
        similarity_score: 0.85 + (index * 0.02),
        metadata: { 
          step_index: index,
          action: step.action?.tool 
        }
      })) || [],
      processing_info: {
        model_used: model || 'gpt-4-turbo-preview',
        tokens_consumed: tokensUsed,
        processing_time_ms: processingTime,
        cost_estimate_usd: (tokensUsed / 1000) * 0.03 // Rough GPT-4 estimate
      }
    });

  } catch (error) {
    console.error('❌ OpenAI processing error:', error);
    
    res.status(500).json({
      error: {
        code: 'OPENAI_PROCESSING_ERROR',
        message: 'Failed to process message with OpenAI',
        details: error instanceof Error ? error.message : 'Unknown error occurred',
        timestamp: new Date().toISOString(),
        request_id: `req_${Date.now()}`
      }
    });
  }
});

// Legacy query endpoint (keeping for backward compatibility)
app.post('/api/query', async (req, res) => {
  try {
    const { text, chatHistory } = req.body;
    
    // Validate input
    if (!text || typeof text !== 'string') {
      return res.status(400).json({
        error: {
          code: 'INVALID_INPUT',
          message: 'Request body must contain a "text" field with a string value',
          details: 'The text field is required and must be a string',
          timestamp: new Date().toISOString(),
          request_id: `req_${Date.now()}`
        }
      });
    }

    // Check if app is initialized
    if (!supplierApp) {
      return res.status(503).json({
        error: {
          code: 'SERVICE_UNAVAILABLE',
          message: 'OpenAI agent is not initialized',
          details: 'The supplier management system is still starting up',
          timestamp: new Date().toISOString(),
          request_id: `req_${Date.now()}`
        }
      });
    }

    console.log(`📝 Processing legacy query: "${text}"`);
    
    // Call the OpenAI agent
    const result = await supplierApp.query(text, chatHistory || []);
    
    // Return the response
    res.json({
      success: true,
      query: text,
      response: result.output,
      timestamp: new Date().toISOString(),
      ...(result.error && { error: result.error }),
      ...(result.intermediateSteps && { 
        debug: { 
          intermediateSteps: result.intermediateSteps 
        }
      })
    });

  } catch (error) {
    console.error('❌ Query processing error:', error);
    
    res.status(500).json({
      error: {
        code: 'QUERY_PROCESSING_ERROR',
        message: 'Failed to process query',
        details: error instanceof Error ? error.message : 'Unknown error occurred',
        timestamp: new Date().toISOString(),
        request_id: `req_${Date.now()}`
      }
    });
  }
});

// Supplier-specific endpoints for direct access
app.get('/api/suppliers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const supplierId = parseInt(id);
    
    if (isNaN(supplierId)) {
      return res.status(400).json({
        error: {
          code: 'INVALID_SUPPLIER_ID',
          message: 'Supplier ID must be a number',
          details: `Received: ${id}`,
          timestamp: new Date().toISOString(),
          request_id: `req_${Date.now()}`
        }
      });
    }

    const result = await supplierApp.getSupplierOverview(supplierId);
    
    res.json({
      success: true,
      supplierId,
      data: result.output,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Supplier query error:', error);
    res.status(500).json({
      error: {
        code: 'SUPPLIER_QUERY_ERROR',
        message: 'Failed to retrieve supplier information',
        details: error instanceof Error ? error.message : 'Unknown error occurred',
        timestamp: new Date().toISOString(),
        request_id: `req_${Date.now()}`
      }
    });
  }
});

// Log interaction endpoint
app.post('/api/interactions', async (req, res) => {
  try {
    const { supplierId, summary, channel, sentiment, contactId } = req.body;
    
    // Validate required fields
    if (!supplierId || !summary || !channel || !sentiment) {
      return res.status(400).json({
        error: {
          code: 'MISSING_REQUIRED_FIELDS',
          message: 'Missing required fields for interaction logging',
          details: 'supplierId, summary, channel, and sentiment are required',
          timestamp: new Date().toISOString(),
          request_id: `req_${Date.now()}`
        }
      });
    }

    const result = await supplierApp.logInteraction(
      supplierId, 
      summary, 
      channel, 
      sentiment, 
      contactId
    );
    
    res.json({
      success: true,
      interaction: {
        supplierId,
        summary,
        channel,
        sentiment,
        contactId
      },
      result: result.output,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Interaction logging error:', error);
    res.status(500).json({
      error: {
        code: 'INTERACTION_LOGGING_ERROR',
        message: 'Failed to log interaction',
        details: error instanceof Error ? error.message : 'Unknown error occurred',
        timestamp: new Date().toISOString(),
        request_id: `req_${Date.now()}`
      }
    });
  }
});

// Chat history endpoint
app.get('/api/history/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit = '50', channel, from_date, to_date } = req.query;
    
    // For now, return mock data since we don't have persistent chat storage
    // In a real implementation, this would query your database
    console.log(`📋 Retrieving chat history for user ${userId}`);
    
    // Mock response matching the specification
    const mockMessages = [
      {
        id: 1,
        user_id: userId,
        channel_id: channel || 'C9876543210',
        message: 'Help me find all active suppliers',
        bot_response: 'I found 15 active suppliers in the database. Would you like me to show you the details?',
        timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        thread_ts: '1699123456.123456'
      },
      {
        id: 2,
        user_id: userId,
        channel_id: channel || 'C9876543210',
        message: 'Show me suppliers with gold tier status',
        bot_response: 'Here are the gold tier suppliers: TechCorp, InnovateInc, and GlobalSolutions.',
        timestamp: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
        thread_ts: '1699123456.123457'
      }
    ];
    
    const limitNum = parseInt(limit as string) || 50;
    const messages = mockMessages.slice(0, limitNum);
    
    res.json({
      messages,
      pagination: {
        total: mockMessages.length,
        current_page: 1,
        per_page: limitNum,
        has_more: mockMessages.length > limitNum
      }
    });

  } catch (error) {
    console.error('❌ History query error:', error);
    res.status(500).json({
      error: {
        code: 'HISTORY_QUERY_ERROR',
        message: 'Failed to retrieve chat history',
        details: error instanceof Error ? error.message : 'Unknown error occurred',
        timestamp: new Date().toISOString(),
        request_id: `req_${Date.now()}`
      }
    });
  }
});

// Document upload/indexing endpoint (placeholder)
app.post('/api/documents', async (req, res) => {
  try {
    // For now, return a placeholder response
    // In a real implementation, this would handle file uploads and create embeddings
    console.log('📄 Document upload requested');
    
    res.json({
      document_id: `doc_${Date.now()}`,
      status: 'processing',
      message: 'Document uploaded successfully. Processing embeddings...',
      processing_info: {
        estimated_time_minutes: 5,
        chunk_count: 42,
        file_size_mb: 2.3
      }
    });

  } catch (error) {
    console.error('❌ Document upload error:', error);
    res.status(500).json({
      error: {
        code: 'DOCUMENT_UPLOAD_ERROR',
        message: 'Failed to upload document',
        details: error instanceof Error ? error.message : 'Unknown error occurred',
        timestamp: new Date().toISOString(),
        request_id: `req_${Date.now()}`
      }
    });
  }
});

// Embedding search endpoint (placeholder)
app.post('/api/embeddings/search', async (req, res) => {
  try {
    const { query, limit = 5, threshold = 0.7, filters } = req.body;
    
    if (!query) {
      return res.status(400).json({
        error: {
          code: 'INVALID_INPUT',
          message: 'Query parameter is required',
          details: 'Request body must contain a query field',
          timestamp: new Date().toISOString(),
          request_id: `req_${Date.now()}`
        }
      });
    }

    console.log(`🔍 Embedding search for: "${query}"`);
    
    // Mock embedding search results
    const mockResults = [
      {
        chunk_id: `chunk_${Date.now()}`,
        document_id: 'supplier_db',
        document_name: 'Supplier Management Database',
        text: `Information about ${query} from the supplier database...`,
        similarity_score: 0.92,
        metadata: {
          page: 1,
          section: 'supplier_data',
          chunk_index: 1
        }
      }
    ];
    
    res.json({
      results: mockResults.slice(0, limit),
      query_info: {
        processing_time_ms: 145,
        total_matches: mockResults.length,
        returned_count: Math.min(mockResults.length, limit)
      }
    });

  } catch (error) {
    console.error('❌ Embedding search error:', error);
    res.status(500).json({
      error: {
        code: 'EMBEDDING_SEARCH_ERROR',
        message: 'Failed to search embeddings',
        details: error instanceof Error ? error.message : 'Unknown error occurred',
        timestamp: new Date().toISOString(),
        request_id: `req_${Date.now()}`
      }
    });
  }
});

// Get available tools endpoint
app.get('/api/tools', (req, res) => {
  try {
    if (!supplierApp) {
      return res.status(503).json({
        error: {
          code: 'SERVICE_UNAVAILABLE',
          message: 'OpenAI agent is not initialized',
          details: 'The supplier management system is still starting up',
          timestamp: new Date().toISOString(),
          request_id: `req_${Date.now()}`
        }
      });
    }

    const tools = supplierApp.getAvailableTools();
    
    res.json({
      success: true,
      tools,
      count: tools.length,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Tools query error:', error);
    res.status(500).json({
      error: {
        code: 'TOOLS_QUERY_ERROR',
        message: 'Failed to retrieve available tools',
        details: error instanceof Error ? error.message : 'Unknown error occurred',
        timestamp: new Date().toISOString(),
        request_id: `req_${Date.now()}`
      }
    });
  }
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('❌ Unhandled error:', err);
  res.status(500).json({
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected error occurred',
      details: err.message,
      timestamp: new Date().toISOString(),
      request_id: `req_${Date.now()}`
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: {
      code: 'ENDPOINT_NOT_FOUND',
      message: `Endpoint ${req.method} ${req.path} not found`,
      details: 'The requested endpoint does not exist',
      timestamp: new Date().toISOString(),
      request_id: `req_${Date.now()}`
    }
  });
});

// Start server
async function startServer() {
  // Initialize the app first
  const initialized = await initializeApp();
  
  if (!initialized) {
    console.error('❌ Cannot start server - app initialization failed');
    process.exit(1);
  }

  // Start the Express server
  app.listen(port, () => {
    console.log(`🌐 Server running on port ${port}`);
    console.log(`📋 Available endpoints:`);
    console.log(`\n🤖 Slack Bot Integration:`);
    console.log(`  - POST /api/chat - Main Slack bot endpoint`);
    console.log(`  - POST /api/openai/process - Advanced OpenAI processing`);
    console.log(`  - GET  /api/history/:userId - Chat history retrieval`);
    console.log(`  - POST /api/embeddings/search - Document search`);
    console.log(`\n🔧 Direct Access:`);
    console.log(`  - POST /api/query - Legacy LLM endpoint`);
    console.log(`  - GET  /api/suppliers/:id - Get supplier info`);
    console.log(`  - POST /api/interactions - Log interactions`);
    console.log(`  - POST /api/documents - Document upload (placeholder)`);
    console.log(`  - GET  /api/tools - List available tools`);
    console.log(`  - GET  /health - Health check`);
    console.log(`\n🎯 Ready for Slack bot integration!`);
    console.log(`📝 Test with: node test-slack-integration.js`);
  });
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('🛑 Received SIGTERM, shutting down gracefully...');
  if (supplierApp) {
    await supplierApp.cleanup();
  }
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('🛑 Received SIGINT, shutting down gracefully...');
  if (supplierApp) {
    await supplierApp.cleanup();
  }
  process.exit(0);
});

// Start the server
if (require.main === module) {
  startServer().catch(console.error);
}

export { app, startServer };
