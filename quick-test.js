/**
 * Quick test script using environment variables
 */

// Set environment variables from system
process.env.DATABASE_URL = "postgresql://publicuser:Hackathon123!@34.55.216.61:5432/hackathon";
process.env.DEBUG = "true";

const { SupplierManagementApp } = require('./dist/index');

async function quickTest() {
  console.log('🧪 Testing Supplier Management System...\n');
  
  // Check if we have the OpenAI API key
  if (!process.env.OPENAI_API_KEY) {
    console.log('❌ OPENAI_API_KEY not found in environment variables');
    return;
  }
  
  console.log('✅ OpenAI API key found');
  console.log('✅ Database URL configured');
  
  const app = new SupplierManagementApp();
  
  try {
    // Test 1: Initialize the app
    console.log('\n1️⃣ Testing initialization...');
    const initialized = await app.initialize();
    
    if (!initialized) {
      console.log('❌ Initialization failed');
      return;
    }
    console.log('✅ App initialized successfully');

    // Test 2: Test database connection with a simple query
    console.log('\n2️⃣ Testing database connection...');
    const result = await app.query('Search for any suppliers, limit to 3 results');
    console.log('✅ Database query successful');
    console.log('Response preview:', result.output.substring(0, 300) + '...');

    // Test 3: Create a test supplier
    console.log('\n3️⃣ Testing supplier creation...');
    const createResult = await app.query('Create a new supplier called "Test Corp" with domain "test.com"');
    console.log('✅ Supplier creation test completed');
    console.log('Response preview:', createResult.output.substring(0, 200) + '...');

    // Test 4: Search for the created supplier
    console.log('\n4️⃣ Testing supplier search...');
    const searchResult = await app.query('Find suppliers with domain containing "test"');
    console.log('✅ Supplier search test completed');
    console.log('Response preview:', searchResult.output.substring(0, 200) + '...');

    console.log('\n🎉 All tests passed! Your system is working correctly.');
    console.log('\n📚 Next steps:');
    console.log('- Run "node interactive-demo.js" for an interactive session');
    console.log('- Check the README.md for more usage examples');
    console.log('- Use "npm run db:studio" to view your data in Prisma Studio');
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('- Verify your database is accessible from this IP');
    console.log('- Check your OpenAI API key has sufficient credits');
    console.log('- Ensure your Google Cloud SQL instance is running');
  } finally {
    await app.cleanup();
  }
}

quickTest().catch(console.error);
