/**
 * Test the LLM input and output directly
 * This shows exactly what's being sent to OpenAI and what comes back
 */

// Set environment variables
process.env.DATABASE_URL = "postgresql://publicuser:Hackathon123!@34.55.216.61:5432/hackathon";
process.env.DEBUG = "true";

const { ChatOpenAI } = require('@langchain/openai');
const { PromptTemplate } = require('@langchain/core/prompts');

async function testLLMInput() {
  console.log('🧪 Testing LLM Input/Output...\n');
  
  // Create the same LLM as the agent uses
  const llm = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0.1,
    modelName: 'gpt-4-turbo-preview',
    maxTokens: 2000,
  });

  // Create the same prompt template as the agent
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

get_supplier_overview: Get complete supplier information including contacts, recent interactions, and notes. Use supplier ID or domain to find the supplier.
search_suppliers: Search for suppliers using various filters like name, domain, status, tier, or creation date.
update_supplier_status: Update a supplier's status or tier. Useful for managing supplier relationships.
create_supplier: Create a new supplier record with basic information.
manage_contact: Create, update, or retrieve contact information for suppliers. Can handle all contact CRUD operations.
search_contacts: Search for contacts across all suppliers using name, email, title, or supplier information.
log_interaction: Record a new interaction with a supplier or specific contact. Automatically updates supplier status if needed.
get_interaction_history: Retrieve interaction history with advanced filtering options. Great for analyzing communication patterns.
analyze_sentiment_trends: Analyze sentiment trends over time for suppliers or specific contacts. Useful for relationship health monitoring.
add_note: Add a note to a supplier record. Useful for recording important information, decisions, or observations.
get_notes: Retrieve notes for a supplier with optional search and filtering capabilities.
search_notes: Search notes across all suppliers. Useful for finding information that spans multiple supplier relationships.
manage_note: Update or delete an existing note. Use with caution for delete operations.

To use a tool, please use the following format:

\`\`\`
Thought: Do I need to use a tool? Yes
Action: the action to take, should be one of [get_supplier_overview, search_suppliers, update_supplier_status, create_supplier, manage_contact, search_contacts, log_interaction, get_interaction_history, analyze_sentiment_trends, add_note, get_notes, search_notes, manage_note]
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

  try {
    // Test different queries
    const testQueries = [
      'Search for any suppliers, limit to 3 results',
      'Create a new supplier called "Test Corp" with domain "test.com"',
      'Find suppliers with status "active"'
    ];

    for (const query of testQueries) {
      console.log(`\n${'='.repeat(60)}`);
      console.log(`🤔 Testing Query: "${query}"`);
      console.log(`${'='.repeat(60)}`);
      
      // Format the prompt
      const formattedPrompt = await prompt.format({
        input: query,
        chat_history: '',
        agent_scratchpad: '',
        tools: 'get_supplier_overview, search_suppliers, update_supplier_status, create_supplier, manage_contact, search_contacts, log_interaction, get_interaction_history, analyze_sentiment_trends, add_note, get_notes, search_notes, manage_note',
        tool_names: 'get_supplier_overview, search_suppliers, update_supplier_status, create_supplier, manage_contact, search_contacts, log_interaction, get_interaction_history, analyze_sentiment_trends, add_note, get_notes, search_notes, manage_note'
      });

      console.log('\n📤 PROMPT SENT TO LLM:');
      console.log('-'.repeat(40));
      console.log(formattedPrompt.substring(0, 500) + '...\n[TRUNCATED]\n');
      
      // Call the LLM
      console.log('🤖 Calling OpenAI...');
      const response = await llm.invoke(formattedPrompt);
      
      console.log('\n📥 LLM RESPONSE:');
      console.log('-'.repeat(40));
      console.log(response.content);
      
      // Try to parse the response
      console.log('\n🔍 PARSING ANALYSIS:');
      console.log('-'.repeat(40));
      
      const responseText = response.content;
      
      // Look for Action Input
      const actionInputMatch = responseText.match(/Action Input:\s*(.+?)(?:\n|$)/);
      if (actionInputMatch) {
        const actionInput = actionInputMatch[1].trim();
        console.log('Found Action Input:', actionInput);
        
        // Try to parse as JSON
        try {
          const parsed = JSON.parse(actionInput);
          console.log('✅ Valid JSON:', parsed);
        } catch (e) {
          console.log('❌ Invalid JSON:', e.message);
          console.log('Raw input:', JSON.stringify(actionInput));
          
          // Try to fix common issues
          let fixed = actionInput;
          
          // Remove quotes around the whole thing
          if (fixed.startsWith('"') && fixed.endsWith('"')) {
            fixed = fixed.slice(1, -1);
          }
          
          // Try to parse again
          try {
            const parsedFixed = JSON.parse(fixed);
            console.log('✅ Fixed JSON:', parsedFixed);
          } catch (e2) {
            console.log('❌ Still invalid after fix:', e2.message);
          }
        }
      } else {
        console.log('❌ No Action Input found in response');
      }
    }
    
  } catch (error) {
    console.error('❌ LLM test failed:', error.message);
    console.error('Stack:', error.stack);
  }
}

testLLMInput().catch(console.error);
