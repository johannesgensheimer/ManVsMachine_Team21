/**
 * Interactive demo script
 * Allows you to type queries and see responses in real-time
 */

const readline = require('readline');
const { SupplierManagementApp } = require('./dist/index');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function interactiveDemo() {
  console.log('🚀 Starting Interactive Supplier Management Demo');
  console.log('=' .repeat(60));
  
  const app = new SupplierManagementApp();
  
  const initialized = await app.initialize();
  if (!initialized) {
    console.log('❌ Failed to initialize. Check your configuration.');
    process.exit(1);
  }

  console.log('\n💡 Try these example queries:');
  console.log('- "Search for all suppliers"');
  console.log('- "Create a new supplier called Acme Corp with domain acme.com"');
  console.log('- "Add a contact named John Doe with email john@acme.com to Acme Corp"');
  console.log('- "Log a positive email interaction with Acme Corp about new partnership"');
  console.log('- "Show me sentiment trends for the last 30 days"');
  console.log('- Type "help" for more examples');
  console.log('- Type "exit" to quit\n');

  const chatHistory = [];

  function askQuestion() {
    rl.question('🤔 Your query: ', async (input) => {
      if (input.toLowerCase() === 'exit') {
        console.log('\n👋 Goodbye!');
        await app.cleanup();
        rl.close();
        return;
      }

      if (input.toLowerCase() === 'help') {
        showHelp();
        askQuestion();
        return;
      }

      if (input.trim() === '') {
        askQuestion();
        return;
      }

      try {
        console.log('\n🤖 Processing...');
        const result = await app.query(input, chatHistory);
        
        console.log('\n📋 Response:');
        console.log('-'.repeat(40));
        console.log(result.output);
        
        if (result.error) {
          console.log('\n❌ Error:', result.error);
        }
        
        // Add to chat history
        chatHistory.push(`Human: ${input}`);
        chatHistory.push(`Assistant: ${result.output}`);
        
        // Keep only last 10 exchanges
        if (chatHistory.length > 20) {
          chatHistory.splice(0, 4);
        }
        
        console.log('\n' + '='.repeat(60));
        
      } catch (error) {
        console.error('\n❌ Error:', error.message);
      }
      
      askQuestion();
    });
  }

  function showHelp() {
    console.log('\n📚 Example Queries:');
    console.log('\n🏢 Supplier Management:');
    console.log('- "Show me all gold tier suppliers"');
    console.log('- "Create supplier TechStart with domain techstart.io"');
    console.log('- "Update TechStart status to active"');
    console.log('- "Find suppliers created in the last 30 days"');
    
    console.log('\n👤 Contact Management:');
    console.log('- "Add Sarah Johnson as CEO at TechStart with email sarah@techstart.io"');
    console.log('- "Find all contacts with CTO in their title"');
    console.log('- "Show contacts for TechStart"');
    
    console.log('\n💬 Interaction Tracking:');
    console.log('- "Log a positive meeting with TechStart about Q4 planning"');
    console.log('- "Show interaction history for TechStart"');
    console.log('- "Find all negative interactions from last week"');
    console.log('- "Analyze sentiment trends for TechStart over 60 days"');
    
    console.log('\n📝 Notes:');
    console.log('- "Add note to TechStart: They are interested in enterprise package"');
    console.log('- "Search notes for contract"');
    console.log('- "Show recent notes for TechStart"');
    
    console.log('\n🔍 Complex Queries:');
    console.log('- "Show gold suppliers with negative sentiment in last 30 days"');
    console.log('- "Find suppliers we haven\'t contacted in 2 weeks"');
    console.log('- "Get complete overview of TechStart including everything"');
    console.log();
  }

  askQuestion();
}

interactiveDemo().catch(console.error);
