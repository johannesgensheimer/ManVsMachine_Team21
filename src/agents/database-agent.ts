import OpenAI from 'openai';
import { allFunctions, toolFunctions } from '../tools';
import { z } from 'zod';

// Create the system prompt for the agent
const SYSTEM_PROMPT = `You are a helpful AI assistant specialized in managing supplier relationships and database operations.

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
- **For deletions**: When asked to delete a supplier by name, first search for the supplier to get its ID, then proceed with the deletion using delete_supplier. Only ask for confirmation if the request is unclear or ambiguous

Remember: You're helping manage business relationships, so focus on actionable insights and maintaining data quality.

Available tools:
- get_supplier_overview: Get complete supplier information including contacts, recent interactions, and notes
- search_suppliers: Search for suppliers using various filters like name, domain, status, tier, or creation date
- update_supplier_status: Update a supplier's status or tier for managing supplier relationships
- create_supplier: Create a new supplier record with basic information
- delete_supplier: Delete a supplier and all related data (contacts, interactions, notes). Use with extreme caution as this action cannot be undone
- manage_contact: Create, update, or retrieve contact information for suppliers (all CRUD operations)
- search_contacts: Search for contacts across all suppliers using name, email, title, or supplier information
- log_interaction: Record a new interaction with a supplier or specific contact
- get_interaction_history: Retrieve interaction history with advanced filtering options
- analyze_sentiment_trends: Analyze sentiment trends over time for suppliers or specific contacts
- add_note: Add a note to a supplier record for recording important information
- get_notes: Retrieve notes for a supplier with optional search and filtering capabilities
- search_notes: Search notes across all suppliers for information that spans multiple relationships
- manage_note: Update or delete an existing note (use with caution for delete operations)

When using tools, always provide complete and accurate parameters. If you need clarification on any parameters, ask the user for more information.`;

// Create and configure the database agent
export class DatabaseAgent {
  private openai: OpenAI;
  private maxIterations: number = 10;

  constructor(openaiApiKey?: string, private options: {
    temperature?: number;
    model?: string;
    maxTokens?: number;
    verbose?: boolean;
  } = {}) {
    // Initialize the OpenAI client
    this.openai = new OpenAI({
      apiKey: openaiApiKey || process.env.OPENAI_API_KEY,
    });
  }

  // Initialize the agent (must be called before using)
  async initialize() {
    // Test the connection
    try {
      await this.openai.models.list();
      if (this.options.verbose) {
        console.log('✅ OpenAI connection established');
      }
    } catch (error) {
      throw new Error(`Failed to initialize OpenAI client: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Main method to interact with the agent
  async query(input: string, chatHistory: string[] = []): Promise<{
    output: string;
    intermediateSteps?: any[];
    error?: string;
  }> {
    try {
      const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
        { role: 'system', content: SYSTEM_PROMPT }
      ];

      // Add chat history
      if (chatHistory.length > 0) {
        messages.push({
          role: 'user',
          content: `Previous conversation context:\n${chatHistory.join('\n')}\n\nCurrent question: ${input}`
        });
      } else {
        messages.push({ role: 'user', content: input });
      }

      const intermediateSteps: any[] = [];
      let iteration = 0;

      while (iteration < this.maxIterations) {
        iteration++;

        if (this.options.verbose) {
          console.log(`🔄 Iteration ${iteration}: Calling OpenAI...`);
        }

        const response = await this.openai.chat.completions.create({
          model: this.options.model || 'gpt-4-turbo-preview',
          messages,
          functions: allFunctions,
          function_call: 'auto',
          temperature: this.options.temperature || 0.1,
          max_tokens: this.options.maxTokens || 2000,
        });

        const choice = response.choices[0];
        if (!choice.message) {
          throw new Error('No message in OpenAI response');
        }

        // Check if the model wants to call a function
        if (choice.message.function_call) {
          const functionCall = choice.message.function_call;
          const functionName = functionCall.name;
          
          if (this.options.verbose) {
            console.log(`🔧 Calling function: ${functionName}`);
            console.log(`📋 Arguments: ${functionCall.arguments}`);
          }

          // Add the assistant's function call to messages
          messages.push({
            role: 'assistant',
            content: null,
            function_call: functionCall
          });

          try {
            // Parse function arguments
            let functionArgs;
            try {
              functionArgs = JSON.parse(functionCall.arguments || '{}');
            } catch (parseError) {
              throw new Error(`Invalid JSON in function arguments: ${functionCall.arguments}`);
            }

            // Execute the function
            const toolFunction = toolFunctions[functionName as keyof typeof toolFunctions];
            if (!toolFunction) {
              throw new Error(`Unknown function: ${functionName}`);
            }

            const functionResult = await toolFunction(functionArgs);
            
            if (this.options.verbose) {
              console.log(`✅ Function result: ${functionResult.substring(0, 200)}...`);
            }

            // Add the function result to messages
            messages.push({
              role: 'function',
              name: functionName,
              content: functionResult
            });

            // Record the intermediate step
            intermediateSteps.push({
              action: {
                tool: functionName,
                toolInput: functionArgs
              },
              observation: functionResult
            });

          } catch (functionError) {
            const errorMessage = `Error executing ${functionName}: ${functionError instanceof Error ? functionError.message : 'Unknown error'}`;
            
            if (this.options.verbose) {
              console.error(`❌ Function error: ${errorMessage}`);
            }

            // Add error to messages so the model can handle it
            messages.push({
              role: 'function',
              name: functionName,
              content: JSON.stringify({ error: errorMessage })
            });

            intermediateSteps.push({
              action: {
                tool: functionName,
                toolInput: functionCall.arguments
              },
              observation: errorMessage
            });
          }

        } else {
          // No function call, return the final response
          const finalResponse = choice.message.content || 'I apologize, but I was unable to generate a response.';
          
          if (this.options.verbose) {
            console.log(`✨ Final response: ${finalResponse.substring(0, 200)}...`);
          }

          return {
            output: finalResponse,
            intermediateSteps
          };
        }
      }

      // If we reach max iterations without a final response
      return {
        output: 'I apologize, but I reached the maximum number of processing steps without completing your request. Please try rephrasing your question or breaking it into smaller parts.',
        intermediateSteps,
        error: 'Max iterations reached'
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
    return allFunctions.map(func => ({
      name: func.name,
      description: func.description
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