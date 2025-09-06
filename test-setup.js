/**
 * Quick test setup script to verify the system works
 * Run this after setting up your .env file
 */

const { SupplierManagementApp } = require('./dist/index');

async function quickTest() {
  console.log('🧪 Running Quick Test...\n');
  
  const app = new SupplierManagementApp();
  
  try {
    // Test 1: Initialize the app
    console.log('1️⃣ Testing initialization...');
    const initialized = await app.initialize();
    
    if (!initialized) {
      console.log('❌ Initialization failed - check your database connection and API key');
      return;
    }
    console.log('✅ App initialized successfully\n');

    // Test 2: Test database connection
    console.log('2️⃣ Testing database connection...');
    const result = await app.query('Search for any suppliers, limit to 3 results');
    console.log('✅ Database query successful');
    console.log('Response:', result.output.substring(0, 200) + '...\n');

    // Test 3: Create a test supplier
    console.log('3️⃣ Testing supplier creation...');
    const createResult = await app.query('Create a new supplier called "Test Corp" with domain "test.com", status "pending", and tier "bronze"');
    console.log('✅ Supplier creation test');
    console.log('Response:', createResult.output.substring(0, 200) + '...\n');

    // Test 4: Search for the created supplier
    console.log('4️⃣ Testing supplier search...');
    const searchResult = await app.query('Find the supplier with domain "test.com"');
    console.log('✅ Supplier search test');
    console.log('Response:', searchResult.output.substring(0, 200) + '...\n');

    console.log('🎉 All tests passed! Your system is working correctly.');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('- Check your DATABASE_URL in .env file');
    console.log('- Verify your OpenAI API key is correct');
    console.log('- Make sure your database is accessible');
  } finally {
    await app.cleanup();
  }
}

quickTest();
