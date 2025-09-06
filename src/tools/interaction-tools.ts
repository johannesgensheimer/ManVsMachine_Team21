import { z } from 'zod';
import { prisma } from '../config/database';

// Tool function implementations
export async function logInteraction({ supplierId, contactId, channel, summary, sentiment, occurredAt, slackThreadId, updateSupplierStatus = false }: {
  supplierId: number;
  contactId?: number;
  channel: string;
  summary: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  occurredAt?: string;
  slackThreadId?: string;
  updateSupplierStatus?: boolean;
}) {
  const interactionDate = occurredAt ? new Date(occurredAt) : new Date();

  // Create the interaction
  const interaction = await prisma.interaction.create({
    data: {
      supplierId,
      contactId,
      channel,
      summary,
      sentiment,
      occurredAt: interactionDate,
      slackThreadId
    },
    include: {
      supplier: true,
      contact: true
    }
  });

  // Update supplier status if requested
  let supplierUpdate = null;
  if (updateSupplierStatus) {
    supplierUpdate = await prisma.supplier.update({
      where: { id: supplierId },
      data: { status: 'active' }
    });
  }

  return JSON.stringify({
    success: true,
    interaction,
    supplierUpdated: !!supplierUpdate,
    message: `Interaction logged for ${interaction.supplier.name}${interaction.contact ? ` (${interaction.contact.firstName} ${interaction.contact.lastName})` : ''}`
  });
}

