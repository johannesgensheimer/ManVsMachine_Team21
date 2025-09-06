const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function setupDemoData() {
  console.log('🗄️  Setting up demo data for email integration...\n');
  
  try {
    // Create demo suppliers
    const suppliers = [
      {
        name: 'TechCorp',
        domain: 'techcorp.com',
        status: 'active',
        tier: 'gold'
      },
      {
        name: 'GlobalSupplier',
        domain: 'globalsupplier.com', 
        status: 'active',
        tier: 'silver'
      },
      {
        name: 'InnovateInc',
        domain: 'innovateinc.com',
        status: 'prospective',
        tier: 'bronze'
      }
    ];
    
    console.log('📊 Creating suppliers...');
    const createdSuppliers = [];
    for (const supplier of suppliers) {
      const created = await prisma.supplier.upsert({
        where: { domain: supplier.domain },
        update: supplier,
        create: supplier
      });
      createdSuppliers.push(created);
      console.log(`   ✅ ${created.name} (ID: ${created.id})`);
    }
    
    // Create demo contacts
    const contacts = [
      {
        supplierId: createdSuppliers[0].id, // TechCorp
        firstName: 'John',
        lastName: 'Smith',
        title: 'Sales Director',
        email: 'john.smith@techcorp.com',
        phone: '+1-555-0101',
        linkedinUrl: 'https://linkedin.com/in/johnsmith'
      },
      {
        supplierId: createdSuppliers[0].id, // TechCorp
        firstName: 'Sarah',
        lastName: 'Johnson',
        title: 'Product Manager',
        email: 'sarah.johnson@techcorp.com',
        phone: '+1-555-0102'
      },
      {
        supplierId: createdSuppliers[1].id, // GlobalSupplier
        firstName: 'Mike',
        lastName: 'Chen',
        title: 'Business Development',
        email: 'mike.chen@globalsupplier.com',
        phone: '+1-555-0201'
      },
      {
        supplierId: createdSuppliers[2].id, // InnovateInc
        firstName: 'Emily',
        lastName: 'Rodriguez',
        title: 'CEO',
        email: 'emily.rodriguez@innovateinc.com',
        phone: '+1-555-0301',
        linkedinUrl: 'https://linkedin.com/in/emilyrodriguez'
      }
    ];
    
    console.log('\n👥 Creating contacts...');
    const createdContacts = [];
    for (const contact of contacts) {
      const created = await prisma.contact.upsert({
        where: { 
          supplierId_email: {
            supplierId: contact.supplierId,
            email: contact.email
          }
        },
        update: contact,
        create: contact
      });
      createdContacts.push(created);
      console.log(`   ✅ ${created.firstName} ${created.lastName} at ${suppliers.find(s => s.domain === (createdSuppliers.find(cs => cs.id === created.supplierId)?.domain))?.name}`);
    }
    
    // Create some demo interactions
    const interactions = [
      {
        supplierId: createdSuppliers[0].id,
        contactId: createdContacts[0].id,
        channel: 'email',
        summary: 'Discussed widget pricing and availability for Q1 project',
        sentiment: 'positive',
        occurredAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
      },
      {
        supplierId: createdSuppliers[1].id,
        contactId: createdContacts[2].id,
        channel: 'phone',
        summary: 'Initial partnership discussion, very interested in collaboration',
        sentiment: 'positive',
        occurredAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
      },
      {
        supplierId: createdSuppliers[2].id,
        contactId: createdContacts[3].id,
        channel: 'meeting',
        summary: 'Pitched our requirements, waiting for their proposal',
        sentiment: 'neutral',
        occurredAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
      }
    ];
    
    console.log('\n💬 Creating interactions...');
    for (const interaction of interactions) {
      const created = await prisma.interaction.create({
        data: interaction,
        include: {
          contact: true,
          supplier: true
        }
      });
      console.log(`   ✅ ${created.channel} with ${created.contact.firstName} at ${created.supplier.name}`);
    }
    
    // Create some demo notes
    const notes = [
      {
        supplierId: createdSuppliers[0].id,
        authorId: 'demo-user',
        body: 'TechCorp has excellent widget quality but pricing is premium. Good for high-value projects.'
      },
      {
        supplierId: createdSuppliers[1].id,
        authorId: 'demo-user', 
        body: 'GlobalSupplier is very responsive and flexible. Great for custom solutions.'
      },
      {
        supplierId: createdSuppliers[2].id,
        authorId: 'demo-user',
        body: 'InnovateInc specializes in sustainable solutions. Perfect for our eco-friendly initiatives.'
      }
    ];
    
    console.log('\n📝 Creating notes...');
    for (const note of notes) {
      const created = await prisma.note.create({
        data: note,
        include: { supplier: true }
      });
      console.log(`   ✅ Note for ${created.supplier.name}`);
    }
    
    console.log('\n✅ Demo data setup complete!\n');
    
    // Display summary
    console.log('📋 Summary of created data:');
    console.log(`   • ${createdSuppliers.length} suppliers`);
    console.log(`   • ${createdContacts.length} contacts`);
    console.log(`   • ${interactions.length} interactions`);
    console.log(`   • ${notes.length} notes`);
    
    console.log('\n🧪 Ready to test email integration!');
    console.log('\n💡 Try these Slack commands:');
    console.log('   @bot ask TechCorp if they have widgets available');
    console.log('   @bot draft follow-up email to John Smith about our widget discussion');
    console.log('   @bot compose meeting request for Emily Rodriguez at InnovateInc');
    console.log('   @bot send introduction email to mike.chen@globalsupplier.com');
    
  } catch (error) {
    console.error('❌ Error setting up demo data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run setup if called directly
if (require.main === module) {
  setupDemoData().catch(console.error);
}

module.exports = { setupDemoData };
