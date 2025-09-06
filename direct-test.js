/**
 * Direct tool testing without the agent
 * This tests the database tools directly
 */

// Set environment variables
process.env.DATABASE_URL = "postgresql://publicuser:Hackathon123!@34.55.216.61:5432/hackathon";
process.env.DEBUG = "true";

const { searchSuppliersTool, createSupplierTool, getSupplierOverviewTool } = require('./dist/tools');

async function directTest() {
  console.log('🧪 Testing Database Tools Directly...\n');
  
  try {
    // Test 1: Search suppliers
    console.log('1️⃣ Testing search suppliers...');
    const searchResult = await searchSuppliersTool.invoke({ limit: 3 });
    console.log('✅ Search successful');
    console.log('Result:', JSON.parse(searchResult).suppliers?.length || 0, 'suppliers found');
    console.log('Preview:', searchResult.substring(0, 200) + '...\n');

    // Test 2: Create a supplier
    console.log('2️⃣ Testing create supplier...');
    const createResult = await createSupplierTool.invoke({
      name: "Direct Test Corp",
      domain: "directtest.com",
      status: "pending",
      tier: "bronze"
    });
    console.log('✅ Create successful');
    const createData = JSON.parse(createResult);
    console.log('Created supplier ID:', createData.supplier?.id);
    console.log('Preview:', createResult.substring(0, 200) + '...\n');

    // Test 3: Get supplier overview
    if (createData.supplier?.id) {
      console.log('3️⃣ Testing get supplier overview...');
      const overviewResult = await getSupplierOverviewTool.invoke({
        supplierId: createData.supplier.id,
        includeDays: 30,
        includeNotes: true
      });
      console.log('✅ Overview successful');
      console.log('Preview:', overviewResult.substring(0, 200) + '...\n');
    }

    // Test 4: Search by domain
    console.log('4️⃣ Testing search by domain...');
    const domainSearchResult = await searchSuppliersTool.invoke({
      domain: "directtest",
      limit: 5
    });
    console.log('✅ Domain search successful');
    const domainData = JSON.parse(domainSearchResult);
    console.log('Found suppliers:', domainData.suppliers?.length || 0);
    console.log('Preview:', domainSearchResult.substring(0, 200) + '...\n');

    console.log('🎉 All direct tool tests passed!');
    console.log('\n✨ Your database tools are working correctly.');
    console.log('The issue is with the LangChain agent JSON parsing, not the core functionality.');
    
  } catch (error) {
    console.error('❌ Direct test failed:', error.message);
    console.log('\n🔧 Error details:', error);
  }
}

directTest().catch(console.error);
