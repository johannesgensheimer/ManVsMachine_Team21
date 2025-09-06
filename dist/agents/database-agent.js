"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseAgent = void 0;
const openai_1 = require("@langchain/openai");
const agents_1 = require("langchain/agents");
const prompts_1 = require("@langchain/core/prompts");
const tools_1 = require("../tools");
// Create the ReAct prompt template
const prompt = prompts_1.PromptTemplate.fromTemplate(`You are a helpful AI assistant specialized in managing supplier relationships and database operations.

You have access to a comprehensive set of tools for managing:
- Suppliers (companies you work with)
- Contacts (people at those companies)  
- Interactions (communications and meetings)
- Notes (important information and observations)

Key capabilities:
1. **Supplier Management**: Search, create, update supplier information and status
2. **Contact Management**: Manage contact details, find contacts across suppliers
3. **Interaction Tracking**: Log communications, analyze sentiment trends, track relationship health
4. **Note Taking**: Add, search, and manage notes across all supplier relationships

Guidelines:
- Always provide comprehensive information when requested
- When logging interactions, consider updating supplier status if it indicates active engagement
- Use sentiment analysis to help track relationship health
- Be proactive in suggesting related information that might be useful
- When creating records, validate that required information is provided
- For searches, use appropriate filters to get the most relevant results

Remember: You're helping manage business relationships, so focus on actionable insights and maintaining data quality.

TOOLS:
------
You have access to the following tools:

{tools}

To use a tool, please use the following format:

\`\`\`
Thought: Do I need to use a tool? Yes
Action: the action to take, should be one of [{tool_names}]
Action Input: the input to the action
Observation: the result of the action
\`\`\`

When you have a response to say to the Human, or if you do not need to use a tool, you MUST use the format:

\`\`\`
Thought: Do I need to use a tool? No
Final Answer: [your response here]
\`\`\`

Begin!

Previous conversation history:
{chat_history}

Question: {input}
Thought: {agent_scratchpad}`);
// Create and configure the database agent
class DatabaseAgent {
    constructor(openaiApiKey, options = {}) {
        this.options = options;
        // Initialize the LLM
        this.llm = new openai_1.ChatOpenAI({
            openAIApiKey: openaiApiKey || process.env.OPENAI_API_KEY,
            temperature: options.temperature || 0.1,
            modelName: options.model || 'gpt-4-turbo-preview',
            maxTokens: options.maxTokens || 2000,
        });
    }
    // Initialize the agent (must be called before using)
    async initialize() {
        await this.initializeAgent(this.options.verbose || false);
    }
    async initializeAgent(verbose = false) {
        const reactAgent = await (0, agents_1.createReactAgent)({
            llm: this.llm,
            tools: tools_1.allTools,
            prompt
        });
        this.agent = new agents_1.AgentExecutor({
            agent: reactAgent,
            tools: tools_1.allTools,
            verbose,
            maxIterations: 10,
            returnIntermediateSteps: true
        });
    }
    // Main method to interact with the agent
    async query(input, chatHistory = []) {
        if (!this.agent) {
            return {
                output: 'Agent not initialized. Please call initialize() first.',
                error: 'Agent not initialized'
            };
        }
        try {
            const result = await this.agent.invoke({
                input,
                chat_history: chatHistory.join('\n')
            });
            return {
                output: result.output,
                intermediateSteps: result.intermediateSteps
            };
        }
        catch (error) {
            console.error('Agent query error:', error);
            return {
                output: 'I encountered an error while processing your request. Please try again or rephrase your question.',
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    }
    // Convenience methods for common operations
    async getSupplierInfo(supplierIdOrDomain) {
        const query = typeof supplierIdOrDomain === 'number'
            ? `Get complete information for supplier ID ${supplierIdOrDomain}`
            : `Get complete information for supplier with domain ${supplierIdOrDomain}`;
        return this.query(query);
    }
    async logInteraction(supplierId, summary, channel, sentiment, contactId) {
        const contactPart = contactId ? ` with contact ID ${contactId}` : '';
        const query = `Log a ${sentiment} ${channel} interaction for supplier ID ${supplierId}${contactPart}. Summary: ${summary}`;
        return this.query(query);
    }
    async searchSuppliers(criteria) {
        return this.query(`Search for suppliers: ${criteria}`);
    }
    async addNote(supplierId, note, authorId = 'system') {
        return this.query(`Add a note to supplier ID ${supplierId} from ${authorId}: ${note}`);
    }
    async analyzeSentiment(supplierId, days = 90) {
        return this.query(`Analyze sentiment trends for supplier ID ${supplierId} over the last ${days} days`);
    }
    // Method to get available tools information
    getAvailableTools() {
        return tools_1.allTools.map(tool => ({
            name: tool.name,
            description: tool.description
        }));
    }
    // Method to test database connection
    async testConnection() {
        try {
            const result = await this.query('Search for any suppliers, limit to 1 result');
            return {
                success: true,
                message: 'Database connection successful',
                result: result.output
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Database connection failed',
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    }
}
exports.DatabaseAgent = DatabaseAgent;
//# sourceMappingURL=database-agent.js.map