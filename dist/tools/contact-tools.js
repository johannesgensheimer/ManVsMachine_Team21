"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchContactsTool = exports.manageContactTool = void 0;
const tools_1 = require("@langchain/core/tools");
const zod_1 = require("zod");
const database_1 = require("../config/database");
// Manage contacts (create, update, get)
exports.manageContactTool = new tools_1.DynamicStructuredTool({
    name: 'manage_contact',
    description: 'Create, update, or retrieve contact information for suppliers. Can handle all contact CRUD operations.',
    schema: zod_1.z.object({
        action: zod_1.z.enum(['create', 'update', 'get', 'delete']).describe('The action to perform'),
        contactId: zod_1.z.number().optional().describe('Contact ID (required for update, get, delete)'),
        supplierId: zod_1.z.number().optional().describe('Supplier ID (required for create)'),
        firstName: zod_1.z.string().optional().describe('Contact first name'),
        lastName: zod_1.z.string().optional().describe('Contact last name'),
        title: zod_1.z.string().optional().describe('Contact job title'),
        email: zod_1.z.string().optional().describe('Contact email address'),
        phone: zod_1.z.string().optional().describe('Contact phone number'),
        linkedinUrl: zod_1.z.string().optional().describe('Contact LinkedIn profile URL')
    }),
    func: async ({ action, contactId, supplierId, firstName, lastName, title, email, phone, linkedinUrl }) => {
        switch (action) {
            case 'create':
                if (!supplierId || !firstName || !lastName || !email) {
                    throw new Error('supplierId, firstName, lastName, and email are required for creating a contact');
                }
                const newContact = await database_1.prisma.contact.create({
                    data: {
                        supplierId,
                        firstName,
                        lastName,
                        title,
                        email,
                        phone,
                        linkedinUrl
                    },
                    include: {
                        supplier: true
                    }
                });
                return JSON.stringify({
                    success: true,
                    action: 'create',
                    contact: newContact,
                    message: `Contact "${firstName} ${lastName}" created for ${newContact.supplier.name}`
                });
            case 'update':
                if (!contactId) {
                    throw new Error('contactId is required for updating a contact');
                }
                const updateData = {};
                if (firstName)
                    updateData.firstName = firstName;
                if (lastName)
                    updateData.lastName = lastName;
                if (title !== undefined)
                    updateData.title = title;
                if (email)
                    updateData.email = email;
                if (phone !== undefined)
                    updateData.phone = phone;
                if (linkedinUrl !== undefined)
                    updateData.linkedinUrl = linkedinUrl;
                const updatedContact = await database_1.prisma.contact.update({
                    where: { id: contactId },
                    data: updateData,
                    include: {
                        supplier: true,
                        _count: {
                            select: { interactions: true }
                        }
                    }
                });
                return JSON.stringify({
                    success: true,
                    action: 'update',
                    contact: updatedContact,
                    changes: updateData
                });
            case 'get':
                if (!contactId) {
                    throw new Error('contactId is required for getting a contact');
                }
                const contact = await database_1.prisma.contact.findUnique({
                    where: { id: contactId },
                    include: {
                        supplier: true,
                        interactions: {
                            orderBy: { occurredAt: 'desc' },
                            take: 10
                        }
                    }
                });
                if (!contact) {
                    return JSON.stringify({ error: 'Contact not found' });
                }
                return JSON.stringify({
                    success: true,
                    action: 'get',
                    contact,
                    recentInteractions: contact.interactions
                });
            case 'delete':
                if (!contactId) {
                    throw new Error('contactId is required for deleting a contact');
                }
                const deletedContact = await database_1.prisma.contact.delete({
                    where: { id: contactId },
                    include: { supplier: true }
                });
                return JSON.stringify({
                    success: true,
                    action: 'delete',
                    message: `Contact "${deletedContact.firstName} ${deletedContact.lastName}" deleted from ${deletedContact.supplier.name}`
                });
            default:
                throw new Error(`Invalid action: ${action}`);
        }
    }
});
// Search contacts across suppliers
exports.searchContactsTool = new tools_1.DynamicStructuredTool({
    name: 'search_contacts',
    description: 'Search for contacts across all suppliers using name, email, title, or supplier information.',
    schema: zod_1.z.object({
        name: zod_1.z.string().optional().describe('Search by first or last name (partial match)'),
        email: zod_1.z.string().optional().describe('Search by email (partial match)'),
        title: zod_1.z.string().optional().describe('Search by job title (partial match)'),
        supplierId: zod_1.z.number().optional().describe('Filter by specific supplier ID'),
        supplierName: zod_1.z.string().optional().describe('Filter by supplier name (partial match)'),
        hasLinkedIn: zod_1.z.boolean().optional().describe('Filter contacts with LinkedIn profiles'),
        limit: zod_1.z.number().default(20).describe('Maximum number of results')
    }),
    func: async ({ name, email, title, supplierId, supplierName, hasLinkedIn, limit }) => {
        const where = {};
        if (name) {
            where.OR = [
                { firstName: { contains: name, mode: 'insensitive' } },
                { lastName: { contains: name, mode: 'insensitive' } }
            ];
        }
        if (email) {
            where.email = { contains: email, mode: 'insensitive' };
        }
        if (title) {
            where.title = { contains: title, mode: 'insensitive' };
        }
        if (supplierId) {
            where.supplierId = supplierId;
        }
        if (supplierName) {
            where.supplier = {
                name: { contains: supplierName, mode: 'insensitive' }
            };
        }
        if (hasLinkedIn !== undefined) {
            where.linkedinUrl = hasLinkedIn ? { not: null } : null;
        }
        const contacts = await database_1.prisma.contact.findMany({
            where,
            include: {
                supplier: true,
                _count: {
                    select: { interactions: true }
                }
            },
            orderBy: [
                { supplier: { name: 'asc' } },
                { firstName: 'asc' }
            ],
            take: limit
        });
        return JSON.stringify({
            contacts: contacts.map(contact => ({
                ...contact,
                interactionCount: contact._count.interactions
            })),
            total: contacts.length,
            searchCriteria: { name, email, title, supplierId, supplierName, hasLinkedIn }
        });
    }
});
//# sourceMappingURL=contact-tools.js.map