#!/usr/bin/env node

/**
 * Direct test of OpenAI Responses API to check availability
 */

const OpenAI = require('openai');
require('dotenv').config();

async function testResponsesAPI() {
  console.log('🧪 Testing OpenAI Responses API directly');
  console.log('=' .repeat(50));
  
  if (!process.env.OPENAI_API_KEY) {
    console.log('❌ OPENAI_API_KEY not found in environment');
    return false;
  }
  
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  
  try {
    console.log('🔍 Testing basic Responses API availability...');
    
    // Test basic responses API without web search
    const basicResponse = await client.responses.create({
      model: 'gpt-4o',
      input: 'Hello, can you help me test the Responses API?'
    });
    
    console.log('✅ Basic Responses API works!');
    console.log('📄 Response length:', basicResponse.output_text?.length || 0);
    
    // Now test with web search
    try {
      console.log('\n🌐 Testing Responses API with web search tool...');
      
      const webSearchResponse = await client.responses.create({
        model: 'gpt-4o',
        tools: [{ type: 'web_search' }],
        input: 'What is the current time in New York?'
      });
      
      console.log('✅ Web search via Responses API works!');
      console.log('📄 Response length:', webSearchResponse.output_text?.length || 0);
      console.log('🔍 Output items:', webSearchResponse.output?.length || 0);
      
      return true;
      
    } catch (webSearchError) {
      console.log('❌ Web search via Responses API failed');
      console.log('📄 Error:', webSearchError.message);
      
      if (webSearchError.message.includes('web_search')) {
        console.log('💡 Web search tool is not available in your account/region yet');
      }
      
      return false;
    }
    
  } catch (error) {
    console.log('❌ Responses API test failed');
    console.log('📄 Error:', error.message);
    
    if (error.message.includes('responses')) {
      console.log('💡 Responses API is not available in your account/region yet');
      console.log('💡 This is expected as it\'s a very new feature rolling out gradually');
    }
    
    return false;
  }
}

async function testChatCompletionsAPI() {
  console.log('\n🤖 Testing fallback Chat Completions API...');
  console.log('=' .repeat(50));
  
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  
  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'Hello! Can you tell me about the weather in a general sense?' }
      ],
      max_tokens: 100
    });
    
    console.log('✅ Chat Completions API works!');
    console.log('📄 Response:', response.choices[0]?.message?.content?.substring(0, 200) + '...');
    return true;
    
  } catch (error) {
    console.log('❌ Chat Completions API failed');
    console.log('📄 Error:', error.message);
    return false;
  }
}

async function main() {
  console.log('🚀 OpenAI API Availability Test');
  console.log(`📅 ${new Date().toISOString()}\n`);
  
  const responsesApiWorks = await testResponsesAPI();
  const chatApiWorks = await testChatCompletionsAPI();
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 RESULTS:');
  console.log(`✅ Responses API: ${responsesApiWorks ? 'Available' : 'Not Available'}`);
  console.log(`✅ Chat Completions API: ${chatApiWorks ? 'Available' : 'Not Available'}`);
  
  if (responsesApiWorks) {
    console.log('\n🎉 Great! Your account has access to the new Responses API with web search');
    console.log('💡 The integration should work with real-time web search results');
  } else if (chatApiWorks) {
    console.log('\n⚠️  Responses API not available yet, but Chat Completions works');
    console.log('💡 The integration will work with training data for now');
    console.log('💡 Web search will be enabled once Responses API rolls out to your account');
  } else {
    console.log('\n❌ OpenAI API is not working properly');
    console.log('💡 Check your API key and account status');
  }
  
  return responsesApiWorks || chatApiWorks;
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { testResponsesAPI, testChatCompletionsAPI };