export async function getInteractionHistory({ supplierId, contactId, channel, sentiment, occurredAfter, occurredBefore, limit = 50, includeAnalytics = true }: {
  supplierId?: number;
  contactId?: number;
  channel?: string;
  sentiment?: string;
  occurredAfter?: string;
  occurredBefore?: string;
  limit?: number;
  includeAnalytics?: boolean;
}) {
  const where: any = {};

  if (supplierId) where.supplierId = supplierId;
  if (contactId) where.contactId = contactId;
  if (channel) where.channel = channel;
  if (sentiment) where.sentiment = sentiment;
  
  if (occurredAfter || occurredBefore) {
    where.occurredAt = {};
    if (occurredAfter) where.occurredAt.gte = new Date(occurredAfter);
    if (occurredBefore) where.occurredAt.lte = new Date(occurredBefore);
  }

  const interactions = await prisma.interaction.findMany({
    where,
    include: {
      supplier: true,
      contact: true
    },
    orderBy: { occurredAt: 'desc' },
    take: limit
  });

  let analytics = null;
  if (includeAnalytics && interactions.length > 0) {
    // Calculate analytics
    const channelBreakdown = interactions.reduce((acc, interaction) => {
      acc[interaction.channel] = (acc[interaction.channel] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const sentimentBreakdown = interactions.reduce((acc, interaction) => {
      acc[interaction.sentiment] = (acc[interaction.sentiment] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const supplierBreakdown = interactions.reduce((acc, interaction) => {
      const supplierName = interaction.supplier.name;
      acc[supplierName] = (acc[supplierName] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    analytics = {
      totalInteractions: interactions.length,
      dateRange: {
        earliest: interactions[interactions.length - 1]?.occurredAt,
        latest: interactions[0]?.occurredAt
      },
      channelBreakdown,
      sentimentBreakdown,
      supplierBreakdown,
      averageInteractionsPerDay: interactions.length > 0 ? 
        interactions.length / Math.max(1, Math.ceil((new Date().getTime() - new Date(interactions[interactions.length - 1].occurredAt).getTime()) / (1000 * 60 * 60 * 24))) : 0
    };
  }

  return JSON.stringify({
    interactions,
    analytics,
    filters: { supplierId, contactId, channel, sentiment, occurredAfter, occurredBefore },
    total: interactions.length
  });
}

export async function analyzeSentimentTrends({ supplierId, contactId, days = 90, groupBy = 'week' }: {
  supplierId?: number;
  contactId?: number;
  days?: number;
  groupBy?: 'day' | 'week' | 'month';
}) {
  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  
  const where: any = {
    occurredAt: { gte: startDate }
  };
  
  if (supplierId) where.supplierId = supplierId;
  if (contactId) where.contactId = contactId;

  const interactions = await prisma.interaction.findMany({
    where,
    include: {
      supplier: true,
      contact: true
    },
    orderBy: { occurredAt: 'asc' }
  });

  if (interactions.length === 0) {
    return JSON.stringify({
      message: 'No interactions found for the specified criteria',
      trends: [],
      summary: null
    });
  }

  // Group interactions by time period
  const groupedData: Record<string, { positive: number; neutral: number; negative: number; total: number }> = {};
  
  interactions.forEach(interaction => {
    let groupKey: string;
    const date = new Date(interaction.occurredAt);
    
    switch (groupBy) {
      case 'day':
        groupKey = date.toISOString().split('T')[0];
        break;
      case 'week':
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        groupKey = weekStart.toISOString().split('T')[0];
        break;
      case 'month':
        groupKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        break;
      default:
        groupKey = date.toISOString().split('T')[0];
    }

    if (!groupedData[groupKey]) {
      groupedData[groupKey] = { positive: 0, neutral: 0, negative: 0, total: 0 };
    }

    groupedData[groupKey][interaction.sentiment as keyof typeof groupedData[string]]++;
    groupedData[groupKey].total++;
  });

  // Convert to array and calculate percentages
  const trends = Object.entries(groupedData)
    .map(([period, data]) => ({
      period,
      ...data,
      positivePercent: Math.round((data.positive / data.total) * 100),
      neutralPercent: Math.round((data.neutral / data.total) * 100),
      negativePercent: Math.round((data.negative / data.total) * 100)
    }))
    .sort((a, b) => a.period.localeCompare(b.period));

  // Calculate overall summary
  const totalInteractions = interactions.length;
  const overallSentiment = {
    positive: interactions.filter(i => i.sentiment === 'positive').length,
    neutral: interactions.filter(i => i.sentiment === 'neutral').length,
    negative: interactions.filter(i => i.sentiment === 'negative').length
  };

  const summary = {
    totalInteractions,
    dateRange: {
      start: startDate.toISOString().split('T')[0],
      end: new Date().toISOString().split('T')[0]
    },
    overallSentiment: {
      ...overallSentiment,
      positivePercent: Math.round((overallSentiment.positive / totalInteractions) * 100),
      neutralPercent: Math.round((overallSentiment.neutral / totalInteractions) * 100),
      negativePercent: Math.round((overallSentiment.negative / totalInteractions) * 100)
    },
    trend: trends.length > 1 ? 
      (trends[trends.length - 1].positivePercent > trends[0].positivePercent ? 'improving' : 
       trends[trends.length - 1].positivePercent < trends[0].positivePercent ? 'declining' : 'stable') : 'insufficient_data'
  };

  return JSON.stringify({
    trends,
    summary,
    groupBy,
    filters: { supplierId, contactId, days }
  });
}

// OpenAI Function Definitions
export const interactionFunctions = [
  {
    name: 'log_interaction',
    description: 'Record a new interaction with a supplier or specific contact. Automatically updates supplier status if needed.',
    parameters: {
      type: 'object',
      properties: {
        supplierId: {
          type: 'number',
          description: 'The supplier ID'
        },
        contactId: {
          type: 'number',
          description: 'Specific contact ID (optional)'
        },
        channel: {
          type: 'string',
          description: 'Communication channel (e.g., "email", "phone", "slack", "meeting", "linkedin")'
        },
        summary: {
          type: 'string',
          description: 'Summary of the interaction'
        },
        sentiment: {
          type: 'string',
          enum: ['positive', 'neutral', 'negative'],
          description: 'Overall sentiment of the interaction'
        },
        occurredAt: {
          type: 'string',
          description: 'When the interaction occurred (ISO string, defaults to now)'
        },
        slackThreadId: {
          type: 'string',
          description: 'Slack thread ID if applicable'
        },
        updateSupplierStatus: {
          type: 'boolean',
          description: 'Whether to update supplier status to "active"',
          default: false
        }
      },
      required: ['supplierId', 'channel', 'summary', 'sentiment']
    }
  },
  {
    name: 'get_interaction_history',
    description: 'Retrieve interaction history with advanced filtering options. Great for analyzing communication patterns.',
    parameters: {
      type: 'object',
      properties: {
        supplierId: {
          type: 'number',
          description: 'Filter by supplier ID'
        },
        contactId: {
          type: 'number',
          description: 'Filter by contact ID'
        },
        channel: {
          type: 'string',
          description: 'Filter by communication channel'
        },
        sentiment: {
          type: 'string',
          description: 'Filter by sentiment'
        },
        occurredAfter: {
          type: 'string',
          description: 'Get interactions after this date (ISO string)'
        },
        occurredBefore: {
          type: 'string',
          description: 'Get interactions before this date (ISO string)'
        },
        limit: {
          type: 'number',
          description: 'Maximum number of interactions to return',
          default: 50
        },
        includeAnalytics: {
          type: 'boolean',
          description: 'Include analytics summary',
          default: true
        }
      }
    }
  },
  {
    name: 'analyze_sentiment_trends',
    description: 'Analyze sentiment trends over time for suppliers or specific contacts. Useful for relationship health monitoring.',
    parameters: {
      type: 'object',
      properties: {
        supplierId: {
          type: 'number',
          description: 'Analyze trends for specific supplier'
        },
        contactId: {
          type: 'number',
          description: 'Analyze trends for specific contact'
        },
        days: {
          type: 'number',
          description: 'Number of days to analyze',
          default: 90
        },
        groupBy: {
          type: 'string',
          enum: ['day', 'week', 'month'],
          description: 'How to group the data',
          default: 'week'
        }
      }
    }
  }
];