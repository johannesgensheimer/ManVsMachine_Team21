#!/usr/bin/env node

/**
 * Database Population Script
 * 
 * This script reads construction suppliers data from CSV file and populates:
 * 1. Suppliers table
 * 2. Contacts table 
 * 3. Deals table (with randomly generated deals)
 * 
 * Usage: node scripts/populate-database.js
 */

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser'); // You'll need to install: npm install csv-parser

const prisma = new PrismaClient();

// Configuration
const CONFIG = {
  CSV_FILE_PATH: path.join(__dirname, '..', 'data', 'construction_suppliers2.csv'),
  MIN_DEALS_PER_SUPPLIER: 1,
  MAX_DEALS_PER_SUPPLIER: 5,
  DEAL_VALUE_MIN: 10000, // $100
  DEAL_VALUE_MAX: 500000000, // $5M
};

// Deal templates based on construction industry
const DEAL_TEMPLATES = [
  {
    titles: [
      'Roofing Materials Supply Contract',
      'Annual Roofing Supply Agreement', 
      'Commercial Roofing Project Supply',
      'Residential Roofing Materials Deal'
    ],
    descriptions: [
      'Annual contract for roofing materials including shingles, underlayment, and accessories',
      'Bulk supply agreement for commercial roofing projects across multiple locations',
      'Residential roofing materials package for subdivision development',
      'Premium roofing materials for high-end commercial properties'
    ]
  },
  {
    titles: [
      'Building Materials Supply Contract',
      'Lumber & Framing Materials Deal',
      'Construction Materials Package',
      'Building Supply Agreement'
    ],
    descriptions: [
      'Comprehensive building materials supply for residential construction projects',
      'Lumber, framing materials, and structural components supply agreement',
      'One-stop building materials package for commercial development',
      'Multi-project building materials supply contract'
    ]
  },
  {
    titles: [
      'Specialty Building Products Contract',
      'Exterior Building Materials Deal',
      'Interior Building Products Supply',
      'Waterproofing Materials Agreement'
    ],
    descriptions: [
      'Specialty products including waterproofing, insulation, and exterior finishes',
      'Premium exterior building materials for commercial projects',
      'Interior building products and finishing materials supply',
      'Comprehensive waterproofing and building envelope solutions'
    ]
  }
];

const DEAL_STAGES = [
  'prospecting',
  'proposal', 
  'negotiation',
  'closed-won',
  'closed-lost'
];

const DEAL_STATUSES = [
  'active',
  'paused', 
  'cancelled',
  'completed'
];

const DEAL_PRIORITIES = [
  'low',
  'medium',
  'high', 
  'critical'
];

// Utility functions
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateRandomDeal(supplierId, contactId, companyName) {
  const template = getRandomElement(DEAL_TEMPLATES);
  const title = getRandomElement(template.titles);
  const description = getRandomElement(template.descriptions);
  
  const stage = getRandomElement(DEAL_STAGES);
  const status = stage === 'closed-won' || stage === 'closed-lost' ? 'completed' : getRandomElement(DEAL_STATUSES);
  const priority = getRandomElement(DEAL_PRIORITIES);
  
  // Generate deal value (in cents)
  const dealValue = getRandomInt(CONFIG.DEAL_VALUE_MIN, CONFIG.DEAL_VALUE_MAX);
  
  // Generate probability based on stage
  let probability;
  switch (stage) {
    case 'prospecting': probability = getRandomInt(10, 30); break;
    case 'proposal': probability = getRandomInt(25, 50); break;
    case 'negotiation': probability = getRandomInt(50, 80); break;
    case 'closed-won': probability = 100; break;
    case 'closed-lost': probability = 0; break;
    default: probability = getRandomInt(20, 60);
  }
  
  // Generate dates
  const createdAt = new Date(Date.now() - getRandomInt(1, 365) * 24 * 60 * 60 * 1000); // Random date in last year
  const expectedCloseDate = new Date(createdAt.getTime() + getRandomInt(30, 180) * 24 * 60 * 60 * 1000); // 30-180 days later
  const actualCloseDate = (stage === 'closed-won' || stage === 'closed-lost') 
    ? new Date(createdAt.getTime() + getRandomInt(30, 150) * 24 * 60 * 60 * 1000)
    : null;
  
  return {
    supplierId,
    contactId,
    title: `${title} - ${companyName}`,
    description,
    value: dealValue,
    currency: 'USD',
    stage,
    status,
    priority,
    probability,
    expectedCloseDate,
    actualCloseDate,
    ownerId: `user_${getRandomInt(1, 5)}`, // Simulate 5 different users
    createdAt
  };
}

function parseTier(tier) {
  // Clean up tier value - remove "Tier " prefix if present and normalize
  return tier.replace(/^Tier\s*/i, '').trim() || 'Standard';
}

function parseRevenue(revenue) {
  // Extract revenue info for potential use in notes or descriptions
  return revenue ? revenue.replace(/^\$/, '').trim() : null;
}

function parseHeadquarters(headquarters) {
  // Clean up headquarters info
  return headquarters ? headquarters.trim() : null;
}

