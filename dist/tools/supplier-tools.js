"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSupplierTool = exports.updateSupplierStatusTool = exports.searchSuppliersTool = exports.getSupplierOverviewTool = void 0;
const tools_1 = require("@langchain/core/tools");
const zod_1 = require("zod");
const database_1 = require("../config/database");
// Get comprehensive supplier overview
exports.getSupplierOverviewTool = new tools_1.DynamicStructuredTool({
    name: 'get_supplier_overview',
    description: 'Get complete supplier information including contacts, recent interactions, and notes. Use supplier ID or domain to find the supplier.',
    schema: zod_1.z.object({
        supplierId: zod_1.z.number().optional().describe('The supplier ID'),
        domain: zod_1.z.string().optional().describe('The supplier domain (e.g., "acme.com")'),
        includeDays: zod_1.z.number().default(30).describe('Number of days of interaction history to include'),
        includeNotes: zod_1.z.boolean().default(true).describe('Whether to include recent notes'),
    }),
    func: async ({ supplierId, domain, includeDays, includeNotes }) => {
        if (!supplierId && !domain) {
            throw new Error('Either supplierId or domain must be provided');
        }
        const supplier = await database_1.prisma.supplier.findFirst({
            where: supplierId ? { id: supplierId } : { domain },
            include: {
                contacts: {
                    orderBy: { firstName: 'asc' }
                },
                interactions: {
                    where: {
                        occurredAt: {
                            gte: new Date(Date.now() - includeDays * 24 * 60 * 60 * 1000)
                        }
                    },
                    include: { contact: true },
                    orderBy: { occurredAt: 'desc' }
                },
                notes: includeNotes ? {
                    orderBy: { createdAt: 'desc' },
                    take: 10
                } : false
            }
        });
        if (!supplier) {
            return JSON.stringify({ error: 'Supplier not found' });
        }
        return JSON.stringify({
            supplier: {
                id: supplier.id,
                name: supplier.name,
                domain: supplier.domain,
                status: supplier.status,
                tier: supplier.tier,
                createdAt: supplier.createdAt,
                updatedAt: supplier.updatedAt
            },
            contacts: supplier.contacts,
            recentInteractions: supplier.interactions,
            recentNotes: supplier.notes || [],
            summary: {
                totalContacts: supplier.contacts.length,
                recentInteractionsCount: supplier.interactions.length,
                lastInteraction: supplier.interactions[0]?.occurredAt || null,
                sentimentBreakdown: supplier.interactions.reduce((acc, interaction) => {
                    acc[interaction.sentiment] = (acc[interaction.sentiment] || 0) + 1;
                    return acc;
                }, {})
            }
        });
    }
});
// Search suppliers with filters
exports.searchSuppliersTool = new tools_1.DynamicStructuredTool({
    name: 'search_suppliers',
    description: 'Search for suppliers using various filters like name, domain, status, tier, or creation date.',
    schema: zod_1.z.object({
        name: zod_1.z.string().optional().describe('Search by supplier name (partial match)'),
        domain: zod_1.z.string().optional().describe('Search by domain (partial match)'),
        status: zod_1.z.string().optional().describe('Filter by status (e.g., "active", "inactive")'),
        tier: zod_1.z.string().optional().describe('Filter by tier (e.g., "gold", "silver", "bronze")'),
        createdAfter: zod_1.z.string().optional().describe('Find suppliers created after this date (ISO string)'),
        createdBefore: zod_1.z.string().optional().describe('Find suppliers created before this date (ISO string)'),
        limit: zod_1.z.number().default(20).describe('Maximum number of results to return')
    }),
    func: async ({ name, domain, status, tier, createdAfter, createdBefore, limit }) => {
        const where = {};
        if (name) {
            where.name = { contains: name, mode: 'insensitive' };
        }
        if (domain) {
            where.domain = { contains: domain, mode: 'insensitive' };
        }
        if (status) {
            where.status = status;
        }
        if (tier) {
            where.tier = tier;
        }
        if (createdAfter || createdBefore) {
            where.createdAt = {};
            if (createdAfter)
                where.createdAt.gte = new Date(createdAfter);
            if (createdBefore)
                where.createdAt.lte = new Date(createdBefore);
        }
        const suppliers = await database_1.prisma.supplier.findMany({
            where,
            include: {
                _count: {
                    select: {
                        contacts: true,
                        interactions: true,
                        notes: true
                    }
                }
            },
            orderBy: { updatedAt: 'desc' },
            take: limit
        });
        return JSON.stringify({
            suppliers: suppliers.map(supplier => ({
                ...supplier,
                contactCount: supplier._count.contacts,
                interactionCount: supplier._count.interactions,
                noteCount: supplier._count.notes
            })),
            total: suppliers.length,
            searchCriteria: { name, domain, status, tier, createdAfter, createdBefore }
        });
    }
});
// Update supplier status or tier
exports.updateSupplierStatusTool = new tools_1.DynamicStructuredTool({
    name: 'update_supplier_status',
    description: 'Update a supplier\'s status or tier. Useful for managing supplier relationships.',
    schema: zod_1.z.object({
        supplierId: zod_1.z.number().describe('The supplier ID to update'),
        status: zod_1.z.string().optional().describe('New status (e.g., "active", "inactive", "pending")'),
        tier: zod_1.z.string().optional().describe('New tier (e.g., "gold", "silver", "bronze")'),
        reason: zod_1.z.string().optional().describe('Reason for the update (will be added as a note)')
    }),
    func: async ({ supplierId, status, tier, reason }) => {
        if (!status && !tier) {
            throw new Error('Either status or tier must be provided');
        }
        const updateData = {};
        if (status)
            updateData.status = status;
        if (tier)
            updateData.tier = tier;
        const updatedSupplier = await database_1.prisma.supplier.update({
            where: { id: supplierId },
            data: updateData,
            include: {
                contacts: true,
                _count: {
                    select: {
                        interactions: true,
                        notes: true
                    }
                }
            }
        });
        // Add a note if reason is provided
        if (reason) {
            await database_1.prisma.note.create({
                data: {
                    supplierId,
                    authorId: 'system',
                    body: `Status/tier updated: ${reason}. New status: ${status || 'unchanged'}, New tier: ${tier || 'unchanged'}`
                }
            });
        }
        return JSON.stringify({
            success: true,
            supplier: updatedSupplier,
            changes: { status, tier },
            noteAdded: !!reason
        });
    }
});
// Create new supplier
exports.createSupplierTool = new tools_1.DynamicStructuredTool({
    name: 'create_supplier',
    description: 'Create a new supplier record with basic information.',
    schema: zod_1.z.object({
        name: zod_1.z.string().describe('Supplier company name'),
        domain: zod_1.z.string().describe('Supplier domain (e.g., "acme.com")'),
        status: zod_1.z.string().default('pending').describe('Initial status'),
        tier: zod_1.z.string().default('bronze').describe('Initial tier'),
        initialNote: zod_1.z.string().optional().describe('Optional initial note about the supplier')
    }),
    func: async ({ name, domain, status, tier, initialNote }) => {
        const newSupplier = await database_1.prisma.supplier.create({
            data: {
                name,
                domain,
                status,
                tier
            }
        });
        // Add initial note if provided
        if (initialNote) {
            await database_1.prisma.note.create({
                data: {
                    supplierId: newSupplier.id,
                    authorId: 'system',
                    body: `Supplier created: ${initialNote}`
                }
            });
        }
        return JSON.stringify({
            success: true,
            supplier: newSupplier,
            message: `Supplier "${name}" created successfully with ID ${newSupplier.id}`
        });
    }
});
//# sourceMappingURL=supplier-tools.js.map