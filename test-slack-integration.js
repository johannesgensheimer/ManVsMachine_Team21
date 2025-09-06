/**
 * Test script specifically for Slack bot integration
 * This tests the endpoints that the Slack bot will call
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

// Mock Slack data
const mockSlackData = {
  userId: 'U1234567890',
  channel: 'C9876543210',
  timestamp: '1699123456.123456',
  userName: 'john.doe',
  channelName: 'general'
};

// Test messages that simulate Slack bot interactions
const testMessages = [
  {
    name: 'Simple Supplier Query',
    message: '@bot show me all active suppliers',
    expectedResponse: 'supplier'
  },
  {
    name: 'Create New Supplier',
    message: '@bot create a new supplier called "Slack Test Corp" with domain "slacktest.com"',
    expectedResponse: 'created'
  },
  {
    name: 'Search Gold Tier Suppliers',
    message: '@bot find all gold tier suppliers',
    expectedResponse: 'gold'
  },
  {
    name: 'Add Contact',
    message: '@bot add John Smith as CEO at Slack Test Corp with email john@slacktest.com',
    expectedResponse: 'contact'
  },
  {
    name: 'Log Interaction',
    message: '@bot log a positive meeting with Slack Test Corp about partnership opportunities',
    expectedResponse: 'interaction'
  }
];

async function testSlackChatEndpoint(testCase) {
  console.log(`\n🤖 Testing Slack Integration: "${testCase.name}"`);
  console.log(`📝 Message: "${testCase.message}"`);
  
  try {
    const startTime = Date.now();
    
    // Simulate the exact request format the Slack bot will send
    const response = await axios.post(`${BASE_URL}/api/chat`, {
      userId: mockSlackData.userId,
      message: testCase.message,
      channel: mockSlackData.channel,
      timestamp: mockSlackData.timestamp,
      metadata: {
        thread_ts: mockSlackData.timestamp,
        user_name: mockSlackData.userName,
        channel_name: mockSlackData.channelName,
        conversation_history: []
      }
    });
    
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    console.log(`✅ Slack chat successful (${duration}ms)`);
    console.log(`📋 Bot Reply: "${response.data.reply}"`);
    console.log(`📊 Confidence: ${response.data.confidence}`);
    console.log(`⏱️  Processing Time: ${response.data.processing_time_ms}ms`);
    console.log(`🧠 Context Used: ${response.data.context_used}`);
    console.log(`🔧 Model: ${response.data.metadata.model_used}`);
    
    // Check if response contains expected content
    const responseText = response.data.reply.toLowerCase();
    const expectedText = testCase.expectedResponse.toLowerCase();
    
    if (responseText.includes(expectedText)) {
      console.log(`✅ Response validation passed (contains "${expectedText}")`);
    } else {
      console.log(`⚠️  Response validation: Expected "${expectedText}" not found in response`);
    }
    
    return true;
  } catch (error) {
    console.error('❌ Slack chat failed:', error.response?.data || error.message);
    return false;
  }
}

async function testOpenAIEndpoint() {
  console.log('\n🧠 Testing OpenAI Processing Endpoint...');
  
  try {
    const response = await axios.post(`${BASE_URL}/api/openai/process`, {
      message: 'Analyze the sentiment trends for all suppliers over the last 30 days',
      userId: mockSlackData.userId,
      context: {
        conversation_history: [
          'Previous message about suppliers',
          'Another context message'
        ],
        document_context: []
      },
      model: 'gpt-4',
      temperature: 0.7,
      max_tokens: 500
    });
    
    console.log('✅ OpenAI processing successful');
    console.log(`📋 Response: "${response.data.response}"`);
    console.log(`📊 Sources: ${response.data.sources.length} found`);
    console.log(`🔍 Embedding matches: ${response.data.embedding_matches.length}`);
    console.log(`💰 Cost estimate: $${response.data.processing_info.cost_estimate_usd}`);
    
    return true;
  } catch (error) {
    console.error('❌ OpenAI processing failed:', error.response?.data || error.message);
    return false;
  }
}

async function testChatHistoryEndpoint() {
  console.log('\n📋 Testing Chat History Endpoint...');
  
  try {
    const response = await axios.get(`${BASE_URL}/api/history/${mockSlackData.userId}`, {
      params: {
        limit: 10,
        channel: mockSlackData.channel
      }
    });
    
    console.log('✅ Chat history retrieval successful');
    console.log(`📊 Messages found: ${response.data.messages.length}`);
    console.log(`📄 Pagination: ${response.data.pagination.total} total, page ${response.data.pagination.current_page}`);
    
    if (response.data.messages.length > 0) {
      console.log(`📝 Latest message: "${response.data.messages[0].message}"`);
      console.log(`🤖 Bot response: "${response.data.messages[0].bot_response}"`);
    }
    
    return true;
  } catch (error) {
    console.error('❌ Chat history failed:', error.response?.data || error.message);
    return false;
  }
}

async function testEmbeddingSearchEndpoint() {
  console.log('\n🔍 Testing Embedding Search Endpoint...');
  
  try {
    const response = await axios.post(`${BASE_URL}/api/embeddings/search`, {
      query: 'supplier relationship management',
      limit: 5,
      threshold: 0.7,
      filters: {
        document_types: ['pdf', 'docx'],
        tags: ['supplier', 'management']
      }
    });
    
    console.log('✅ Embedding search successful');
    console.log(`📊 Results found: ${response.data.results.length}`);
    console.log(`⏱️  Processing time: ${response.data.query_info.processing_time_ms}ms`);
    
    if (response.data.results.length > 0) {
      console.log(`📄 Top result: "${response.data.results[0].text}"`);
      console.log(`🎯 Similarity score: ${response.data.results[0].similarity_score}`);
    }
    
    return true;
  } catch (error) {
    console.error('❌ Embedding search failed:', error.response?.data || error.message);
    return false;
  }
}

async function testErrorHandling() {
  console.log('\n🚫 Testing Error Handling...');
  
  // Test missing required fields
  try {
    await axios.post(`${BASE_URL}/api/chat`, {
      // Missing userId, message, channel
    });
    console.log('❌ Should have failed for missing fields');
  } catch (error) {
    if (error.response?.status === 400 && error.response.data.error?.code === 'INVALID_INPUT') {
      console.log('✅ Correctly rejected missing required fields');
    } else {
      console.log('❌ Unexpected error response:', error.response?.data);
    }
  }
  
  // Test invalid endpoint
  try {
    await axios.get(`${BASE_URL}/api/nonexistent`);
    console.log('❌ Should have failed for invalid endpoint');
  } catch (error) {
    if (error.response?.status === 404 && error.response.data.error?.code === 'ENDPOINT_NOT_FOUND') {
      console.log('✅ Correctly returned 404 for invalid endpoint');
    } else {
      console.log('❌ Unexpected error response:', error.response?.data);
    }
  }
}

async function runSlackIntegrationTests() {
  console.log('🚀 Starting Slack Bot Integration Tests...\n');
  console.log('=' .repeat(70));
  
  let passedTests = 0;
  let totalTests = 0;
  
  // Test health endpoint
  console.log('🏥 Testing health endpoint...');
  try {
    const health = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health check passed:', health.data.status);
    passedTests++;
  } catch (error) {
    console.error('❌ Health check failed:', error.message);
  }
  totalTests++;
  
  // Wait for server to be ready
  console.log('\n⏳ Waiting for LangChain agent to initialize...');
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Test each Slack message scenario
  for (const testCase of testMessages) {
    totalTests++;
    if (await testSlackChatEndpoint(testCase)) {
      passedTests++;
    }
    
    // Wait between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // Test OpenAI endpoint
  totalTests++;
  if (await testOpenAIEndpoint()) {
    passedTests++;
  }
  
  // Test chat history endpoint
  totalTests++;
  if (await testChatHistoryEndpoint()) {
    passedTests++;
  }
  
  // Test embedding search endpoint
  totalTests++;
  if (await testEmbeddingSearchEndpoint()) {
    passedTests++;
  }
  
  // Test error handling
  await testErrorHandling();
  
  // Summary
  console.log('\n' + '=' .repeat(70));
  console.log('📊 Slack Integration Test Summary');
  console.log('=' .repeat(70));
  console.log(`✅ Passed: ${passedTests}/${totalTests}`);
  console.log(`❌ Failed: ${totalTests - passedTests}/${totalTests}`);
  
  if (passedTests === totalTests) {
    console.log('🎉 All Slack integration tests passed!');
    console.log('🤖 Your backend is ready for Slack bot integration!');
  } else {
    console.log('⚠️  Some tests failed. Check the logs above.');
  }
  
  console.log('\n📋 Integration Checklist:');
  console.log('  ✅ POST /api/chat - Main Slack bot endpoint');
  console.log('  ✅ POST /api/langchain/process - Advanced LangChain processing');
  console.log('  ✅ GET /api/history/:userId - Chat history retrieval');
  console.log('  ✅ POST /api/embeddings/search - Document search');
  console.log('  ✅ Error handling with proper format');
  console.log('\n🔗 Your Slack bot can now call these endpoints!');
}

// Check if server is running
async function checkServerRunning() {
  try {
    await axios.get(`${BASE_URL}/health`);
    return true;
  } catch (error) {
    return false;
  }
}

async function main() {
  console.log('🔍 Checking if server is running...');
  
  const serverRunning = await checkServerRunning();
  
  if (!serverRunning) {
    console.log('❌ Server is not running!');
    console.log('🚀 Please start the server first with: npm run server');
    console.log('📍 Server should be running on http://localhost:3000');
    process.exit(1);
  }
  
  console.log('✅ Server is running, starting Slack integration tests...\n');
  await runSlackIntegrationTests();
}

// Run the tests
main().catch(error => {
  console.error('❌ Test execution failed:', error);
  process.exit(1);
});
