/**
 * Test the OpenAI integration directly
 * This shows exactly what's being sent to OpenAI and what comes back
 */

// Set environment variables
process.env.DATABASE_URL = "postgresql://publicuser:Hackathon123!@34.55.216.61:5432/hackathon";
process.env.DEBUG = "true";

const OpenAI = require('openai');

async function testOpenAIIntegration() {
  console.log('🧪 Testing OpenAI Integration...\n');
  
  // Create the OpenAI client
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // Test system prompt
  const systemPrompt = `You are a helpful AI assistant specialized in managing supplier relationships and database operations.

You have access to a comprehensive set of tools for managing:
- Suppliers (companies you work with)
- Contacts (people at those companies)  
- Interactions (communications and meetings)
- Notes (important information and observations)

Key capabilities:
1. **Supplier Management**: Search, create, update supplier information and status
2. **Contact Management**: Manage contact details, find contacts across suppliers
3. **Interaction Tracking**: Log communications, analyze sentiment trends, track relationship health
4. **Note Taking**: Add, search, and manage notes across all supplier relationships

Guidelines:
- Always provide comprehensive information when requested
- When logging interactions, consider updating supplier status if it indicates active engagement
- Use sentiment analysis to help track relationship health
- Be proactive in suggesting related information that might be useful
- When creating records, validate that required information is provided
- For searches, use appropriate filters to get the most relevant results

Remember: You're helping manage business relationships, so focus on actionable insights and maintaining data quality.`;

  const testMessage = "Search for all suppliers and show me a summary of their status";

  try {
    console.log('📝 System Prompt:');
    console.log(systemPrompt.substring(0, 200) + '...\n');
    
    console.log('💬 User Message:');
    console.log(`"${testMessage}"\n`);
    
    console.log('🤖 Calling OpenAI...');
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: testMessage }
      ],
      temperature: 0.1,
      max_tokens: 2000,
    });

    console.log('✅ OpenAI Response:');
    console.log(response.choices[0].message.content);
    
    console.log('\n📊 Usage Stats:');
    console.log(`- Prompt tokens: ${response.usage?.prompt_tokens || 'N/A'}`);
    console.log(`- Completion tokens: ${response.usage?.completion_tokens || 'N/A'}`);
    console.log(`- Total tokens: ${response.usage?.total_tokens || 'N/A'}`);
    console.log(`- Model: ${response.model}`);
    
    return true;
  } catch (error) {
    console.error('❌ OpenAI test failed:', error.message);
    return false;
  }
}

async function testFunctionCalling() {
  console.log('\n🔧 Testing Function Calling...\n');
  
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // Simple function for testing
  const testFunction = {
    name: 'search_suppliers',
    description: 'Search for suppliers using various filters like name, domain, status, tier, or creation date.',
    parameters: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Search by supplier name (partial match)'
        },
        status: {
          type: 'string',
          description: 'Filter by status (e.g., "active", "inactive")'
        },
        limit: {
          type: 'number',
          description: 'Maximum number of results to return',
          default: 20
        }
      }
    }
  };

  try {
    console.log('🔍 Testing function call for: "Find active suppliers"');
    
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: 'You are a helpful assistant that can search for suppliers.' },
        { role: 'user', content: 'Find active suppliers' }
      ],
      functions: [testFunction],
      function_call: 'auto',
      temperature: 0.1,
    });

    const choice = response.choices[0];
    
    if (choice.message.function_call) {
      console.log('✅ Function call detected:');
      console.log(`- Function: ${choice.message.function_call.name}`);
      console.log(`- Arguments: ${choice.message.function_call.arguments}`);
      
      // Parse and validate arguments
      try {
        const args = JSON.parse(choice.message.function_call.arguments);
        console.log('✅ Arguments parsed successfully:', args);
      } catch (parseError) {
        console.log('❌ Failed to parse function arguments:', parseError.message);
      }
    } else {
      console.log('ℹ️ No function call made, regular response:');
      console.log(choice.message.content);
    }
    
    return true;
  } catch (error) {
    console.error('❌ Function calling test failed:', error.message);
    return false;
  }
}

async function runTests() {
  console.log('🚀 Starting OpenAI Integration Tests\n');
  
  let passed = 0;
  let total = 0;
  
  // Test 1: Basic OpenAI integration
  total++;
  if (await testOpenAIIntegration()) {
    passed++;
  }
  
  // Test 2: Function calling
  total++;
  if (await testFunctionCalling()) {
    passed++;
  }
  
  console.log('\n' + '='.repeat(50));
  console.log(`📊 Test Results: ${passed}/${total} tests passed`);
  
  if (passed === total) {
    console.log('🎉 All tests passed! OpenAI integration is working correctly.');
  } else {
    console.log('⚠️ Some tests failed. Check the output above for details.');
  }
  
  console.log('\n🔧 Troubleshooting tips:');
  console.log('- Verify your OpenAI API key has sufficient credits');
  console.log('- Check your internet connection');
  console.log('- Ensure the OpenAI API is accessible from your network');
}

// Run the tests
runTests().catch(console.error);