#!/usr/bin/env node

const OpenAI = require('openai');
require('dotenv').config();

async function debugWebSearch() {
  console.log('🔍 Debugging web search response structure');
  
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  
  try {
    const response = await client.responses.create({
      model: 'gpt-4o',
      tools: [{ type: 'web_search' }],
      input: 'What is the current weather in London, UK?',
      include: ['web_search_call.action.sources'] // Include sources in response
    });
    
    console.log('📄 Full response structure:');
    console.log(JSON.stringify(response, null, 2));
    
    console.log('\n📊 Summary:');
    console.log(`Output text: "${response.output_text}"`);
    console.log(`Output items: ${response.output ? response.output.length : 0}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Details:', error);
  }
}

debugWebSearch();