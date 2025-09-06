/**
 * Simple usage example - how to use your system effectively
 * This shows the recommended way to use your database tools
 */

// Set environment variables
process.env.DATABASE_URL = "postgresql://publicuser:Hackathon123!@34.55.216.61:5432/hackathon";

const { 
  searchSuppliersTool, 
  createSupplierTool, 
  getSupplierOverviewTool,
  manageContactTool,
  logInteractionTool,
  addNoteTool 
} = require('./dist/tools');

async function demonstrateUsage() {
  console.log('🚀 Simple Usage Demo\n');
  
  try {
    // 1. Search existing suppliers
    console.log('1️⃣ Searching for existing suppliers...');
    const searchResult = await searchSuppliersTool.invoke({ 
      status: 'active', 
      limit: 5 
    });
    const suppliers = JSON.parse(searchResult);
    console.log(`Found ${suppliers.suppliers.length} active suppliers\n`);

    // 2. Create a new supplier
    console.log('2️⃣ Creating a new supplier...');
    const newSupplier = await createSupplierTool.invoke({
      name: 'Demo Company Inc',
      domain: 'democompany.com',
      status: 'active',
      tier: 'gold'
    });
    const supplierData = JSON.parse(newSupplier);
    console.log(`✅ Created supplier: ${supplierData.supplier.name} (ID: ${supplierData.supplier.id})\n`);

    const supplierId = supplierData.supplier.id;

    // 3. Add a contact
    console.log('3️⃣ Adding a contact...');
    const newContact = await manageContactTool.invoke({
      action: 'create',
      supplierId: supplierId,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@democompany.com',
      title: 'VP of Sales',
      phone: '+1-555-0123'
    });
    const contactData = JSON.parse(newContact);
    console.log(`✅ Added contact: ${contactData.contact.firstName} ${contactData.contact.lastName}\n`);

    // 4. Log an interaction
    console.log('4️⃣ Logging an interaction...');
    const interaction = await logInteractionTool.invoke({
      supplierId: supplierId,
      contactId: contactData.contact.id,
      channel: 'email',
      summary: 'Initial outreach - discussed partnership opportunities. Very positive response.',
      sentiment: 'positive',
      updateSupplierStatus: true
    });
    const interactionData = JSON.parse(interaction);
    console.log(`✅ Logged interaction: ${interactionData.interaction.summary.substring(0, 50)}...\n`);

    // 5. Add a note
    console.log('5️⃣ Adding a note...');
    const note = await addNoteTool.invoke({
      supplierId: supplierId,
      body: 'High-priority prospect. Jane mentioned they are looking for new suppliers for Q1 2024. Follow up in 2 weeks.',
      authorId: 'demo-user'
    });
    const noteData = JSON.parse(note);
    console.log(`✅ Added note: ${noteData.note.body.substring(0, 50)}...\n`);

    // 6. Get complete overview
    console.log('6️⃣ Getting complete supplier overview...');
    const overview = await getSupplierOverviewTool.invoke({
      supplierId: supplierId,
      includeDays: 30,
      includeNotes: true
    });
    const overviewData = JSON.parse(overview);
    
    console.log('📊 Complete Overview:');
    console.log(`   Company: ${overviewData.supplier.name}`);
    console.log(`   Status: ${overviewData.supplier.status} | Tier: ${overviewData.supplier.tier}`);
    console.log(`   Contacts: ${overviewData.contacts.length}`);
    console.log(`   Recent Interactions: ${overviewData.recentInteractions.length}`);
    console.log(`   Notes: ${overviewData.recentNotes.length}`);
    console.log(`   Sentiment Summary:`, overviewData.summary.sentimentBreakdown);

    console.log('\n🎉 Demo completed successfully!');
    console.log('\n💡 Key Points:');
    console.log('- All database tools work perfectly');
    console.log('- You can use them directly in your applications');
    console.log('- JSON responses are well-structured and complete');
    console.log('- The system handles relationships between suppliers, contacts, interactions, and notes');
    
  } catch (error) {
    console.error('❌ Demo failed:', error.message);
  }
}

// Also show how to build a simple query interface
async function simpleQueryInterface(query) {
  console.log(`\n🤔 Processing: "${query}"`);
  
  // Simple keyword-based routing (you could make this more sophisticated)
  if (query.toLowerCase().includes('search') && query.toLowerCase().includes('supplier')) {
    const result = await searchSuppliersTool.invoke({ limit: 10 });
    const data = JSON.parse(result);
    console.log(`📋 Found ${data.suppliers.length} suppliers`);
    return data;
  }
  
  if (query.toLowerCase().includes('create') && query.toLowerCase().includes('supplier')) {
    // Extract name and domain from query (simple regex)
    const nameMatch = query.match(/called?\s+"([^"]+)"/);
    const domainMatch = query.match(/domain\s+"([^"]+)"/);
    
    if (nameMatch && domainMatch) {
      const result = await createSupplierTool.invoke({
        name: nameMatch[1],
        domain: domainMatch[1],
        status: 'pending',
        tier: 'bronze'
      });
      const data = JSON.parse(result);
      console.log(`✅ Created: ${data.supplier.name}`);
      return data;
    }
  }
  
  console.log('❓ Query not recognized. Try: "search suppliers" or "create supplier called \'Company\' with domain \'company.com\'"');
}

// Run the demo
demonstrateUsage()
  .then(() => {
    console.log('\n' + '='.repeat(60));
    console.log('🎯 Simple Query Examples:');
    console.log('='.repeat(60));
    
    // Test simple queries
    return Promise.all([
      simpleQueryInterface('search suppliers'),
      simpleQueryInterface('create supplier called "Test Query Corp" with domain "testquery.com"')
    ]);
  })
  .catch(console.error);
