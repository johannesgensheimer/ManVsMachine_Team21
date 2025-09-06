import { z } from 'zod';
import { prisma } from '../config/database';
import { SupplierSearchFilters, CreateSupplierInput } from '../types/database';

// Tool function implementations
export async function getSupplierOverview({ supplierId, domain, includeDays = 30, includeNotes = true }: {
  supplierId?: number;
  domain?: string;
  includeDays?: number;
  includeNotes?: boolean;
}) {
  if (!supplierId && !domain) {
    throw new Error('Either supplierId or domain must be provided');
  }

  const supplier = await prisma.supplier.findFirst({
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
      }, {} as Record<string, number>)
    }
  });
}

export async function searchSuppliers({ name, domain, status, tier, createdAfter, createdBefore, limit = 20 }: {
  name?: string;
  domain?: string;
  status?: string;
  tier?: string;
  createdAfter?: string;
  createdBefore?: string;
  limit?: number;
}) {
  const where: any = {};

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
    if (createdAfter) where.createdAt.gte = new Date(createdAfter);
    if (createdBefore) where.createdAt.lte = new Date(createdBefore);
  }

  const suppliers = await prisma.supplier.findMany({
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

export async function updateSupplierStatus({ supplierId, status, tier, reason }: {
  supplierId: number;
  status?: string;
  tier?: string;
  reason?: string;
}) {
  if (!status && !tier) {
    throw new Error('Either status or tier must be provided');
  }

  const updateData: any = {};
  if (status) updateData.status = status;
  if (tier) updateData.tier = tier;

  const updatedSupplier = await prisma.supplier.update({
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
    await prisma.note.create({
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

export async function createSupplier({ name, domain, status = 'pending', tier = 'bronze', initialNote }: {
  name: string;
  domain: string;
  status?: string;
  tier?: string;
  initialNote?: string;
}) {
  const newSupplier = await prisma.supplier.create({
    data: {
      name,
      domain,
      status,
      tier
    }
  });

  // Add initial note if provided
  if (initialNote) {
    await prisma.note.create({
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

export async function deleteSupplier({ supplierId, reason }: {
  supplierId: number;
  reason?: string;
}) {
  // First, get the existing supplier with counts for confirmation
  const existingSupplier = await prisma.supplier.findUnique({
    where: { id: supplierId },
    include: {
      _count: {
        select: {
          contacts: true,
          interactions: true,
          notes: true
        }
      }
    }
  });

  if (!existingSupplier) {
    return JSON.stringify({ error: 'Supplier not found' });
  }

  // Create a deletion log note if reason provided
  if (reason) {
    await prisma.note.create({
      data: {
        supplierId,
        authorId: 'system',
        body: `Supplier deletion initiated: ${reason}. Supplier: ${existingSupplier.name} (${existingSupplier.domain}). Related data: ${existingSupplier._count.contacts} contacts, ${existingSupplier._count.interactions} interactions, ${existingSupplier._count.notes} notes.`
      }
    });
  }

  // Delete the supplier (cascade will handle related records)
  await prisma.supplier.delete({
    where: { id: supplierId }
  });

  return JSON.stringify({
    success: true,
    action: 'delete',
    message: `Supplier "${existingSupplier.name}" (${existingSupplier.domain}) deleted successfully`,
    deletedCounts: {
      contacts: existingSupplier._count.contacts,
      interactions: existingSupplier._count.interactions,
      notes: existingSupplier._count.notes + (reason ? 1 : 0) // +1 for deletion log if created
    },
    documentationAdded: !!reason
  });
}

// OpenAI Function Definitions
export const supplierFunctions = [
  {
    name: 'get_supplier_overview',
    description: 'Get complete supplier information including contacts, recent interactions, and notes. Use supplier ID or domain to find the supplier.',
    parameters: {
      type: 'object',
      properties: {
        supplierId: {
          type: 'number',
          description: 'The supplier ID'
        },
        domain: {
          type: 'string',
          description: 'The supplier domain (e.g., "acme.com")'
        },
        includeDays: {
          type: 'number',
          description: 'Number of days of interaction history to include',
          default: 30
        },
        includeNotes: {
          type: 'boolean',
          description: 'Whether to include recent notes',
          default: true
        }
      }
    }
  },
  {
    name: 'search_suppliers',
    description: 'Search for suppliers using various filters like name, domain, status, tier, or creation date.',
    parameters: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Search by supplier name (partial match)'
        },
        domain: {
          type: 'string',
          description: 'Search by domain (partial match)'
        },
        status: {
          type: 'string',
          description: 'Filter by status (e.g., "active", "inactive")'
        },
        tier: {
          type: 'string',
          description: 'Filter by tier (e.g., "gold", "silver", "bronze")'
        },
        createdAfter: {
          type: 'string',
          description: 'Find suppliers created after this date (ISO string)'
        },
        createdBefore: {
          type: 'string',
          description: 'Find suppliers created before this date (ISO string)'
        },
        limit: {
          type: 'number',
          description: 'Maximum number of results to return',
          default: 20
        }
      }
    }
  },
  {
    name: 'update_supplier_status',
    description: 'Update a supplier\'s status or tier. Useful for managing supplier relationships.',
    parameters: {
      type: 'object',
      properties: {
        supplierId: {
          type: 'number',
          description: 'The supplier ID to update'
        },
        status: {
          type: 'string',
          description: 'New status (e.g., "active", "inactive", "pending")'
        },
        tier: {
          type: 'string',
          description: 'New tier (e.g., "gold", "silver", "bronze")'
        },
        reason: {
          type: 'string',
          description: 'Reason for the update (will be added as a note)'
        }
      },
      required: ['supplierId']
    }
  },
  {
    name: 'create_supplier',
    description: 'Create a new supplier record with basic information.',
    parameters: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Supplier company name'
        },
        domain: {
          type: 'string',
          description: 'Supplier domain (e.g., "acme.com")'
        },
        status: {
          type: 'string',
          description: 'Initial status',
          default: 'pending'
        },
        tier: {
          type: 'string',
          description: 'Initial tier',
          default: 'bronze'
        },
        initialNote: {
          type: 'string',
          description: 'Optional initial note about the supplier'
        }
      },
      required: ['name', 'domain']
    }
  },
  {
    name: 'delete_supplier',
    description: 'Delete a supplier and all related data (contacts, interactions, notes). Use with extreme caution as this action cannot be undone.',
    parameters: {
      type: 'object',
      properties: {
        supplierId: {
          type: 'number',
          description: 'The supplier ID to delete'
        },
        reason: {
          type: 'string',
          description: 'Reason for deletion (will be logged as a note before deletion for audit trail)'
        }
      },
      required: ['supplierId']
    }
  }
];