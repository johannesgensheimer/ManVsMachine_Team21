"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseCaseExamples = void 0;
const index_1 = require("../index");
/**
 * Example usage patterns for the Supplier Management System
 * These examples show how to use the LangChain-powered database tools
 */
async function runExamples() {
    const app = new index_1.SupplierManagementApp();
    console.log('🚀 Starting Supplier Management Examples...\n');
    // Initialize the app
    const initialized = await app.initialize();
    if (!initialized) {
        console.error('Failed to initialize app');
        return;
    }
    try {
        // Example 1: Basic supplier search
        console.log('📋 Example 1: Search for suppliers');
        console.log('='.repeat(50));
        let result = await app.query('Find all suppliers with status "active" and show their contact counts');
        console.log('Query: Find all suppliers with status "active"');
        console.log('Response:', result.output);
        console.log('\n');
        // Example 2: Get detailed supplier overview
        console.log('📊 Example 2: Get supplier overview');
        console.log('='.repeat(50));
        result = await app.query('Get complete information for any supplier, including recent interactions and notes');
        console.log('Query: Get complete supplier information');
        console.log('Response:', result.output);
        console.log('\n');
        // Example 3: Create a new supplier
        console.log('🏢 Example 3: Create new supplier');
        console.log('='.repeat(50));
        result = await app.query('Create a new supplier called "TechCorp Solutions" with domain "techcorp.com", set status to "pending" and tier to "silver"');
        console.log('Query: Create new supplier');
        console.log('Response:', result.output);
        console.log('\n');
        // Example 4: Add a contact
        console.log('👤 Example 4: Add contact to supplier');
        console.log('='.repeat(50));
        result = await app.query('Add a contact named John Smith with email john@techcorp.com and title "CTO" to TechCorp Solutions');
        console.log('Query: Add contact');
        console.log('Response:', result.output);
        console.log('\n');
        // Example 5: Log an interaction
        console.log('💬 Example 5: Log interaction');
        console.log('='.repeat(50));
        result = await app.query('Log a positive email interaction with TechCorp Solutions. Summary: "Discussed partnership opportunities and pricing. Very interested in our services."');
        console.log('Query: Log interaction');
        console.log('Response:', result.output);
        console.log('\n');
        // Example 6: Add a note
        console.log('📝 Example 6: Add note');
        console.log('='.repeat(50));
        result = await app.query('Add a note to TechCorp Solutions: "High potential client. Decision maker is John Smith. Follow up in 2 weeks."');
        console.log('Query: Add note');
        console.log('Response:', result.output);
        console.log('\n');
        // Example 7: Search contacts
        console.log('🔍 Example 7: Search contacts');
        console.log('='.repeat(50));
        result = await app.query('Find all contacts with "CTO" or "CEO" in their title');
        console.log('Query: Search contacts by title');
        console.log('Response:', result.output);
        console.log('\n');
        // Example 8: Analyze sentiment trends
        console.log('📈 Example 8: Sentiment analysis');
        console.log('='.repeat(50));
        result = await app.query('Analyze sentiment trends for all interactions in the last 60 days');
        console.log('Query: Analyze sentiment trends');
        console.log('Response:', result.output);
        console.log('\n');
        // Example 9: Complex query combining multiple operations
        console.log('🎯 Example 9: Complex multi-step query');
        console.log('='.repeat(50));
        result = await app.query('Show me all gold tier suppliers, their recent interactions, and highlight any with negative sentiment in the last 30 days');
        console.log('Query: Complex analysis');
        console.log('Response:', result.output);
        console.log('\n');
        // Example 10: Update supplier status
        console.log('⚡ Example 10: Update supplier status');
        console.log('='.repeat(50));
        result = await app.query('Update TechCorp Solutions status to "active" and tier to "gold" because they signed a contract');
        console.log('Query: Update supplier');
        console.log('Response:', result.output);
        console.log('\n');
    }
    catch (error) {
        console.error('❌ Example error:', error);
    }
    finally {
        await app.cleanup();
        console.log('✅ Examples completed!');
    }
}
// Specific use case examples
class UseCaseExamples {
    constructor() {
        this.app = new index_1.SupplierManagementApp();
    }
    async initialize() {
        return this.app.initialize();
    }
    // Use case: Onboarding a new supplier
    async onboardNewSupplier(name, domain, contactName, contactEmail, contactTitle) {
        console.log(`🎯 Onboarding new supplier: ${name}`);
        // Step 1: Create supplier
        let result = await this.app.query(`Create a new supplier called "${name}" with domain "${domain}"`);
        console.log('✅ Supplier created:', result.output);
        // Step 2: Add primary contact
        result = await this.app.query(`Add a contact named ${contactName} with email ${contactEmail} and title "${contactTitle}" to ${name}`);
        console.log('✅ Contact added:', result.output);
        // Step 3: Add initial note
        result = await this.app.query(`Add a note to ${name}: "New supplier onboarded. Primary contact: ${contactName} (${contactTitle})"`);
        console.log('✅ Note added:', result.output);
        return result;
    }
    // Use case: Weekly relationship review
    async weeklyRelationshipReview() {
        console.log('📊 Weekly Relationship Review');
        // Get all active suppliers
        let result = await this.app.query('Show me all active suppliers with their interaction counts from the last 7 days');
        console.log('Active suppliers:', result.output);
        // Check for negative sentiment
        result = await this.app.query('Find any interactions with negative sentiment from the last 7 days');
        console.log('Negative sentiment alerts:', result.output);
        // Identify suppliers without recent contact
        result = await this.app.query('Find suppliers that haven\'t had any interactions in the last 14 days');
        console.log('Suppliers needing follow-up:', result.output);
        return result;
    }
    // Use case: Preparing for a supplier meeting
    async prepareForMeeting(supplierName) {
        console.log(`📋 Preparing for meeting with ${supplierName}`);
        const result = await this.app.query(`Get complete overview for ${supplierName} including all contacts, recent interactions, notes, and sentiment analysis for the last 90 days`);
        console.log('Meeting preparation data:', result.output);
        return result;
    }
    async cleanup() {
        await this.app.cleanup();
    }
}
exports.UseCaseExamples = UseCaseExamples;
// Run examples if this file is executed directly
if (require.main === module) {
    runExamples().catch(console.error);
}
//# sourceMappingURL=usage-examples.js.map