<<<<<<< HEAD
# Supplier Management System with LangChain

A powerful Node.js application that combines LangChain AI agents with PostgreSQL to manage supplier relationships through natural language interactions.

## 🚀 Features

- **Natural Language Database Queries**: Use plain English to interact with your supplier database
- **Comprehensive Supplier Management**: Track suppliers, contacts, interactions, and notes
- **Sentiment Analysis**: Monitor relationship health through interaction sentiment tracking
- **LangChain Integration**: Powered by OpenAI GPT models with custom database tools
- **TypeScript Support**: Full type safety with Prisma ORM
- **Business-Focused Tools**: 12 specialized tools for supplier relationship management

## 🛠 Tech Stack

- **Node.js** + **TypeScript**
- **LangChain** for AI agent orchestration
- **Prisma** ORM for database management
- **PostgreSQL** (Google Cloud SQL)
- **OpenAI GPT-4** for natural language processing

## 📊 Database Schema

The system manages four core entities:

- **Suppliers**: Companies you work with (name, domain, status, tier)
- **Contacts**: People at supplier companies (name, email, phone, LinkedIn)
- **Interactions**: Communications and meetings (channel, summary, sentiment)
- **Notes**: Important observations and decisions

## 🔧 Setup

### 1. Install Dependencies

=======
# ManVsMachine Team21 - Slack Bot

A Node.js Slack bot using Socket Mode for real-time communication.

## Setup Instructions

### 1. Install Dependencies
>>>>>>> slack-bot-foundation
```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file based on `env.example`:

```env
# Database Configuration
DATABASE_URL="postgresql://publicuser:Hackathon123!@YOUR_CLOUD_SQL_IP:5432/hackathon"

# OpenAI Configuration
OPENAI_API_KEY="your-openai-api-key-here"

# Optional: For debugging
DEBUG=true
```

### 3. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database (creates tables)
npm run db:push

# Optional: Open Prisma Studio to view data
npm run db:studio
```

### 4. Build and Run

```bash
# Development mode
npm run dev

# Build for production
npm run build
npm start
```

## 🤖 Available Tools

The system includes 12 specialized LangChain tools:

### Supplier Tools
- `get_supplier_overview` - Complete supplier info with relationships
- `search_suppliers` - Find suppliers with advanced filters
- `update_supplier_status` - Manage supplier status and tier
- `create_supplier` - Add new suppliers

### Contact Tools
- `manage_contact` - CRUD operations for contacts
- `search_contacts` - Find contacts across suppliers

### Interaction Tools
- `log_interaction` - Record communications
- `get_interaction_history` - Retrieve interaction data
- `analyze_sentiment_trends` - Track relationship health

### Note Tools
- `add_note` - Create supplier notes
- `get_notes` - Retrieve notes with search
- `search_notes` - Find notes across suppliers
- `manage_note` - Update/delete notes

## 💡 Usage Examples

### Basic Usage

```typescript
import { SupplierManagementApp } from './src';

const app = new SupplierManagementApp();
await app.initialize();

// Natural language queries
const result = await app.query('Find all gold tier suppliers with recent positive interactions');
console.log(result.output);
```

### Example Queries

```javascript
// Supplier management
"Create a new supplier called 'TechCorp' with domain 'techcorp.com'"
"Update TechCorp status to active and tier to gold"
"Show me all suppliers that haven't been contacted in 30 days"

// Contact management
"Add John Smith as CTO at TechCorp with email john@techcorp.com"
"Find all contacts with 'CEO' or 'CTO' in their title"

// Interaction tracking
"Log a positive email interaction with TechCorp about partnership opportunities"
"Show me sentiment trends for TechCorp over the last 90 days"
"Find all negative interactions from last week"

// Note management
"Add a note to TechCorp: 'High potential client, follow up next week'"
"Search all notes for mentions of 'contract negotiations'"
```

### Programmatic Usage

```typescript
// Direct method calls
await app.getSupplierOverview('techcorp.com');
await app.logInteraction(1, 'Great meeting about Q4 plans', 'meeting', 'positive');
await app.addNote(1, 'Contract signed!', 'user123');
await app.analyzeSentimentTrends(1, 90);
```

## 🎯 Use Cases