async function readCSVFile() {
  return new Promise((resolve, reject) => {
    const results = [];
    
    if (!fs.existsSync(CONFIG.CSV_FILE_PATH)) {
      reject(new Error(`CSV file not found: ${CONFIG.CSV_FILE_PATH}`));
      return;
    }
    
    fs.createReadStream(CONFIG.CSV_FILE_PATH)
      .pipe(csv())
      .on('data', (data) => {
        // Clean up the data and handle potential BOM or encoding issues
        const cleanedData = {};
        Object.keys(data).forEach(key => {
          const cleanKey = key.replace(/^\ufeff/, ''); // Remove BOM
          cleanedData[cleanKey] = data[key];
        });
        results.push(cleanedData);
      })
      .on('end', () => {
        console.log(`📊 Successfully read ${results.length} records from CSV`);
        resolve(results);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

async function populateDatabase() {
  try {
    console.log('🚀 Starting database population...\n');
    
    // Read CSV data
    console.log('📖 Reading CSV file...');
    const csvData = await readCSVFile();
    
    if (csvData.length === 0) {
      throw new Error('No data found in CSV file');
    }
    
    console.log(`Found ${csvData.length} suppliers to process\n`);
    
    // Clear existing data (optional - comment out if you want to keep existing data)
    // console.log('🧹 Clearing existing data...');
    // await prisma.deal.deleteMany({});
    // await prisma.interaction.deleteMany({});
    // await prisma.note.deleteMany({});
    // await prisma.contact.deleteMany({});
    // await prisma.supplier.deleteMany({});
    // console.log('✅ Existing data cleared\n');
    
    let supplierCount = 0;
    let contactCount = 0;
    let dealCount = 0;
    
    // Process each supplier from CSV
    for (const row of csvData) {
      try {
        console.log(`Processing: ${row.company_name}...`);
        
        // 1. Create Supplier
        const supplier = await prisma.supplier.create({
          data: {
            name: row.company_name.trim(),
            domain: row.domain.trim(),
            status: row.status.trim() || 'Active',
            tier: parseTier(row.tier),
            primaryProducts: row.primary_products ? row.primary_products.trim() : null
          }
        });
        
        supplierCount++;
        console.log(`  ✅ Created supplier: ${supplier.name} (ID: ${supplier.id})`);
        
        // 2. Create Contact (if contact info is available)
        let contact = null;
        if (row.contact_first_name && row.contact_last_name) {
          // Generate dummy email if not provided
          let contactEmail = row.contact_email && row.contact_email.trim() !== '' 
            ? row.contact_email.trim() 
            : `${row.contact_first_name.trim().toLowerCase()}@${row.domain.trim()}`;
          
          contact = await prisma.contact.create({
            data: {
              supplierId: supplier.id,
              firstName: row.contact_first_name.trim(),
              lastName: row.contact_last_name.trim(),
              title: row.contact_title ? row.contact_title.trim() : null,
              email: contactEmail,
              phone: row.contact_phone ? row.contact_phone.trim() : null,
              linkedinUrl: row.linkedin_url && row.linkedin_url.trim() !== '' ? row.linkedin_url.trim() : null
            }
          });
          
          contactCount++;
          const emailNote = row.contact_email && row.contact_email.trim() !== '' ? '' : ' (dummy email generated)';
          console.log(`  ✅ Created contact: ${contact.firstName} ${contact.lastName} (${contact.email})${emailNote}`);
        } else {
          console.log(`  ⚠️ Skipped contact creation - missing first name or last name`);
        }
        
        // 3. Create random deals for this supplier
        const numDeals = getRandomInt(CONFIG.MIN_DEALS_PER_SUPPLIER, CONFIG.MAX_DEALS_PER_SUPPLIER);
        const deals = [];
        
        for (let i = 0; i < numDeals; i++) {
          const deal = generateRandomDeal(
            supplier.id, 
            contact ? contact.id : null, 
            supplier.name
          );
          deals.push(deal);
        }
        
        // Bulk create deals
        const createdDeals = await prisma.deal.createMany({
          data: deals
        });
        
        dealCount += createdDeals.count;
        console.log(`  ✅ Created ${createdDeals.count} deals`);
        
        // 4. Add some initial notes with company info
        if (row.company_description || row.revenue || row.headquarters) {
          const noteBody = [
            row.company_description && `Company Description: ${row.company_description}`,
            row.revenue && `Revenue: ${row.revenue}`,
            row.headquarters && `Headquarters: ${row.headquarters}`
          ].filter(Boolean).join('\n\n');
          
          if (noteBody) {
            await prisma.note.create({
              data: {
                supplierId: supplier.id,
                authorId: 'system',
                body: noteBody
              }
            });
            console.log(`  ✅ Added company info note`);
          }
        }
        
        console.log(`  🎯 Completed processing: ${supplier.name}\n`);
        
      } catch (error) {
        console.error(`❌ Error processing ${row.company_name}:`, error.message);
        continue; // Continue with next supplier
      }
    }
    
    console.log('🎉 Database population completed!\n');
    console.log('📊 Summary:');
    console.log(`  • Suppliers created: ${supplierCount}`);
    console.log(`  • Contacts created: ${contactCount}`);
    console.log(`  • Deals created: ${dealCount}`);
    console.log('');
    
    // Verify the data
    console.log('🔍 Verification:');
    const totalSuppliers = await prisma.supplier.count();
    const totalContacts = await prisma.contact.count();
    const totalDeals = await prisma.deal.count();
    const totalNotes = await prisma.note.count();
    
    console.log(`  • Total suppliers in DB: ${totalSuppliers}`);
    console.log(`  • Total contacts in DB: ${totalContacts}`);
    console.log(`  • Total deals in DB: ${totalDeals}`);
    console.log(`  • Total notes in DB: ${totalNotes}`);
    
  } catch (error) {
    console.error('❌ Database population failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Main execution
if (require.main === module) {
  console.log('🏗️ Construction Suppliers Database Population Script');
  console.log('===================================================\n');
  
  populateDatabase()
    .then(() => {
      console.log('\n✅ Script completed successfully!');
      console.log('💡 You can now test the supplier management system with real data.');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Script failed:', error);
      process.exit(1);
    });
}

module.exports = { populateDatabase };