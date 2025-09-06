import dotenv from 'dotenv';
import { DatabaseAgent } from './agents/database-agent';
import { prisma } from './config/database';

// Load environment variables
dotenv.config();

// Main application class
export class SupplierManagementApp {
  private agent: DatabaseAgent;

  constructor() {
    this.agent = new DatabaseAgent(process.env.OPENAI_API_KEY, {
      temperature: 0.1,
      verbose: process.env.DEBUG === 'true'
    });
  }

  // Initialize the application
  async initialize() {
    console.log('🚀 Initializing Supplier Management App...');
    
    try {
      // Initialize the agent first
      console.log('🤖 Initializing OpenAI agent...');
      await this.agent.initialize();
      
      // Test database connection
      console.log('📊 Testing database connection...');
      const dbTest = await this.agent.testConnection();
      
      if (dbTest.success) {
        console.log('✅ Database connection successful');
      } else {
        console.log('❌ Database connection failed:', dbTest.error);
        throw new Error('Database connection failed');
      }

      console.log('🤖 OpenAI agent initialized with tools:');
      const tools = this.agent.getAvailableTools();
      tools.forEach(tool => {
        console.log(`  - ${tool.name}: ${tool.description}`);
      });

      console.log('\n✨ App ready! You can now interact with the supplier database using natural language.');
      return true;
    } catch (error) {
      console.error('❌ Initialization failed:', error);
      return false;
    }
  }

  // Main query method
  async query(input: string, chatHistory: string[] = []) {
    return this.agent.query(input, chatHistory);
  }

  // Convenience methods
  async getSupplierOverview(supplierIdOrDomain: number | string) {
    return this.agent.getSupplierInfo(supplierIdOrDomain);
  }

  async logInteraction(supplierId: number, summary: string, channel: string, sentiment: 'positive' | 'neutral' | 'negative', contactId?: number) {
    return this.agent.logInteraction(supplierId, summary, channel, sentiment, contactId);
  }

  async searchSuppliers(criteria: string) {
    return this.agent.searchSuppliers(criteria);
  }

  async addNote(supplierId: number, note: string, authorId: string = 'system') {
    return this.agent.addNote(supplierId, note, authorId);
  }

  async analyzeSentimentTrends(supplierId: number, days: number = 90) {
    return this.agent.analyzeSentiment(supplierId, days);
  }

  // Get available tools information
  getAvailableTools() {
    return this.agent.getAvailableTools();
  }

  // Cleanup method
  async cleanup() {
    await prisma.$disconnect();
    console.log('🔌 Database connection closed');
  }
}

// Export the main class and agent for use in other modules
export { DatabaseAgent } from './agents/database-agent';
export * from './tools';
export * from './types/database';

// If this file is run directly, start an interactive demo
if (require.main === module) {
  async function runDemo() {
    const app = new SupplierManagementApp();
    
    const initialized = await app.initialize();
    if (!initialized) {
      process.exit(1);
    }

    console.log('\n' + '='.repeat(60));
    console.log('🎯 DEMO: Supplier Management with OpenAI');
    console.log('='.repeat(60));

    try {
      // Demo queries
      const demoQueries = [
        'Search for all suppliers and show me a summary',
        'What suppliers do we have in the gold tier?',
        'Show me recent interactions from the last 30 days',
        'Create a new supplier called "Demo Corp" with domain "demo.com"'
      ];

      for (const query of demoQueries) {
        console.log(`\n🤔 Query: "${query}"`);
        console.log('🤖 Response:');
        
        const result = await app.query(query);
        console.log(result.output);
        
        if (result.error) {
          console.log('❌ Error:', result.error);
        }
        
        console.log('\n' + '-'.repeat(40));
      }

    } catch (error) {
      console.error('❌ Demo error:', error);
    } finally {
      await app.cleanup();
    }
  }

  runDemo().catch(console.error);
}
