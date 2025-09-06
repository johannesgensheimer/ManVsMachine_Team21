# Email Integration Guide

## Overview

The email integration allows you to draft professional emails to supplier contacts directly through Slack. The system uses your existing database of suppliers and contacts to automatically populate recipient information and generate contextually relevant email content.

## How It Works

### Workflow
1. **Slack Command**: Send a natural language request via Slack
2. **Database Lookup**: System searches for supplier/contact information
3. **Context Gathering**: Pulls recent interactions, notes, and supplier details
4. **Email Generation**: LLM drafts appropriate email content
5. **Mailto Link**: Creates clickable link that opens in your email client

### Example Commands

```
@bot ask TechCorp if they have widgets available
@bot draft follow-up email to John Smith about our partnership discussion  
@bot compose meeting request for Emily Rodriguez at InnovateInc
@bot send introduction email to mike.chen@globalsupplier.com
```

## Email Types Supported

### 1. **Inquiry Emails**
- **Trigger**: "ask [supplier] if they have [product] available"
- **Use Case**: Product availability, pricing requests
- **Generated Content**: Professional inquiry with specific questions

### 2. **Follow-up Emails** 
- **Trigger**: "draft follow-up email to [contact] about [topic]"
- **Use Case**: Continue previous conversations
- **Generated Content**: References recent interactions from database

### 3. **Meeting Requests**
- **Trigger**: "schedule meeting with [supplier/contact]"
- **Use Case**: Request calls or in-person meetings
- **Generated Content**: Professional meeting request with availability

### 4. **Introduction Emails**
- **Trigger**: "send introduction email to [contact]"
- **Use Case**: First contact with new suppliers
- **Generated Content**: Company introduction and partnership interest

### 5. **Proposal Emails**
- **Trigger**: "draft proposal email to [supplier]"
- **Use Case**: Business proposals, partnership offers
- **Generated Content**: Professional proposal with clear next steps

## Features

### ✅ **Smart Contact Resolution**
- Search by supplier name: "ask TechCorp..."
- Search by contact name: "email John Smith..."
- Search by email address: "contact jane@company.com..."
- Automatic primary contact selection for suppliers

### ✅ **Context-Aware Content**
- Uses recent interaction history
- References supplier notes and status
- Personalizes based on contact title/role
- Maintains professional tone

### ✅ **Mailto Link Generation**
- Pre-fills recipient, subject, and body
- Works with any email client (Outlook, Gmail, Apple Mail, etc.)
- Proper URL encoding for special characters
- Automatic truncation for long emails

### ✅ **Database Integration**
- Leverages existing supplier/contact data
- No duplicate data entry required
- Real-time database queries
- Consistent contact information

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Demo Data (Optional)
```bash
node setup-email-demo-data.js
```

### 3. Start the Server
```bash
npm run server
```

### 4. Test Integration
```bash
node test-email-integration.js
```

## Usage Examples

### Basic Inquiry
**Input**: `@bot ask TechCorp if they have widgets available`

**Generated Email**:
```
To: john.smith@techcorp.com
Subject: Product Availability Inquiry - TechCorp

Hi John,

I hope this email finds you well. I'm reaching out to inquire about product availability and potential partnership opportunities.

Specifically, I'm interested in widgets.

Could you please let me know:
- Current product availability  
- Pricing and terms
- Lead times for delivery

Best regards,
[Your Name]
```

### Follow-up with Context
**Input**: `@bot draft follow-up email to John Smith about our widget discussion`

**Generated Email** (uses interaction history):
```
To: john.smith@techcorp.com
Subject: Follow-up on Our Recent Discussion

Hi John,

I wanted to follow up on our recent conversation regarding widget pricing and availability for Q1 project.

I'd appreciate the opportunity to discuss this further at your convenience.

Best regards,
[Your Name]
```

## Slack Response Format

The bot responds with:
- **Email Preview**: Shows recipient, subject, and body preview
- **Context Used**: Indicates what database information was used
- **Mailto Button**: Clickable link to open in email client
- **Supplier Info**: Relevant supplier details and status

Example Slack Response:
```
📧 Email draft ready!

To: john.smith@techcorp.com  
Subject: Product Availability Inquiry - TechCorp

Email preview:
```
Hi John,

I hope this email finds you well. I'm reaching out to inquire about...
```

Context used: Recent interactions (1), Supplier info (TechCorp - Gold tier)

[📧 Open in Email Client] <- Clickable mailto link
```

## Technical Details

### Email Tool Parameters
```typescript
{
  recipientEmail?: string;      // Direct email address
  supplierId?: number;          // Supplier ID (uses primary contact)
  contactId?: number;           // Specific contact ID
  emailType?: string;           // 'inquiry' | 'follow-up' | 'proposal' | etc.
  context?: string;             // Additional context for email
  customMessage?: string;       // Custom message content
}
```

### Mailto URL Structure
```
mailto:recipient@example.com?subject=Subject%20Here&body=Email%20body%20content
```

### Database Queries
- **Contact Resolution**: Searches contacts by name, email, or supplier
- **Context Gathering**: Pulls recent interactions (last 3)
- **Supplier Info**: Gets supplier status, tier, and notes
- **Personalization**: Uses contact title and interaction history

## Limitations & Considerations

### Current Limitations
- ❌ **No Attachments**: Mailto URLs don't support file attachments
- ❌ **Plain Text Only**: Limited formatting options
- ❌ **URL Length Limit**: ~2000 character limit (auto-truncated)
- ❌ **No Email Tracking**: No delivery/read receipts

### Best Practices
- ✅ Keep email content concise and focused
- ✅ Review generated content before sending
- ✅ Maintain up-to-date contact information in database
- ✅ Use specific context in your Slack commands

### Future Enhancements
- 📧 **Email API Integration**: Direct sending with rich formatting
- 📎 **Attachment Support**: File attachments via email APIs
- 📊 **Email Templates**: Customizable templates per team/user
- 📈 **Email Tracking**: Delivery and engagement metrics

## Troubleshooting

### Common Issues

**"No contacts found for supplier"**
- Solution: Add contacts to the supplier in the database
- Use: `@bot add contact John Smith to TechCorp with email john@techcorp.com`

**"Contact not found"**
- Solution: Check spelling or search by supplier name instead
- Use: `@bot ask TechCorp...` instead of `@bot ask John Smith...`

**"Mailto link too long"**
- Solution: Email content is automatically truncated
- Note: Complete the email in your email client

**"Email client doesn't open"**
- Solution: Check default email client settings in your OS
- Alternative: Copy email content manually

### Testing Commands

```bash
# Test the integration
node test-email-integration.js

# Setup demo data
node setup-email-demo-data.js

# Test server health
curl http://localhost:3000/health
```

## API Endpoints

### Chat Endpoint (Slack Integration)
```
POST /api/chat
{
  "userId": "U1234567890",
  "message": "ask TechCorp if they have widgets available",
  "channel": "C9876543210"
}
```

### Direct Email Tool
```  
POST /api/openai/process
{
  "message": "Use draft_email tool with supplierId: 1, emailType: 'inquiry'",
  "userId": "U1234567890"
}
```

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the test scripts for examples
3. Verify database has supplier/contact data
4. Ensure server is running on correct port

---

**Ready to start drafting emails through Slack! 🚀📧**