### 1. Supplier Onboarding
```typescript
const examples = new UseCaseExamples();
await examples.onboardNewSupplier(
  'NewCorp Inc',
  'newcorp.com',
  'Jane Doe',
  'jane@newcorp.com',
  'VP of Partnerships'
);
```

### 2. Weekly Relationship Review
```typescript
await examples.weeklyRelationshipReview();
// Automatically identifies:
// - Suppliers needing follow-up
// - Recent negative sentiment
// - Interaction volume trends
```

### 3. Meeting Preparation
```typescript
await examples.prepareForMeeting('TechCorp');
// Gets complete supplier context:
// - All contacts and their roles
// - Recent interaction history
// - Sentiment trends
// - Important notes
```

## 🔍 Advanced Features

### Sentiment Analysis
Track relationship health automatically:
- Positive/neutral/negative sentiment classification
- Trend analysis over time
- Alerts for negative patterns

### Multi-table Queries
Single queries can span multiple tables:
- "Show gold suppliers with recent negative interactions"
- "Find contacts at inactive suppliers who we haven't spoken to"

### Contextual Intelligence
The AI agent understands business context:
- Suggests related actions
- Maintains data consistency
- Provides actionable insights

## 🚀 Development

### Project Structure
```
src/
├── agents/          # LangChain agent configuration
├── tools/           # Database operation tools
├── config/          # Database and app configuration
├── types/           # TypeScript type definitions
└── examples/        # Usage examples and demos
```

### Adding New Tools
1. Create tool in appropriate `tools/` file
2. Export from `tools/index.ts`
3. Tool automatically available to agent

### Database Changes
1. Update `prisma/schema.prisma`
2. Run `npm run db:push`
3. Update TypeScript types in `src/types/`

## 📝 Scripts

- `npm run dev` - Development mode with hot reload
- `npm run build` - Build for production
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Create and run migrations
- `npm run db:studio` - Open Prisma Studio

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

---

**Built for Team21 Hackathon** 🏆
### 2. Configure Environment Variables
Copy `.env.example` to `.env` and fill in your Slack tokens:
```bash
cp .env.example .env
```

Edit `.env` with your tokens:
```
SLACK_BOT_TOKEN=xoxb-your-bot-token-here
SLACK_APP_TOKEN=xapp-your-app-token-here  
SLACK_SIGNING_SECRET=your-signing-secret-here
PORT=3000
```

### 3. Slack App Configuration

#### Required OAuth Scopes (Bot Token Scopes):
- `app_mentions:read` - Detect when bot is @mentioned
- `chat:write` - Send messages to channels
- `chat:write.public` - Send messages to public channels
- `channels:read` - Read channel information

#### Required Event Subscriptions:
Enable **Event Subscriptions** and subscribe to:
- `app_mention` - When someone @mentions your bot
- `message.channels` - Messages in public channels
- `message.groups` - Messages in private channels  
- `message.im` - Direct messages to bot

#### Socket Mode:
- Create **App-Level Token** with `connections:write` scope
- Enable **Socket Mode**

### 4. Run the Bot
```bash
npm start
```

### 5. Test in Slack
1. Invite bot to channel: `/invite @YourBotName`
2. Mention the bot: `@YourBotName hello`
3. Bot should respond with a greeting

## Features

- ✅ Socket Mode connection (no webhooks needed)
- ✅ Responds to @mentions
- ✅ Startup notification to specified channel
- ✅ Basic error handling and logging
- 🔄 Ready for LLM integration (TODO)
- 🔄 Ready for backend API integration (TODO)

## Backend Integration

### Connecting to Main Node.js Backend

The Slack bot is designed to interface with your main backend services. Here's how to integrate:

#### 1. API Client Setup
```javascript
// Add to server.js - HTTP client for backend API calls
const axios = require('axios');

const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: BACKEND_API_URL,
  headers: {
    'Authorization': `Bearer ${process.env.API_TOKEN}`,
    'Content-Type': 'application/json'
  }
});
```

#### 2. SQL Database Integration (GCP)
Your backend should handle database operations. Example API endpoints:

```javascript
// In your mention handler - call backend API
app.event('app_mention', async ({ event, say, logger }) => {
  try {
    // Call your backend API
    const response = await apiClient.post('/api/chat', {
      userId: event.user,
      message: event.text,
      channel: event.channel,
      timestamp: event.ts
    });

    await say({
      text: response.data.reply,
      channel: event.channel,
      thread_ts: event.ts
    });
  } catch (error) {
    logger.error('Backend API error:', error);
    await say('Sorry, I encountered an error processing your request.');
  }
});
```

#### 3. LangChain Integration
Your backend API should handle LangChain operations. Recommended structure:

**Backend API Endpoints:**
```
POST /api/chat           # Process user messages with LangChain
POST /api/embeddings     # Generate embeddings for queries
GET  /api/history/:user  # Get chat history from SQL database
POST /api/documents      # Store/index documents for RAG
```

**Example backend integration (add to server.js):**
```javascript
// LangChain processing via backend API
async function processWithLangChain(userMessage, userId, context = {}) {
  try {
    const response = await apiClient.post('/api/langchain/process', {
      message: userMessage,
      userId: userId,
      context: context,
      model: 'gpt-4', // or your preferred model
      temperature: 0.7
    });
    
    return response.data;
  } catch (error) {
    console.error('LangChain processing error:', error);
    throw error;
  }
}
```

#### 4. Database Schema (GCP SQL)
Your backend should implement these tables:

```sql
-- Chat history table
CREATE TABLE chat_messages (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(50) NOT NULL,
  channel_id VARCHAR(50) NOT NULL,
  message TEXT NOT NULL,
  bot_response TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  thread_ts VARCHAR(50)
);

-- Document embeddings for RAG
CREATE TABLE document_embeddings (
  id SERIAL PRIMARY KEY,
  document_name VARCHAR(255),
  chunk_text TEXT,
  embedding VECTOR(1536), -- OpenAI embedding size
  metadata JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User preferences/context
CREATE TABLE user_contexts (
  user_id VARCHAR(50) PRIMARY KEY,
  preferences JSONB,
  conversation_state JSONB,
  last_active TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 5. Environment Variables
Add to your `.env`:
```bash
# Backend API Configuration
BACKEND_API_URL=http://localhost:8000
API_TOKEN=your-backend-api-token

# Database Configuration (handled by backend)
# GCP_PROJECT_ID=your-project-id
# GCP_SQL_INSTANCE=your-sql-instance
# DB_PASSWORD=your-db-password

# LangChain Configuration (handled by backend)  
# OPENAI_API_KEY=your-openai-key
# LANGCHAIN_API_KEY=your-langchain-key
```

#### 6. Installation Dependencies
```bash
npm install axios  # For HTTP requests to backend
```

### Integration Architecture

```
Slack User → Slack Bot → Backend API → GCP SQL Database
                    ↓         ↓            ↓
              [server.js] → [Express API] → [LangChain + Embeddings]
                              ↓
                        [Document Processing]
