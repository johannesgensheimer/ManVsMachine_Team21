import { z } from 'zod';
import { prisma } from '../config/database';

// Helper function to URL encode email content
function encodeEmailContent(content: string): string {
  return encodeURIComponent(content)
    .replace(/'/g, '%27')
    .replace(/"/g, '%22')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29');
}

// Helper function to format email body with proper line breaks
function formatEmailBody(content: string): string {
  return content
    .replace(/\n\n/g, '%0D%0A%0D%0A') // Double line breaks
    .replace(/\n/g, '%0D%0A'); // Single line breaks
}

// Main email drafting function
export async function draftEmail({
  recipientEmail,
  recipientName,
  supplierId,
  contactId,
  subject,
  emailType = 'general',
  context,
  includeRecentInteractions = true,
  customMessage
}: {
  recipientEmail?: string;
  recipientName?: string;
  supplierId?: number;
  contactId?: number;
  subject?: string;
  emailType?: 'inquiry' | 'follow-up' | 'proposal' | 'meeting' | 'introduction' | 'general';
  context?: string;
  includeRecentInteractions?: boolean;
  customMessage?: string;
}) {
  try {
    let recipient: any = null;
    let supplier: any = null;
    let recentInteractions: any[] = [];

    // 1. Resolve recipient and gather context
    if (contactId) {
      // Get specific contact
      recipient = await prisma.contact.findUnique({
        where: { id: contactId },
        include: {
          supplier: true,
          interactions: includeRecentInteractions ? {
            orderBy: { occurredAt: 'desc' },
            take: 3
          } : false
        }
      });
      
      if (!recipient) {
        return JSON.stringify({
          error: 'Contact not found',
          contactId
        });
      }
      
      supplier = recipient.supplier;
      recentInteractions = recipient.interactions || [];
      
    } else if (supplierId) {
      // Get supplier and primary contact
      supplier = await prisma.supplier.findUnique({
        where: { id: supplierId },
        include: {
          contacts: {
            orderBy: { id: 'asc' }, // Get first contact as primary
            take: 1
          },
          interactions: includeRecentInteractions ? {
            orderBy: { occurredAt: 'desc' },
            take: 3
          } : false,
          notes: {
            orderBy: { createdAt: 'desc' },
            take: 2
          }
        }
      });
      
      if (!supplier) {
        return JSON.stringify({
          error: 'Supplier not found',
          supplierId
        });
      }
      
      recipient = supplier.contacts[0];
      recentInteractions = supplier.interactions || [];
      
      if (!recipient) {
        return JSON.stringify({
          error: 'No contacts found for supplier',
          supplier: supplier.name,
          suggestion: 'Please add a contact for this supplier first'
        });
      }
      
    } else if (recipientEmail) {
      // Search for contact by email
      recipient = await prisma.contact.findFirst({
        where: { email: recipientEmail },
        include: {
          supplier: true,
          interactions: includeRecentInteractions ? {
            orderBy: { occurredAt: 'desc' },
            take: 3
          } : false
        }
      });
      
      if (recipient) {
        supplier = recipient.supplier;
        recentInteractions = recipient.interactions || [];
      }
    }

    // 2. Generate email content based on type and context
    const recipientFullName = recipient 
      ? `${recipient.firstName} ${recipient.lastName}`
      : recipientName || 'there';
    
    const recipientEmailAddr = recipient?.email || recipientEmail;
    
    if (!recipientEmailAddr) {
      return JSON.stringify({
        error: 'No email address found',
        message: 'Please provide an email address or ensure the contact has an email in the database'
      });
    }

    // Build context for email generation
    let emailContext = '';
    if (supplier) {
      emailContext += `Supplier: ${supplier.name} (${supplier.domain})\n`;
      emailContext += `Status: ${supplier.status}, Tier: ${supplier.tier}\n`;
    }
    
    if (recipient?.title) {
      emailContext += `Recipient Title: ${recipient.title}\n`;
    }
    
    if (recentInteractions.length > 0) {
      emailContext += `\nRecent Interactions:\n`;
      recentInteractions.forEach((interaction, index) => {
        emailContext += `${index + 1}. ${interaction.channel}: ${interaction.summary} (${interaction.sentiment})\n`;
      });
    }

    // Generate email subject if not provided
    let emailSubject = subject;
    if (!emailSubject) {
      switch (emailType) {
        case 'inquiry':
          emailSubject = `Product Availability Inquiry`;
          break;
        case 'follow-up':
          emailSubject = `Follow-up on Our Recent Discussion`;
          break;
        case 'proposal':
          emailSubject = `Partnership Proposal`;
          break;
        case 'meeting':
          emailSubject = `Meeting Request`;
          break;
        case 'introduction':
          emailSubject = `Introduction and Partnership Opportunity`;
          break;
        default:
          emailSubject = `Business Inquiry`;
      }
      
      if (supplier) {
        emailSubject += ` - ${supplier.name}`;
      }
    }

    // Generate email body
    let emailBody = '';
    
    // Greeting
    emailBody += `Hi ${recipientFullName.split(' ')[0]},\n\n`;
    
    // Main content based on type
    if (customMessage) {
      emailBody += `${customMessage}\n\n`;
    } else {
      switch (emailType) {
        case 'inquiry':
          emailBody += `I hope this email finds you well. I'm reaching out to inquire about product availability and potential partnership opportunities.\n\n`;
          if (context) {
            emailBody += `Specifically, I'm interested in ${context}.\n\n`;
          }
          emailBody += `Could you please let me know:\n`;
          emailBody += `- Current product availability\n`;
          emailBody += `- Pricing and terms\n`;
          emailBody += `- Lead times for delivery\n\n`;
          break;
          
        case 'follow-up':
          emailBody += `I wanted to follow up on our recent conversation`;
          if (recentInteractions.length > 0) {
            const lastInteraction = recentInteractions[0];
            emailBody += ` regarding ${lastInteraction.summary.toLowerCase()}`;
          }
          emailBody += `.\n\n`;
          if (context) {
            emailBody += `${context}\n\n`;
          }
          emailBody += `I'd appreciate the opportunity to discuss this further at your convenience.\n\n`;
          break;
          
        case 'proposal':
          emailBody += `I hope you're doing well. I'm writing to propose a potential partnership opportunity that could be mutually beneficial.\n\n`;
          if (context) {
            emailBody += `${context}\n\n`;
          }
          emailBody += `I'd love to schedule a call to discuss this in more detail. Would you be available for a brief conversation this week?\n\n`;
          break;
          
        case 'meeting':
          emailBody += `I hope this message finds you well. I'd like to schedule a meeting to discuss potential collaboration opportunities.\n\n`;
          if (context) {
            emailBody += `The purpose of the meeting would be to ${context}.\n\n`;
          }
          emailBody += `Please let me know your availability for the coming week, and I'll send over a calendar invite.\n\n`;
          break;
          
        case 'introduction':
          emailBody += `I hope this email finds you well. I'm reaching out to introduce myself and explore potential partnership opportunities between our organizations.\n\n`;
          if (context) {
            emailBody += `${context}\n\n`;
          }
          emailBody += `I'd welcome the opportunity to learn more about your current initiatives and discuss how we might collaborate.\n\n`;
          break;
          
        default:
          emailBody += `I hope this email finds you well.\n\n`;
          if (context) {
            emailBody += `${context}\n\n`;
          }
          emailBody += `I look forward to hearing from you.\n\n`;
      }
    }
    
    // Closing
    emailBody += `Best regards,\n`;
    emailBody += `[Your Name]`; // User can customize this
    
    // 3. Create mailto URL
    const encodedSubject = encodeEmailContent(emailSubject);
    const encodedBody = formatEmailBody(emailBody);
    
    // Check URL length (mailto URLs should be under 2000 characters)
    const baseMailtoUrl = `mailto:${recipientEmailAddr}?subject=${encodedSubject}&body=`;
    const fullMailtoUrl = baseMailtoUrl + encodedBody;
    
    if (fullMailtoUrl.length > 2000) {
      // Truncate body if too long
      const maxBodyLength = 2000 - baseMailtoUrl.length - 50; // Leave some buffer
      const truncatedBody = emailBody.substring(0, maxBodyLength) + '\n\n[Message truncated - please complete in your email client]';
      const encodedTruncatedBody = formatEmailBody(truncatedBody);
      var finalMailtoUrl = baseMailtoUrl + encodedTruncatedBody;
    } else {
      var finalMailtoUrl = fullMailtoUrl;
    }

    // 4. Return formatted response
    return JSON.stringify({
      success: true,
      email: {
        to: recipientEmailAddr,
        toName: recipientFullName,
        subject: emailSubject,
        body: emailBody,
        type: emailType
      },
      supplier: supplier ? {
        id: supplier.id,
        name: supplier.name,
        status: supplier.status,
        tier: supplier.tier
      } : null,
      contact: recipient ? {
        id: recipient.id,
        name: recipientFullName,
        title: recipient.title,
        email: recipient.email
      } : null,
      mailto_url: finalMailtoUrl,
      context_used: {
        recent_interactions: recentInteractions.length,
        supplier_info: !!supplier,
        custom_context: !!context
      },
      message: `Email draft created for ${recipientFullName} at ${supplier?.name || 'external contact'}. Click the mailto link to open in your email client.`
    });

  } catch (error) {
    console.error('Error in draftEmail:', error);
    return JSON.stringify({
      error: 'Failed to draft email',
      details: error instanceof Error ? error.message : 'Unknown error occurred',
      suggestion: 'Please check the contact information and try again'
    });
  }
}

// LangChain tool definition for email drafting
export const draftEmailTool = {
  name: 'draft_email',
  description: `Draft an email to a supplier contact with context from the database. 
  
  Use this tool when users want to:
  - Send inquiries to suppliers about product availability
  - Follow up on previous conversations
  - Draft business proposals or meeting requests
  - Compose any business email to supplier contacts
  
  The tool will:
  1. Look up contact information from the database
  2. Gather relevant context (recent interactions, supplier info, notes)
  3. Generate appropriate email content based on the request
  4. Create a mailto URL that opens in the user's email client
  
  Examples of user requests:
  - "Ask TechCorp if they have widgets available"
  - "Draft a follow-up email to John at GlobalSupplier"
  - "Compose a meeting request for jane.doe@company.com"
  - "Write an introduction email to the contact at InnovateInc"`,
  
  schema: z.object({
    recipientEmail: z.string().optional().describe('Email address of the recipient (if known)'),
    recipientName: z.string().optional().describe('Full name of the recipient (if not in database)'),
    supplierId: z.number().optional().describe('ID of the supplier to email (will use primary contact)'),
    contactId: z.number().optional().describe('Specific contact ID to email'),
    subject: z.string().optional().describe('Custom email subject (will be generated if not provided)'),
    emailType: z.enum(['inquiry', 'follow-up', 'proposal', 'meeting', 'introduction', 'general']).optional().describe('Type of email to determine appropriate tone and content'),
    context: z.string().optional().describe('Specific context or message content for the email'),
    includeRecentInteractions: z.boolean().optional().default(true).describe('Whether to include recent interaction context in email'),
    customMessage: z.string().optional().describe('Custom message content to include in the email body')
  }),
  
  func: draftEmail
};
