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