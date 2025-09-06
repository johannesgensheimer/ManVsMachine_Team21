import { z } from 'zod';
import { prisma } from '../config/database';

// Tool function implementations
export async function addNote({ supplierId, body, authorId = 'system' }: {
  supplierId: number;
  body: string;
  authorId?: string;
}) {
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

export async function getNotes({ supplierId, searchText, authorId, createdAfter, createdBefore, limit = 20 }: {
  supplierId: number;
  searchText?: string;
  authorId?: string;
  createdAfter?: string;
  createdBefore?: string;
  limit?: number;
}) {
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

export async function searchNotes({ searchText, authorId, supplierName, createdAfter, createdBefore, limit = 30 }: {
  searchText: string;
  authorId?: string;
  supplierName?: string;
  createdAfter?: string;
  createdBefore?: string;
  limit?: number;
}) {
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

export async function manageNote({ action, noteId, body, reason }: {
  action: 'update' | 'delete';
  noteId: number;
  body?: string;
  reason?: string;
}) {
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

// OpenAI Function Definitions
export const noteFunctions = [
  {
    name: 'add_note',
    description: 'Add a note to a supplier record. Useful for recording important information, decisions, or observations.',
    parameters: {
      type: 'object',
      properties: {
        supplierId: {
          type: 'number',
          description: 'The supplier ID to add the note to'
        },
        body: {
          type: 'string',
          description: 'The note content'
        },
        authorId: {
          type: 'string',
          description: 'The author of the note (user ID or system identifier)',
          default: 'system'
        }
      },
      required: ['supplierId', 'body']
    }
  },
  {
    name: 'get_notes',
    description: 'Retrieve notes for a supplier with optional search and filtering capabilities.',
    parameters: {
      type: 'object',
      properties: {
        supplierId: {
          type: 'number',
          description: 'The supplier ID to get notes for'
        },
        searchText: {
          type: 'string',
          description: 'Search within note content (partial match)'
        },
        authorId: {
          type: 'string',
          description: 'Filter by specific author'
        },
        createdAfter: {
          type: 'string',
          description: 'Get notes created after this date (ISO string)'
        },
        createdBefore: {
          type: 'string',
          description: 'Get notes created before this date (ISO string)'
        },
        limit: {
          type: 'number',
          description: 'Maximum number of notes to return',
          default: 20
        }
      },
      required: ['supplierId']
    }
  },
  {
    name: 'search_notes',
    description: 'Search notes across all suppliers. Useful for finding information that spans multiple supplier relationships.',
    parameters: {
      type: 'object',
      properties: {
        searchText: {
          type: 'string',
          description: 'Text to search for in note content'
        },
        authorId: {
          type: 'string',
          description: 'Filter by specific author'
        },
        supplierName: {
          type: 'string',
          description: 'Filter by supplier name (partial match)'
        },
        createdAfter: {
          type: 'string',
          description: 'Get notes created after this date (ISO string)'
        },
        createdBefore: {
          type: 'string',
          description: 'Get notes created before this date (ISO string)'
        },
        limit: {
          type: 'number',
          description: 'Maximum number of notes to return',
          default: 30
        }
      },
      required: ['searchText']
    }
  },
  {
    name: 'manage_note',
    description: 'Update or delete an existing note. Use with caution for delete operations.',
    parameters: {
      type: 'object',
      properties: {
        action: {
          type: 'string',
          enum: ['update', 'delete'],
          description: 'Action to perform on the note'
        },
        noteId: {
          type: 'number',
          description: 'The note ID to update or delete'
        },
        body: {
          type: 'string',
          description: 'New note content (required for update)'
        },
        reason: {
          type: 'string',
          description: 'Reason for the change (will be appended to note for update, or logged for delete)'
        }
      },
      required: ['action', 'noteId']
    }
  }
];