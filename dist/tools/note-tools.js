"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.manageNoteTool = exports.searchNotesTool = exports.getNotesTool = exports.addNoteTool = void 0;
const tools_1 = require("@langchain/core/tools");
const zod_1 = require("zod");
const database_1 = require("../config/database");
// Add note to supplier
exports.addNoteTool = new tools_1.DynamicStructuredTool({
    name: 'add_note',
    description: 'Add a note to a supplier record. Useful for recording important information, decisions, or observations.',
    schema: zod_1.z.object({
        supplierId: zod_1.z.number().describe('The supplier ID to add the note to'),
        body: zod_1.z.string().describe('The note content'),
        authorId: zod_1.z.string().default('system').describe('The author of the note (user ID or system identifier)')
    }),
    func: async ({ supplierId, body, authorId }) => {
        // Verify supplier exists
        const supplier = await database_1.prisma.supplier.findUnique({
            where: { id: supplierId },
            select: { id: true, name: true }
        });
        if (!supplier) {
            return JSON.stringify({ error: 'Supplier not found' });
        }
        const note = await database_1.prisma.note.create({
            data: {
                supplierId,
                authorId,
                body
            },
            include: {
                supplier: {
                    select: { name: true }
                }
            }
        });
        return JSON.stringify({
            success: true,
            note,
            message: `Note added to ${note.supplier.name}`
        });
    }
});
// Get notes for supplier with search
exports.getNotesTool = new tools_1.DynamicStructuredTool({
    name: 'get_notes',
    description: 'Retrieve notes for a supplier with optional search and filtering capabilities.',
    schema: zod_1.z.object({
        supplierId: zod_1.z.number().describe('The supplier ID to get notes for'),
        searchText: zod_1.z.string().optional().describe('Search within note content (partial match)'),
        authorId: zod_1.z.string().optional().describe('Filter by specific author'),
        createdAfter: zod_1.z.string().optional().describe('Get notes created after this date (ISO string)'),
        createdBefore: zod_1.z.string().optional().describe('Get notes created before this date (ISO string)'),
        limit: zod_1.z.number().default(20).describe('Maximum number of notes to return')
    }),
    func: async ({ supplierId, searchText, authorId, createdAfter, createdBefore, limit }) => {
        const where = { supplierId };
        if (searchText) {
            where.body = { contains: searchText, mode: 'insensitive' };
        }
        if (authorId) {
            where.authorId = authorId;
        }
        if (createdAfter || createdBefore) {
            where.createdAt = {};
            if (createdAfter)
                where.createdAt.gte = new Date(createdAfter);
            if (createdBefore)
                where.createdAt.lte = new Date(createdBefore);
        }
        const notes = await database_1.prisma.note.findMany({
            where,
            include: {
                supplier: {
                    select: { name: true, domain: true }
                }
            },
            orderBy: { createdAt: 'desc' },
            take: limit
        });
        return JSON.stringify({
            notes,
            total: notes.length,
            supplier: notes[0]?.supplier || null,
            filters: { searchText, authorId, createdAfter, createdBefore }
        });
    }
});
// Search notes across all suppliers
exports.searchNotesTool = new tools_1.DynamicStructuredTool({
    name: 'search_notes',
    description: 'Search notes across all suppliers. Useful for finding information that spans multiple supplier relationships.',
    schema: zod_1.z.object({
        searchText: zod_1.z.string().describe('Text to search for in note content'),
        authorId: zod_1.z.string().optional().describe('Filter by specific author'),
        supplierName: zod_1.z.string().optional().describe('Filter by supplier name (partial match)'),
        createdAfter: zod_1.z.string().optional().describe('Get notes created after this date (ISO string)'),
        createdBefore: zod_1.z.string().optional().describe('Get notes created before this date (ISO string)'),
        limit: zod_1.z.number().default(30).describe('Maximum number of notes to return')
    }),
    func: async ({ searchText, authorId, supplierName, createdAfter, createdBefore, limit }) => {
        const where = {
            body: { contains: searchText, mode: 'insensitive' }
        };
        if (authorId) {
            where.authorId = authorId;
        }
        if (supplierName) {
            where.supplier = {
                name: { contains: supplierName, mode: 'insensitive' }
            };
        }
        if (createdAfter || createdBefore) {
            where.createdAt = {};
            if (createdAfter)
                where.createdAt.gte = new Date(createdAfter);
            if (createdBefore)
                where.createdAt.lte = new Date(createdBefore);
        }
        const notes = await database_1.prisma.note.findMany({
            where,
            include: {
                supplier: {
                    select: { id: true, name: true, domain: true, status: true, tier: true }
                }
            },
            orderBy: { createdAt: 'desc' },
            take: limit
        });
        // Group by supplier for better organization
        const notesBySupplier = notes.reduce((acc, note) => {
            const supplierKey = `${note.supplier.id}-${note.supplier.name}`;
            if (!acc[supplierKey]) {
                acc[supplierKey] = {
                    supplier: note.supplier,
                    notes: []
                };
            }
            acc[supplierKey].notes.push({
                id: note.id,
                body: note.body,
                authorId: note.authorId,
                createdAt: note.createdAt
            });
            return acc;
        }, {});
        return JSON.stringify({
            notesBySupplier: Object.values(notesBySupplier),
            totalNotes: notes.length,
            totalSuppliers: Object.keys(notesBySupplier).length,
            searchCriteria: { searchText, authorId, supplierName, createdAfter, createdBefore }
        });
    }
});
// Update or delete note
exports.manageNoteTool = new tools_1.DynamicStructuredTool({
    name: 'manage_note',
    description: 'Update or delete an existing note. Use with caution for delete operations.',
    schema: zod_1.z.object({
        action: zod_1.z.enum(['update', 'delete']).describe('Action to perform on the note'),
        noteId: zod_1.z.number().describe('The note ID to update or delete'),
        body: zod_1.z.string().optional().describe('New note content (required for update)'),
        reason: zod_1.z.string().optional().describe('Reason for the change (will be appended to note for update, or logged for delete)')
    }),
    func: async ({ action, noteId, body, reason }) => {
        // First, get the existing note
        const existingNote = await database_1.prisma.note.findUnique({
            where: { id: noteId },
            include: {
                supplier: {
                    select: { name: true }
                }
            }
        });
        if (!existingNote) {
            return JSON.stringify({ error: 'Note not found' });
        }
        switch (action) {
            case 'update':
                if (!body) {
                    throw new Error('Body is required for updating a note');
                }
                const updatedBody = reason ? `${body}\n\n[Updated: ${reason}]` : body;
                const updatedNote = await database_1.prisma.note.update({
                    where: { id: noteId },
                    data: { body: updatedBody },
                    include: {
                        supplier: {
                            select: { name: true }
                        }
                    }
                });
                return JSON.stringify({
                    success: true,
                    action: 'update',
                    note: updatedNote,
                    message: `Note updated for ${updatedNote.supplier.name}`
                });
            case 'delete':
                // If reason provided, create a new note documenting the deletion
                if (reason) {
                    await database_1.prisma.note.create({
                        data: {
                            supplierId: existingNote.supplierId,
                            authorId: 'system',
                            body: `Note deleted: ${reason}\nOriginal note (first 100 chars): ${existingNote.body.substring(0, 100)}...`
                        }
                    });
                }
                await database_1.prisma.note.delete({
                    where: { id: noteId }
                });
                return JSON.stringify({
                    success: true,
                    action: 'delete',
                    message: `Note deleted from ${existingNote.supplier.name}`,
                    documentationAdded: !!reason
                });
            default:
                throw new Error(`Invalid action: ${action}`);
        }
    }
});
//# sourceMappingURL=note-tools.js.map