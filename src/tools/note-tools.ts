import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import { prisma } from '../config/database';

// Add note to supplier
export const addNoteTool = new DynamicStructuredTool({
  name: 'add_note',
  description: 'Add a note to a supplier record. Useful for recording important information, decisions, or observations.',
  schema: z.object({
    supplierId: z.union([z.number(), z.string().transform(val => parseInt(val, 10))]).describe('The supplier ID to add the note to'),
    body: z.string().describe('The note content'),
    authorId: z.string().default('system').describe('The author of the note (user ID or system identifier)')
  }),
  func: async ({ supplierId, body, authorId }) => {
    // Verify supplier exists
    const supplier = await prisma.supplier.findUnique({
      where: { id: supplierId },
      select: { id: true, name: true }
    });

    if (!supplier) {
      return JSON.stringify({ error: 'Supplier not found' });
    }

    const note = await prisma.note.create({
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
export const getNotesTool = new DynamicStructuredTool({
  name: 'get_notes',
  description: 'Retrieve notes for a supplier with optional search and filtering capabilities.',
  schema: z.object({
    supplierId: z.union([z.number(), z.string().transform(val => parseInt(val, 10))]).describe('The supplier ID to get notes for'),
    searchText: z.string().optional().describe('Search within note content (partial match)'),
    authorId: z.string().optional().describe('Filter by specific author'),
    createdAfter: z.string().optional().describe('Get notes created after this date (ISO string)'),
    createdBefore: z.string().optional().describe('Get notes created before this date (ISO string)'),
    limit: z.union([z.number(), z.string().transform(val => parseInt(val, 10))]).default(20).describe('Maximum number of notes to return')
  }),
  func: async ({ supplierId, searchText, authorId, createdAfter, createdBefore, limit }) => {
    const where: any = { supplierId };

    if (searchText) {
      where.body = { contains: searchText, mode: 'insensitive' };
    }
    if (authorId) {
      where.authorId = authorId;
    }
    if (createdAfter || createdBefore) {
      where.createdAt = {};
      if (createdAfter) where.createdAt.gte = new Date(createdAfter);
      if (createdBefore) where.createdAt.lte = new Date(createdBefore);
    }

    const notes = await prisma.note.findMany({
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
export const searchNotesTool = new DynamicStructuredTool({
  name: 'search_notes',
  description: 'Search notes across all suppliers. Useful for finding information that spans multiple supplier relationships.',
  schema: z.object({
    searchText: z.string().describe('Text to search for in note content'),
    authorId: z.string().optional().describe('Filter by specific author'),
    supplierName: z.string().optional().describe('Filter by supplier name (partial match)'),
    createdAfter: z.string().optional().describe('Get notes created after this date (ISO string)'),
    createdBefore: z.string().optional().describe('Get notes created before this date (ISO string)'),
    limit: z.union([z.number(), z.string().transform(val => parseInt(val, 10))]).default(30).describe('Maximum number of notes to return')
  }),
  func: async ({ searchText, authorId, supplierName, createdAfter, createdBefore, limit }) => {
    const where: any = {
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
      if (createdAfter) where.createdAt.gte = new Date(createdAfter);
      if (createdBefore) where.createdAt.lte = new Date(createdBefore);
    }

    const notes = await prisma.note.findMany({
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
    }, {} as Record<string, any>);

    return JSON.stringify({
      notesBySupplier: Object.values(notesBySupplier),
      totalNotes: notes.length,
      totalSuppliers: Object.keys(notesBySupplier).length,
      searchCriteria: { searchText, authorId, supplierName, createdAfter, createdBefore }
    });
  }
});

// Update or delete note
export const manageNoteTool = new DynamicStructuredTool({
  name: 'manage_note',
  description: 'Update or delete an existing note. Use with caution for delete operations.',
  schema: z.object({
    action: z.enum(['update', 'delete']).describe('Action to perform on the note'),
    noteId: z.number().describe('The note ID to update or delete'),
    body: z.string().optional().describe('New note content (required for update)'),
    reason: z.string().optional().describe('Reason for the change (will be appended to note for update, or logged for delete)')
  }),
  func: async ({ action, noteId, body, reason }) => {
    // First, get the existing note
    const existingNote = await prisma.note.findUnique({
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
        
        const updatedNote = await prisma.note.update({
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
          await prisma.note.create({
            data: {
              supplierId: existingNote.supplierId,
              authorId: 'system',
              body: `Note deleted: ${reason}\nOriginal note (first 100 chars): ${existingNote.body.substring(0, 100)}...`
            }
          });
        }

        await prisma.note.delete({
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
