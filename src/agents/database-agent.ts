import { ChatOpenAI } from '@langchain/openai';
import { AgentExecutor, createReactAgent } from 'langchain/agents';
import { ChatPromptTemplate, PromptTemplate } from '@langchain/core/prompts';
import { allTools } from '../tools';

// Create the ReAct prompt template
const prompt = PromptTemplate.fromTemplate(`You are a helpful AI assistant specialized in managing supplier relationships and database operations.

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
Action Input: the input to the action as valid JSON with quoted keys and values
Observation: the result of the action
\`\`\`

CRITICAL: Action Input MUST be valid JSON with properly quoted keys and ALL string values in quotes. 
ALWAYS use double quotes for keys and string values. Numbers can be unquoted.

Examples:
- CORRECT: {{"status": "active", "limit": 10}}
- CORRECT: {{"supplierId": 1, "firstName": "John", "lastName": "Smith"}}
- WRONG: {{status: active, limit: 10}}
- WRONG: {{'status': 'active'}}

If you make a JSON syntax error, the tool will fail. Double-check your JSON format!

For contact management (manage_contact):
- Create: {{"action": "create", "supplierId": 1, "firstName": "John", "lastName": "Smith", "email": "john@example.com", "title": "CEO"}}
- Update: {{"action": "update", "contactId": 1, "title": "New Title"}}
- Get: {{"action": "get", "contactId": 1}}

For interactions:
- Log (log_interaction): {{"supplierId": 1, "channel": "meeting", "summary": "Discussed partnership", "sentiment": "positive"}}
- Analyze trends (analyze_sentiment_trends): {{"supplierId": 1, "days": 30, "groupBy": "week"}}
- Get history (get_interaction_history): {{"supplierId": 1, "days": 30}}

For supplier operations:
- Search (search_suppliers): {{"status": "active", "tier": "gold"}}
- Create (create_supplier): {{"name": "Company Name", "domain": "company.com", "status": "active", "tier": "silver"}}
- Get overview (get_supplier_overview): {{"supplierId": 1}}
- Update status (update_supplier_status): {{"supplierId": 1, "status": "active", "tier": "gold"}}

For notes:
- Add (add_note): {{"supplierId": 1, "body": "Important note text", "authorId": "user123"}}
- Search (search_notes): {{"query": "contract", "supplierId": 1}}

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
export class DatabaseAgent {
  private agent!: AgentExecutor;
  private llm: ChatOpenAI;

  constructor(openaiApiKey?: string, private options: {
    temperature?: number;
    model?: string;
    maxTokens?: number;
    verbose?: boolean;
  } = {}) {
    // Initialize the LLM
    this.llm = new ChatOpenAI({
      openAIApiKey: openaiApiKey || process.env.OPENAI_API_KEY,
      temperature: options.temperature || 0.0, // Lower temperature for more consistent JSON formatting
      modelName: options.model || 'gpt-4-turbo-preview',
      maxTokens: options.maxTokens || 2000,
      stop: ['\nObservation:'], // Ensure proper stopping
    });
  }

  // Initialize the agent (must be called before using)
  async initialize() {
    await this.initializeAgent(this.options.verbose || false);
  }

  private async initializeAgent(verbose: boolean = false) {
    const reactAgent = await createReactAgent({
      llm: this.llm,
      tools: allTools,
      prompt
    });

    this.agent = new AgentExecutor({
      agent: reactAgent,
      tools: allTools,
      verbose,
      maxIterations: 10,
      returnIntermediateSteps: true,
      handleParsingErrors: (error: Error) => {
        console.warn('Parsing error occurred:', error.message);
        return 'I encountered a formatting error. Let me try again with proper JSON formatting.';
      }
    });
  }

  // Main method to interact with the agent
  async query(input: string, chatHistory: string[] = []): Promise<{
    output: string;
    intermediateSteps?: any[];
    error?: string;
  }> {
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
    } catch (error) {
      console.error('Agent query error:', error);
      return {
        output: 'I encountered an error while processing your request. Please try again or rephrase your question.',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Convenience methods for common operations
  async getSupplierInfo(supplierIdOrDomain: number | string) {
    const query = typeof supplierIdOrDomain === 'number' 
      ? `Get complete information for supplier ID ${supplierIdOrDomain}`
      : `Get complete information for supplier with domain ${supplierIdOrDomain}`;
    
    return this.query(query);
  }

  async logInteraction(supplierId: number, summary: string, channel: string, sentiment: 'positive' | 'neutral' | 'negative', contactId?: number) {
    const contactPart = contactId ? ` with contact ID ${contactId}` : '';
    const query = `Log a ${sentiment} ${channel} interaction for supplier ID ${supplierId}${contactPart}. Summary: ${summary}`;
    
    return this.query(query);
  }

  async searchSuppliers(criteria: string) {
    return this.query(`Search for suppliers: ${criteria}`);
  }

  async addNote(supplierId: number, note: string, authorId: string = 'system') {
    return this.query(`Add a note to supplier ID ${supplierId} from ${authorId}: ${note}`);
  }

  async analyzeSentiment(supplierId: number, days: number = 90) {
    return this.query(`Analyze sentiment trends for supplier ID ${supplierId} over the last ${days} days`);
  }

  // Method to get available tools information
  getAvailableTools() {
    return allTools.map(tool => ({
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
    } catch (error) {
      return {
        success: false,
        message: 'Database connection failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}
