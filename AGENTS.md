# Agent Instructions - ManVsMachine Team21

## Simple Slack Bot Foundation (Teammate-Led Backend)

**Create a minimal Node.js Slack bot foundation. Keep it simple - teammate handles backend architecture.**

### Core Requirements (Keep Simple):
- Use `@slack/bolt` framework (official Slack Node.js framework)
- Socket Mode setup (no webhooks/hosting needed for hackathon)
- Basic message handling
- Environment variable setup
- Simple placeholder responses

### What Slack Bolt Does:
- Official Node.js framework for Slack apps
- Handles authentication, event parsing automatically  
- Socket Mode = real-time connection (perfect for local dev)
- Event-driven: `app.message()`, `app.mention()`, etc.

### Minimal Structure:
```
├── server.js          # Main entry point
├── package.json       # Dependencies  
├── .env.example       # Environment template
└── README.md         # Setup instructions
```

### Essential Features Only:
- Respond when bot is mentioned (`@bot hello`)
- Basic error handling
- Console logging for debugging
- Environment variable configuration

### Environment Variables:
- `SLACK_BOT_TOKEN` - Bot permission token
- `SLACK_APP_TOKEN` - Socket mode token  
- `SLACK_SIGNING_SECRET` - Request verification
- `PORT=3000` (optional)

### Placeholder Comments for Later:
- Where to add LLM integration
- Where to connect to data sources  
- Where to expand message logic

---

## Status
- [ ] Initialize Node.js project structure
- [ ] Set up Slack Bolt framework
- [ ] Create environment configuration
- [ ] Implement basic event handlers
- [ ] Add error handling and logging
- [ ] Create setup documentation
- [ ] Test basic functionality

## Notes
Created on branch: `slack-bot-foundation`
