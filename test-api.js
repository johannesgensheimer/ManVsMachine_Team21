/**
 * Test script for the REST API endpoints
 * This script tests the LangChain LLM endpoint functionality
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

// Test queries to send to the API
const testQueries = [
  {
    name: 'Simple Query',
    text: 'Search for all suppliers and show me a summary'
  },
  {
    name: 'Supplier Creation',
    text: 'Create a new supplier called "Test Corp" with domain "testcorp.com"'
  },
  {
    name: 'Supplier Search',
    text: 'Find all suppliers with status "active"'
  },
  {
    name: 'Contact Management',
    text: 'Show me all contacts across all suppliers'
  },
  {
    name: 'Interaction Analysis',
    text: 'Show me recent interactions from the last 30 days'
  }
];

async function testHealthEndpoint() {
  console.log('🏥 Testing health endpoint...');
  try {
    const response = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health check passed:', response.data);
    return true;
  } catch (error) {
    console.error('❌ Health check failed:', error.message);
    return false;
  }
}

async function testQueryEndpoint(query) {
  console.log(`\n🤖 Testing query: "${query.name}"`);
  console.log(`📝 Text: "${query.text}"`);
  
  try {
    const startTime = Date.now();
    
    const response = await axios.post(`${BASE_URL}/api/query`, {
      text: query.text,
      chatHistory: []
    });
    
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    console.log(`✅ Query successful (${duration}ms)`);
    console.log('📋 Response:', response.data.response);
    
    if (response.data.error) {
      console.log('⚠️  Warning:', response.data.error);
    }
    
    return true;
  } catch (error) {
    console.error('❌ Query failed:', error.response?.data || error.message);
    return false;
  }
}

async function testToolsEndpoint() {
  console.log('\n🛠️  Testing tools endpoint...');
  try {
    const response = await axios.get(`${BASE_URL}/api/tools`);
    console.log('✅ Tools endpoint successful');
    console.log(`📊 Available tools (${response.data.count}):`);
    response.data.tools.forEach(tool => {
      console.log(`  - ${tool.name}: ${tool.description}`);
    });
    return true;
  } catch (error) {
    console.error('❌ Tools endpoint failed:', error.response?.data || error.message);
    return false;
  }
}

async function testInvalidRequests() {
  console.log('\n🚫 Testing invalid requests...');
  
  // Test missing text field
  try {
    await axios.post(`${BASE_URL}/api/query`, {});
    console.log('❌ Should have failed for missing text');
  } catch (error) {
    if (error.response?.status === 400) {
      console.log('✅ Correctly rejected missing text field');
    } else {
      console.log('❌ Unexpected error:', error.message);
    }
  }
  
  // Test invalid endpoint
  try {
    await axios.get(`${BASE_URL}/api/nonexistent`);
    console.log('❌ Should have failed for invalid endpoint');
  } catch (error) {
    if (error.response?.status === 404) {
      console.log('✅ Correctly returned 404 for invalid endpoint');
    } else {
      console.log('❌ Unexpected error:', error.message);
    }
  }
}

async function runAllTests() {
  console.log('🚀 Starting API Tests...\n');
  console.log('=' .repeat(60));
  
  let passedTests = 0;
  let totalTests = 0;
  
  // Test health endpoint
  totalTests++;
  if (await testHealthEndpoint()) {
    passedTests++;
  }
  
  // Wait a moment for server to be fully ready
  console.log('\n⏳ Waiting for server to be fully ready...');
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Test tools endpoint
  totalTests++;
  if (await testToolsEndpoint()) {
    passedTests++;
  }
  
  // Test each query
  for (const query of testQueries) {
    totalTests++;
    if (await testQueryEndpoint(query)) {
      passedTests++;
    }
    
    // Wait between requests to avoid overwhelming the API
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // Test invalid requests
  await testInvalidRequests();
  
  // Summary
  console.log('\n' + '=' .repeat(60));
  console.log('📊 Test Summary');
  console.log('=' .repeat(60));
  console.log(`✅ Passed: ${passedTests}/${totalTests}`);
  console.log(`❌ Failed: ${totalTests - passedTests}/${totalTests}`);
  
  if (passedTests === totalTests) {
    console.log('🎉 All tests passed!');
  } else {
    console.log('⚠️  Some tests failed. Check the logs above.');
  }
}

// Check if server is running before starting tests
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
  
  console.log('✅ Server is running, starting tests...\n');
  await runAllTests();
}

// Run the tests
main().catch(error => {
  console.error('❌ Test execution failed:', error);
  process.exit(1);
});
