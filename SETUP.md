# 🚀 Slack Bot + Backend Integration Setup

## Quick Start (Two Terminal Setup)

### Terminal 1: Backend API Server
```bash
# Copy environment file and configure
cp env.example .env
# Edit .env with your database and OpenAI keys

# Start backend API server (port 3000)
npm run server
```

### Terminal 2: Slack Bot
```bash
# Add Slack tokens to your .env file:
# SLACK_BOT_TOKEN=xoxb-your-bot-token
# SLACK_APP_TOKEN=xapp-your-app-token  
# SLACK_SIGNING_SECRET=your-signing-secret

# Start Slack bot (port 3001)
npm run slack
```

## 🔧 Architecture

```
Slack App → Slack Bot (3001) → HTTP calls → Backend API (3000) → LangChain → Database
```

## ✅ Integration Features

- **Real Backend Calls**: Slack bot now calls your LangChain API
- **Port Separation**: Slack bot (3001), Backend API (3000)
- **Error Handling**: Graceful fallbacks when backend is down
- **Health Checks**: Automatic backend connection testing
- **Rich Responses**: Full supplier management through Slack

## 🧪 Testing

```bash
# Test backend integration
npm run test:slack
```

## 📝 Example Slack Commands

Once both servers are running, try these in Slack:

- `@bot show me all active suppliers`
- `@bot create a new supplier called "Test Corp"`
- `@bot find gold tier suppliers`
- `@bot add a note about our meeting with Acme Corp`

## 🚨 Troubleshooting

**"Backend connection failed"**: Make sure `npm run server` is running first
**Port conflicts**: Check that ports 3000 and 3001 are available
**Slack tokens**: Verify your Slack app configuration and tokens in `.env`
