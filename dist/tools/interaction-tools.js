"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeSentimentTrendsTool = exports.getInteractionHistoryTool = exports.logInteractionTool = void 0;
const tools_1 = require("@langchain/core/tools");
const zod_1 = require("zod");
const database_1 = require("../config/database");
// Log new interaction
exports.logInteractionTool = new tools_1.DynamicStructuredTool({
    name: 'log_interaction',
    description: 'Record a new interaction with a supplier or specific contact. Automatically updates supplier status if needed.',
    schema: zod_1.z.object({
        supplierId: zod_1.z.number().describe('The supplier ID'),
        contactId: zod_1.z.number().optional().describe('Specific contact ID (optional)'),
        channel: zod_1.z.string().describe('Communication channel (e.g., "email", "phone", "slack", "meeting", "linkedin")'),
        summary: zod_1.z.string().describe('Summary of the interaction'),
        sentiment: zod_1.z.enum(['positive', 'neutral', 'negative']).describe('Overall sentiment of the interaction'),
        occurredAt: zod_1.z.string().optional().describe('When the interaction occurred (ISO string, defaults to now)'),
        slackThreadId: zod_1.z.string().optional().describe('Slack thread ID if applicable'),
        updateSupplierStatus: zod_1.z.boolean().default(false).describe('Whether to update supplier status to "active"')
    }),
    func: async ({ supplierId, contactId, channel, summary, sentiment, occurredAt, slackThreadId, updateSupplierStatus }) => {
        const interactionDate = occurredAt ? new Date(occurredAt) : new Date();
        // Create the interaction
        const interaction = await database_1.prisma.interaction.create({
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
            supplierUpdate = await database_1.prisma.supplier.update({
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
});
// Get interaction history with filtering
exports.getInteractionHistoryTool = new tools_1.DynamicStructuredTool({
    name: 'get_interaction_history',
    description: 'Retrieve interaction history with advanced filtering options. Great for analyzing communication patterns.',
    schema: zod_1.z.object({
        supplierId: zod_1.z.number().optional().describe('Filter by supplier ID'),
        contactId: zod_1.z.number().optional().describe('Filter by contact ID'),
        channel: zod_1.z.string().optional().describe('Filter by communication channel'),
        sentiment: zod_1.z.string().optional().describe('Filter by sentiment'),
        occurredAfter: zod_1.z.string().optional().describe('Get interactions after this date (ISO string)'),
        occurredBefore: zod_1.z.string().optional().describe('Get interactions before this date (ISO string)'),
        limit: zod_1.z.number().default(50).describe('Maximum number of interactions to return'),
        includeAnalytics: zod_1.z.boolean().default(true).describe('Include analytics summary')
    }),
    func: async ({ supplierId, contactId, channel, sentiment, occurredAfter, occurredBefore, limit, includeAnalytics }) => {
        const where = {};
        if (supplierId)
            where.supplierId = supplierId;
        if (contactId)
            where.contactId = contactId;
        if (channel)
            where.channel = channel;
        if (sentiment)
            where.sentiment = sentiment;
        if (occurredAfter || occurredBefore) {
            where.occurredAt = {};
            if (occurredAfter)
                where.occurredAt.gte = new Date(occurredAfter);
            if (occurredBefore)
                where.occurredAt.lte = new Date(occurredBefore);
        }
        const interactions = await database_1.prisma.interaction.findMany({
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
            }, {});
            const sentimentBreakdown = interactions.reduce((acc, interaction) => {
                acc[interaction.sentiment] = (acc[interaction.sentiment] || 0) + 1;
                return acc;
            }, {});
            const supplierBreakdown = interactions.reduce((acc, interaction) => {
                const supplierName = interaction.supplier.name;
                acc[supplierName] = (acc[supplierName] || 0) + 1;
                return acc;
            }, {});
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
});
// Analyze sentiment trends
exports.analyzeSentimentTrendsTool = new tools_1.DynamicStructuredTool({
    name: 'analyze_sentiment_trends',
    description: 'Analyze sentiment trends over time for suppliers or specific contacts. Useful for relationship health monitoring.',
    schema: zod_1.z.object({
        supplierId: zod_1.z.number().optional().describe('Analyze trends for specific supplier'),
        contactId: zod_1.z.number().optional().describe('Analyze trends for specific contact'),
        days: zod_1.z.number().default(90).describe('Number of days to analyze'),
        groupBy: zod_1.z.enum(['day', 'week', 'month']).default('week').describe('How to group the data')
    }),
    func: async ({ supplierId, contactId, days, groupBy }) => {
        const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
        const where = {
            occurredAt: { gte: startDate }
        };
        if (supplierId)
            where.supplierId = supplierId;
        if (contactId)
            where.contactId = contactId;
        const interactions = await database_1.prisma.interaction.findMany({
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
        const groupedData = {};
        interactions.forEach(interaction => {
            let groupKey;
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
            groupedData[groupKey][interaction.sentiment]++;
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
});
//# sourceMappingURL=interaction-tools.js.map