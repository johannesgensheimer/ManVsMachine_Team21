/**
 * Simple example showing how to use the REST API
 */

const axios = require('axios');

const API_BASE = 'http://localhost:3000';

async function exampleUsage() {
  console.log('🚀 API Usage Example\n');

  try {
    // 1. Check if server is healthy
    console.log('1️⃣ Checking server health...');
    const health = await axios.get(`${API_BASE}/health`);
    console.log('✅ Server is healthy:', health.data.status);

    // 2. Get available tools
    console.log('\n2️⃣ Getting available tools...');
    const tools = await axios.get(`${API_BASE}/api/tools`);
    console.log(`✅ Found ${tools.data.count} tools available`);

    // 3. Simple text query to LangChain LLM
    console.log('\n3️⃣ Sending query to LangChain LLM...');
    const query1 = await axios.post(`${API_BASE}/api/query`, {
      text: 'Search for all suppliers and give me a summary'
    });
    console.log('✅ LLM Response:', query1.data.response);

    // 4. Another query - create a supplier
    console.log('\n4️⃣ Creating a new supplier...');
    const query2 = await axios.post(`${API_BASE}/api/query`, {
      text: 'Create a new supplier called "Example Corp" with domain "example.com", set status to "active" and tier to "gold"'
    });
    console.log('✅ LLM Response:', query2.data.response);

    // 5. Search for the created supplier
    console.log('\n5️⃣ Searching for suppliers...');
    const query3 = await axios.post(`${API_BASE}/api/query`, {
      text: 'Find all suppliers with "example" in their name'
    });
    console.log('✅ LLM Response:', query3.data.response);

    console.log('\n🎉 Example completed successfully!');

  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Make sure the server is running:');
      console.log('   npm run server');
    }
  }
}

// Run the example
exampleUsage();
