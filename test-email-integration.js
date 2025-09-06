const axios = require('axios');

// Test configuration
const BACKEND_URL = 'http://localhost:3000';
const TEST_USER_ID = 'U1234567890';
const TEST_CHANNEL = 'C9876543210';

// Test cases for email integration
const testCases = [
  {
    name: 'Ask supplier about product availability',
    message: 'Ask TechCorp if they have widgets available for our project',
    description: 'Should search for TechCorp supplier, find contact, and draft inquiry email'
  },
  {
    name: 'Follow up with specific contact',
    message: 'Draft a follow-up email to John Smith about our partnership discussion',
    description: 'Should search for John Smith contact and draft follow-up email'
  },
  {
    name: 'Request meeting with supplier',
    message: 'Schedule a meeting with GlobalSupplier to discuss Q1 requirements',
    description: 'Should find GlobalSupplier contact and draft meeting request'
  },
  {
    name: 'General inquiry to contact email',
    message: 'Send an introduction email to jane.doe@innovateinc.com',
    description: 'Should draft introduction email to specific email address'
  },
  {
    name: 'Product availability inquiry with context',
    message: 'Ask InnovateInc whether they have sustainable packaging solutions available for our eco-friendly product line',
    description: 'Should find InnovateInc and draft detailed inquiry with context'
  }
];

async function testEmailIntegration() {
  console.log('🧪 Testing Email Integration Workflow\n');
  console.log('=' .repeat(60));
  
  // Test server health first
  try {
    const healthResponse = await axios.get(`${BACKEND_URL}/health`);
    console.log('✅ Server is running:', healthResponse.data.status);
  } catch (error) {
    console.error('❌ Server is not running. Please start the server first:');
    console.error('   npm run server');
    return;
  }
  
  console.log('\n📧 Testing Email Drafting Scenarios:\n');
  
  for (let i = 0; i < testCases.length; i++) {
    const testCase = testCases[i];
    console.log(`\n${i + 1}. ${testCase.name}`);
    console.log(`   Description: ${testCase.description}`);
    console.log(`   User Input: "${testCase.message}"`);
    console.log('   ' + '-'.repeat(50));
    
    try {
      const startTime = Date.now();
      
      // Send message to chat endpoint (simulating Slack bot)
      const response = await axios.post(`${BACKEND_URL}/api/chat`, {
        userId: TEST_USER_ID,
        message: testCase.message,
        channel: TEST_CHANNEL,
        timestamp: Date.now().toString(),
        metadata: {
          conversation_history: []
        }
      });
      
      const processingTime = Date.now() - startTime;
      
      if (response.data.reply) {
        console.log('   ✅ Response received:');
        console.log(`   📝 ${response.data.reply}`);
        console.log(`   ⏱️  Processing time: ${processingTime}ms`);
        console.log(`   🔧 Confidence: ${response.data.confidence}`);
        
        // Check if response contains mailto link
        if (response.data.reply.includes('mailto:')) {
          console.log('   📧 ✅ Mailto link detected in response!');
        } else {
          console.log('   📧 ⚠️  No mailto link found - may need supplier/contact data');
        }
      } else {
        console.log('   ❌ No reply received');
      }
      
    } catch (error) {
      console.log('   ❌ Error:', error.response?.data?.error?.message || error.message);
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('🎯 Email Integration Test Complete');
  console.log('\n📋 Next Steps:');
  console.log('1. Add test supplier and contact data to database');
  console.log('2. Test mailto links in different email clients');
  console.log('3. Verify email content quality and formatting');
  console.log('4. Test edge cases (missing contacts, long emails, etc.)');
}

// Test specific email drafting endpoint directly
async function testEmailToolDirect() {
  console.log('\n🔧 Testing Email Tool Directly\n');
  console.log('=' .repeat(40));
  
  const directTestCases = [
    {
      name: 'Draft email by supplier ID',
      query: 'Draft an inquiry email asking about product availability',
      context: { supplierId: 1, emailType: 'inquiry', context: 'widgets and components' }
    },
    {
      name: 'Draft email by contact email',
      query: 'Draft introduction email',
      context: { recipientEmail: 'test@example.com', emailType: 'introduction' }
    }
  ];
  
  for (const testCase of directTestCases) {
    console.log(`\n📧 ${testCase.name}:`);
    
    try {
      const response = await axios.post(`${BACKEND_URL}/api/openai/process`, {
        message: `Use the draft_email tool with these parameters: ${JSON.stringify(testCase.context)}`,
        userId: TEST_USER_ID,
        context: { conversation_history: [] }
      });
      
      console.log('✅ Direct tool test result:');
      console.log(response.data.response);
      
    } catch (error) {
      console.log('❌ Direct tool test error:', error.response?.data?.error?.message || error.message);
    }
  }
}

// Main test execution
async function runAllTests() {
  await testEmailIntegration();
  await testEmailToolDirect();
  
  console.log('\n🚀 Email Integration Ready!');
  console.log('\n💡 Example Slack Commands to Try:');
  console.log('   @bot ask TechCorp if they have widgets available');
  console.log('   @bot draft follow-up email to John at GlobalSupplier');
  console.log('   @bot compose meeting request for jane@company.com');
  console.log('   @bot send introduction email to contact at InnovateInc');
}

// Run tests if called directly
if (require.main === module) {
  runAllTests().catch(console.error);
}

module.exports = {
  testEmailIntegration,
  testEmailToolDirect,
  runAllTests
};
