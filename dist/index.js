"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseAgent = exports.SupplierManagementApp = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const database_agent_1 = require("./agents/database-agent");
const database_1 = require("./config/database");
// Load environment variables
dotenv_1.default.config();
// Main application class
class SupplierManagementApp {
    constructor() {
        this.agent = new database_agent_1.DatabaseAgent(process.env.OPENAI_API_KEY, {
            temperature: 0.1,
            verbose: process.env.DEBUG === 'true'
        });
    }
    // Initialize the application
    async initialize() {
        console.log('🚀 Initializing Supplier Management App...');
        try {
            // Initialize the agent first
            console.log('🤖 Initializing LangChain agent...');
            await this.agent.initialize();
            // Test database connection
            console.log('📊 Testing database connection...');
            const dbTest = await this.agent.testConnection();
            if (dbTest.success) {
                console.log('✅ Database connection successful');
            }
            else {
                console.log('❌ Database connection failed:', dbTest.error);
                throw new Error('Database connection failed');
            }
            console.log('🤖 LangChain agent initialized with tools:');
            const tools = this.agent.getAvailableTools();
            tools.forEach(tool => {
                console.log(`  - ${tool.name}: ${tool.description}`);
            });
            console.log('\n✨ App ready! You can now interact with the supplier database using natural language.');
            return true;
        }
        catch (error) {
            console.error('❌ Initialization failed:', error);
            return false;
        }
    }
    // Main query method
    async query(input, chatHistory = []) {
        return this.agent.query(input, chatHistory);
    }
    // Convenience methods
    async getSupplierOverview(supplierIdOrDomain) {
        return this.agent.getSupplierInfo(supplierIdOrDomain);
    }
    async logInteraction(supplierId, summary, channel, sentiment, contactId) {
        return this.agent.logInteraction(supplierId, summary, channel, sentiment, contactId);
    }
    async searchSuppliers(criteria) {
        return this.agent.searchSuppliers(criteria);
    }
    async addNote(supplierId, note, authorId = 'system') {
        return this.agent.addNote(supplierId, note, authorId);
    }
    async analyzeSentimentTrends(supplierId, days = 90) {
        return this.agent.analyzeSentiment(supplierId, days);
    }
    // Cleanup method
    async cleanup() {
        await database_1.prisma.$disconnect();
        console.log('🔌 Database connection closed');
    }
}
exports.SupplierManagementApp = SupplierManagementApp;
// Export the main class and agent for use in other modules
var database_agent_2 = require("./agents/database-agent");
Object.defineProperty(exports, "DatabaseAgent", { enumerable: true, get: function () { return database_agent_2.DatabaseAgent; } });
__exportStar(require("./tools"), exports);
__exportStar(require("./types/database"), exports);
// If this file is run directly, start an interactive demo
if (require.main === module) {
    async function runDemo() {
        const app = new SupplierManagementApp();
        const initialized = await app.initialize();
        if (!initialized) {
            process.exit(1);
        }
        console.log('\n' + '='.repeat(60));
        console.log('🎯 DEMO: Supplier Management with LangChain');
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
        }
        catch (error) {
            console.error('❌ Demo error:', error);
        }
        finally {
            await app.cleanup();
        }
    }
    runDemo().catch(console.error);
}
//# sourceMappingURL=index.js.map