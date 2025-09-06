/**
 * Clean test with better error handling and clearer output
 */

// Set environment variables
process.env.DATABASE_URL = "postgresql://publicuser:Hackathon123!@34.55.216.61:5432/hackathon";
process.env.DEBUG = "false"; // Turn off verbose logging

const { 
  searchSuppliersTool, 
  createSupplierTool, 
  getSupplierOverviewTool,
  manageContactTool,
  logInteractionTool,
  addNoteTool
} = require('./dist/tools');

async function cleanTest() {
  console.log('🧪 Clean Database Test...\n');
  
  let testsPassed = 0;
  let testsTotal = 0;
  
  try {
    // Test 1: Search suppliers (should work even if empty)
    testsTotal++;
    console.log('1️⃣ Testing search suppliers...');
    const searchResult = await searchSuppliersTool.invoke({ limit: 3 });
    const searchData = JSON.parse(searchResult);
    console.log(`✅ Search successful - Found ${searchData.suppliers.length} suppliers`);
    testsPassed++;

    // Test 2: Create a supplier
    testsTotal++;
    console.log('\n2️⃣ Testing create supplier...');
    const createResult = await createSupplierTool.invoke({
      name: "Clean Test Corp",
      domain: "cleantest.com",
      status: "active",
      tier: "gold"
    });
    const createData = JSON.parse(createResult);
    if (createData.success && createData.supplier?.id) {
      console.log(`✅ Create successful - Supplier ID: ${createData.supplier.id}`);
      testsPassed++;
    } else {
      throw new Error('Create supplier failed: ' + JSON.stringify(createData));
    }

    const supplierId = createData.supplier.id;

    // Test 3: Get supplier overview
    testsTotal++;
    console.log('\n3️⃣ Testing get supplier overview...');
    const overviewResult = await getSupplierOverviewTool.invoke({
      supplierId: supplierId,
      includeDays: 30,
      includeNotes: true
    });
    const overviewData = JSON.parse(overviewResult);
    if (overviewData.supplier && overviewData.supplier.id === supplierId) {
      console.log(`✅ Overview successful - Supplier: ${overviewData.supplier.name}`);
      testsPassed++;
    } else {
      throw new Error('Get overview failed: ' + JSON.stringify(overviewData));
    }

    // Test 4: Add a contact
    testsTotal++;
    console.log('\n4️⃣ Testing add contact...');
    const contactResult = await manageContactTool.invoke({
      action: 'create',
      supplierId: supplierId,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@cleantest.com',
      title: 'CEO'
    });
    const contactData = JSON.parse(contactResult);
    if (contactData.success && contactData.contact?.id) {
      console.log(`✅ Contact created - ID: ${contactData.contact.id}`);
      testsPassed++;
    } else {
      throw new Error('Create contact failed: ' + JSON.stringify(contactData));
    }

    // Test 5: Log an interaction
    testsTotal++;
    console.log('\n5️⃣ Testing log interaction...');
    const interactionResult = await logInteractionTool.invoke({
      supplierId: supplierId,
      contactId: contactData.contact.id,
      channel: 'email',
      summary: 'Initial contact and introduction',
      sentiment: 'positive'
    });
    const interactionData = JSON.parse(interactionResult);
    if (interactionData.success && interactionData.interaction?.id) {
      console.log(`✅ Interaction logged - ID: ${interactionData.interaction.id}`);
      testsPassed++;
    } else {
      throw new Error('Log interaction failed: ' + JSON.stringify(interactionData));
    }

    // Test 6: Add a note
    testsTotal++;
    console.log('\n6️⃣ Testing add note...');
    const noteResult = await addNoteTool.invoke({
      supplierId: supplierId,
      body: 'This is a test note for Clean Test Corp. Very promising client!',
      authorId: 'test-user'
    });
    const noteData = JSON.parse(noteResult);
    if (noteData.success && noteData.note?.id) {
      console.log(`✅ Note added - ID: ${noteData.note.id}`);
      testsPassed++;
    } else {
      throw new Error('Add note failed: ' + JSON.stringify(noteData));
    }

    // Test 7: Final overview with all data
    testsTotal++;
    console.log('\n7️⃣ Testing complete overview...');
    const finalOverviewResult = await getSupplierOverviewTool.invoke({
      supplierId: supplierId,
      includeDays: 30,
      includeNotes: true
    });
    const finalOverviewData = JSON.parse(finalOverviewResult);
    if (finalOverviewData.supplier && 
        finalOverviewData.contacts.length > 0 && 
        finalOverviewData.recentInteractions.length > 0 &&
        finalOverviewData.recentNotes.length > 0) {
      console.log(`✅ Complete overview successful`);
      console.log(`   - Supplier: ${finalOverviewData.supplier.name}`);
      console.log(`   - Contacts: ${finalOverviewData.contacts.length}`);
      console.log(`   - Interactions: ${finalOverviewData.recentInteractions.length}`);
      console.log(`   - Notes: ${finalOverviewData.recentNotes.length}`);
      testsPassed++;
    } else {
      throw new Error('Final overview incomplete: ' + JSON.stringify(finalOverviewData));
    }

    console.log(`\n🎉 All tests passed! (${testsPassed}/${testsTotal})`);
    console.log('\n✨ Your database system is fully functional!');
    console.log('\n📊 Summary:');
    console.log('- Database connection: ✅ Working');
    console.log('- Supplier management: ✅ Working');
    console.log('- Contact management: ✅ Working');
    console.log('- Interaction tracking: ✅ Working');
    console.log('- Note management: ✅ Working');
    console.log('- Data relationships: ✅ Working');
    
  } catch (error) {
    console.error(`\n❌ Test failed (${testsPassed}/${testsTotal} passed)`);
    console.error('Error:', error.message);
    if (error.stack) {
      console.error('\nStack trace:', error.stack);
    }
  }
}

cleanTest().catch(console.error);