```

**Responsibilities:**
- **Slack Bot (this repo):** Message handling, Slack API integration
- **Backend API (teammate):** LangChain processing, database operations, business logic
- **GCP SQL:** Persistent storage, embeddings, chat history

## API Input/Output Specifications

### 1. Chat Processing Endpoint
**`POST /api/chat`**

**Input (from Slack bot):**
```json
{
  "userId": "U1234567890",
  "message": "@bot help me analyze this document",
  "channel": "C9876543210",
  "timestamp": "1699123456.123456",
  "metadata": {
    "thread_ts": "1699123456.123456",
    "user_name": "john.doe",
    "channel_name": "general"
  }
}
```

**Output (to Slack bot):**
```json
{
  "reply": "I can help you analyze documents! Please upload the document or provide a link.",
  "confidence": 0.95,
  "processing_time_ms": 234,
  "context_used": true,
  "metadata": {
    "model_used": "gpt-4",
    "tokens_used": 45,
    "embedding_matches": 3
  }
}
```

### 2. LangChain Processing Endpoint  
**`POST /api/langchain/process`**

**Input:**
```json
{
  "message": "What are the key findings in our Q3 report?",
  "userId": "U1234567890",
  "context": {
    "conversation_history": ["Previous message 1", "Previous message 2"],
    "document_context": ["relevant_doc_id_1", "relevant_doc_id_2"]
  },
  "model": "gpt-4",
  "temperature": 0.7,
  "max_tokens": 500
}
```

**Output:**
```json
{
  "response": "Based on the Q3 report analysis, the key findings are: 1) Revenue increased by 15%...",
  "sources": [
    {
      "document_id": "doc_123",
      "document_name": "Q3_Financial_Report.pdf",
      "page": 3,
      "confidence": 0.89
    }
  ],
  "embedding_matches": [
    {
      "text": "Q3 revenue showed significant growth...",
      "similarity_score": 0.94,
      "metadata": {"section": "executive_summary"}
    }
  ],
  "processing_info": {
    "model_used": "gpt-4",
    "tokens_consumed": 1250,
    "processing_time_ms": 1800,
    "cost_estimate_usd": 0.0375
  }
}
```

### 3. Chat History Endpoint
**`GET /api/history/:userId`**

**Query Parameters:**
```
?limit=50&channel=C9876543210&from_date=2024-01-01&to_date=2024-01-31
```

**Output:**
```json
{
  "messages": [
    {
      "id": 1,
      "user_id": "U1234567890",
      "channel_id": "C9876543210", 
      "message": "Help me with the budget analysis",
      "bot_response": "I'll help you analyze the budget. What specific area?",
      "timestamp": "2024-01-15T10:30:00Z",
      "thread_ts": "1699123456.123456"
    }
  ],
  "pagination": {
    "total": 150,
    "current_page": 1,
    "per_page": 50,
    "has_more": true
  }
}
```

### 4. Document Upload/Indexing Endpoint
**`POST /api/documents`**

**Input (multipart/form-data):**
```json
{
  "file": "<file_binary_data>",
  "metadata": {
    "document_name": "Q3_Report.pdf",
    "uploaded_by": "U1234567890",
    "tags": ["financial", "quarterly", "2024"],
    "access_level": "team"
  }
}
```

**Output:**
```json
{
  "document_id": "doc_456",
  "status": "processing",
  "message": "Document uploaded successfully. Processing embeddings...",
  "processing_info": {
    "estimated_time_minutes": 5,
    "chunk_count": 42,
    "file_size_mb": 2.3
  }
}
```

### 5. Embedding Search Endpoint
**`POST /api/embeddings/search`**

**Input:**
```json
{
  "query": "budget allocation for marketing department",
  "limit": 5,
  "threshold": 0.7,
  "filters": {
    "document_types": ["pdf", "docx"],
    "tags": ["budget", "marketing"],
    "date_range": {
      "start": "2024-01-01",
      "end": "2024-12-31"
    }
  }
}
```

**Output:**
```json
{
  "results": [
    {
      "chunk_id": "chunk_789",
      "document_id": "doc_123", 
      "document_name": "2024_Budget_Plan.pdf",
      "text": "Marketing department allocation for Q1-Q4 totals $500K...",
      "similarity_score": 0.92,
      "metadata": {
        "page": 15,
        "section": "departmental_budgets",
        "chunk_index": 23
      }
    }
  ],
  "query_info": {
    "processing_time_ms": 145,
    "total_matches": 15,
    "returned_count": 5
  }
}
```

### Error Response Format
**All endpoints return errors in this format:**
```json
{
  "error": {
    "code": "LANGCHAIN_PROCESSING_ERROR",
    "message": "Failed to process message with LangChain",
    "details": "OpenAI API rate limit exceeded",
    "timestamp": "2024-01-15T10:30:00Z",
    "request_id": "req_abc123"
  }
}
```

### Next Steps for Integration
1. **Backend API Development:** Your teammate creates endpoints above
2. **Add axios dependency:** `npm install axios`
3. **Update server.js:** Add API client and modify event handlers
4. **Test integration:** Verify Slack → Backend → Database flow
5. **Deploy coordination:** Ensure both services can communicate

## Development

- **Start:** `npm start`
- **Development mode:** `npm run dev` (requires nodemon)
- **Node version:** 20.19.0 (managed by fnm via .nvmrc)

## Project Structure
```
├── server.js          # Main bot logic
├── package.json       # Dependencies and scripts
├── .env.example       # Environment template
├── .nvmrc            # Node version specification
└── README.md         # This file
```
