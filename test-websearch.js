#!/usr/bin/env node

/**
 * End-to-end test for OpenAI native web search integration
 * Tests the new Responses API with web_search tool
 */

const axios = require('axios');

const SERVER_URL = 'http://localhost:3000';

// Test configurations
const TEST_CASES = [
  {
    name: 'General Web Search',
    endpoint: '/api/websearch',
    data: {
      query: 'What are the latest developments in AI technology in January 2025?',
      model: 'gpt-4o',
      searchContextSize: 'medium'
    }
  },
  {
    name: 'Supplier Information Search',
    endpoint: '/api/websearch/supplier',
    data: {
      companyName: 'Microsoft',
      domain: 'microsoft.com'
    }
  },
  {
    name: 'Industry Trends Search',
    endpoint: '/api/websearch/industry',
    data: {
      industry: 'artificial intelligence',
      region: 'United States'
    }
  },
  {
    name: 'Compliance Search (Filtered)',
    endpoint: '/api/websearch/compliance',
    data: {
      industry: 'financial services',
      region: 'US'
    }
  },
  {
    name: 'Domain Filtered Search',
    endpoint: '/api/websearch',
    data: {
      query: 'Latest SEC regulatory changes',
      allowedDomains: ['sec.gov', 'finra.org'],
      model: 'gpt-4o',
      searchContextSize: 'high'
    }
  },
  {
    name: 'Location-based Search',
    endpoint: '/api/websearch',
    data: {
      query: 'Best restaurants near Times Square',
      model: 'gpt-4o',
      userLocation: {
        type: 'approximate',
        country: 'US',
        city: 'New York',
        region: 'NY'
      }
    }
  }
];

async function testWebSearch() {
  console.log('🔍 Starting OpenAI Native Web Search Integration Tests\n');
  console.log('=' .repeat(60));
  
  let passedTests = 0;
  let totalTests = TEST_CASES.length;

  for (const testCase of TEST_CASES) {
    try {
      console.log(`\n📋 Test: ${testCase.name}`);
      console.log(`🎯 Endpoint: ${testCase.endpoint}`);
      console.log(`📊 Data:`, JSON.stringify(testCase.data, null, 2));
      console.log('⏳ Making request...');
      
      const startTime = Date.now();
      
      const response = await axios.post(`${SERVER_URL}${testCase.endpoint}`, testCase.data, {
        timeout: 60000, // 60 second timeout for web searches
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const endTime = Date.now();
      const processingTime = endTime - startTime;
      
      // Check if the response indicates success
      const success = response.data.success !== false && !response.data.error;
      
      if (success) {
        console.log('✅ SUCCESS');
        console.log(`⏱️  Processing time: ${processingTime}ms`);
        console.log(`📝 Response length: ${response.data.response?.length || 0} characters`);
        console.log(`📎 Citations: ${response.data.citations?.length || 0}`);
        console.log(`🔗 Sources: ${response.data.sources?.length || 0}`);
        console.log(`🔍 Search calls: ${response.data.search_calls?.length || 0}`);
        
        // Show first 200 chars of response
        if (response.data.response) {
          const preview = response.data.response.substring(0, 200) + (response.data.response.length > 200 ? '...' : '');
          console.log(`📄 Response preview: "${preview}"`);
        }
        
        // Show citations if available
        if (response.data.citations && response.data.citations.length > 0) {
          console.log('📎 Citations:');
          response.data.citations.forEach((citation, index) => {
            console.log(`   ${index + 1}. ${citation.title || citation.url}`);
          });
        }
        
        // Show sources if available
        if (response.data.sources && response.data.sources.length > 0) {
          console.log('🔗 Sources:');
          response.data.sources.forEach((source, index) => {
            console.log(`   ${index + 1}. ${source.domain || source.url}`);
          });
        }
        
        passedTests++;
      } else {
        console.log('❌ FAILED');
        console.log('📄 Response:', JSON.stringify(response.data, null, 2));
      }
      
    } catch (error) {
      console.log('❌ ERROR');
      
      if (error.response) {
        // Server responded with error status
        console.log(`🚨 Status: ${error.response.status}`);
        console.log(`📄 Error response:`, JSON.stringify(error.response.data, null, 2));
        
        // Check if it's a Responses API availability issue
        if (error.response.data.error && typeof error.response.data.error === 'string' && 
            error.response.data.error.includes('responses')) {
          console.log('⚠️  Note: This may be due to Responses API not being available in your region/account');
        }
      } else if (error.request) {
        // Request made but no response received
        console.log('🚨 No response received (server may not be running)');
        console.log('💡 Make sure to run: npm run server');
      } else {
        // Something else happened
        console.log('🚨 Request error:', error.message);
      }
    }
    
    console.log('-'.repeat(50));
  }
  
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🎯 Test Results: ${passedTests}/${totalTests} tests passed`);
  
  if (passedTests === totalTests) {
    console.log('✅ All tests passed! OpenAI native web search integration is working.');
  } else if (passedTests > 0) {
    console.log('⚠️  Some tests passed. Check configuration and API access.');
  } else {
    console.log('❌ No tests passed. Check server status and OpenAI configuration.');
  }
  
  console.log('\n💡 If you see "responses API" errors, this may mean:');
  console.log('   • The Responses API is not available in your region yet');
  console.log('   • Your OpenAI account tier may not have access');
  console.log('   • The feature is still rolling out');
  console.log('   • Fallback to Chat Completions API may be needed');
  
  return passedTests === totalTests;
}

async function checkServerHealth() {
  try {
    console.log('🔍 Checking server health...');
    const response = await axios.get(`${SERVER_URL}/health`, { timeout: 5000 });
    console.log('✅ Server is running');
    return true;
  } catch (error) {
    console.log('❌ Server health check failed');
    if (error.code === 'ECONNREFUSED') {
      console.log('💡 Server is not running. Start it with: npm run server');
    } else {
      console.log('🚨 Error:', error.message);
    }
    return false;
  }
}

async function main() {
  console.log('🚀 OpenAI Native Web Search Integration Test Suite');
  console.log(`📅 ${new Date().toISOString()}`);
  console.log(`🔗 Testing server at: ${SERVER_URL}`);
  console.log('');
  
  // Check if server is running
  const serverOk = await checkServerHealth();
  if (!serverOk) {
    console.log('\n❌ Cannot proceed without server. Exiting.');
    process.exit(1);
  }
  
  // Run the web search tests
  const allTestsPassed = await testWebSearch();
  
  console.log('\n🎯 Test complete.');
  process.exit(allTestsPassed ? 0 : 1);
}

if (require.main === module) {
  main().catch(error => {
    console.error('❌ Test suite failed:', error);
    process.exit(1);
  });
}

module.exports = { testWebSearch, checkServerHealth };