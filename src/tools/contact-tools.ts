import { z } from 'zod';
import { prisma } from '../config/database';

// Tool function implementations
export async function manageContact({ action, contactId, supplierId, firstName, lastName, title, email, phone, linkedinUrl }: {
  action: 'create' | 'update' | 'get' | 'delete';
  contactId?: number;
  supplierId?: number;
  firstName?: string;
  lastName?: string;
  title?: string;
  email?: string;
  phone?: string;
  linkedinUrl?: string;
}) {
  switch (action) {
    case 'create':
      if (!supplierId || !firstName || !lastName || !email) {
        throw new Error('supplierId, firstName, lastName, and email are required for creating a contact');
      }
      
      const newContact = await prisma.contact.create({
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
      
      const updateData: any = {};
      if (firstName) updateData.firstName = firstName;
      if (lastName) updateData.lastName = lastName;
      if (title !== undefined) updateData.title = title;
      if (email) updateData.email = email;
      if (phone !== undefined) updateData.phone = phone;
      if (linkedinUrl !== undefined) updateData.linkedinUrl = linkedinUrl;
      
      const updatedContact = await prisma.contact.update({
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
      
      const contact = await prisma.contact.findUnique({
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
      
      const deletedContact = await prisma.contact.delete({
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

export async function searchContacts({ name, email, title, supplierId, supplierName, hasLinkedIn, limit = 20 }: {
  name?: string;
  email?: string;
  title?: string;
  supplierId?: number;
  supplierName?: string;
  hasLinkedIn?: boolean;
  limit?: number;
}) {
  const where: any = {};

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

  const contacts = await prisma.contact.findMany({
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

// OpenAI Function Definitions
export const contactFunctions = [
  {
    name: 'manage_contact',
    description: 'Create, update, or retrieve contact information for suppliers. Can handle all contact CRUD operations.',
    parameters: {
      type: 'object',
      properties: {
        action: {
          type: 'string',
          enum: ['create', 'update', 'get', 'delete'],
          description: 'The action to perform'
        },
        contactId: {
          type: 'number',
          description: 'Contact ID (required for update, get, delete)'
        },
        supplierId: {
          type: 'number',
          description: 'Supplier ID (required for create)'
        },
        firstName: {
          type: 'string',
          description: 'Contact first name'
        },
        lastName: {
          type: 'string',
          description: 'Contact last name'
        },
        title: {
          type: 'string',
          description: 'Contact job title'
        },
        email: {
          type: 'string',
          description: 'Contact email address'
        },
        phone: {
          type: 'string',
          description: 'Contact phone number'
        },
        linkedinUrl: {
          type: 'string',
          description: 'Contact LinkedIn profile URL'
        }
      },
      required: ['action']
    }
  },
  {
    name: 'search_contacts',
    description: 'Search for contacts across all suppliers using name, email, title, or supplier information.',
    parameters: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Search by first or last name (partial match)'
        },
        email: {
          type: 'string',
          description: 'Search by email (partial match)'
        },
        title: {
          type: 'string',
          description: 'Search by job title (partial match)'
        },
        supplierId: {
          type: 'number',
          description: 'Filter by specific supplier ID'
        },
        supplierName: {
          type: 'string',
          description: 'Filter by supplier name (partial match)'
        },
        hasLinkedIn: {
          type: 'boolean',
          description: 'Filter contacts with LinkedIn profiles'
        },
        limit: {
          type: 'number',
          description: 'Maximum number of results',
          default: 20
        }
      }
    }
  }
];