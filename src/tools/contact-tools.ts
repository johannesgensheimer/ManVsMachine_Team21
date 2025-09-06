import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import { prisma } from '../config/database';

// Manage contacts (create, update, get)
export const manageContactTool = new DynamicStructuredTool({
  name: 'manage_contact',
  description: 'Create, update, or retrieve contact information for suppliers. Can handle all contact CRUD operations.',
  schema: z.object({
    action: z.enum(['create', 'update', 'get', 'delete']).describe('The action to perform'),
    contactId: z.union([z.number(), z.string().transform(val => parseInt(val, 10))]).optional().describe('Contact ID (required for update, get, delete)'),
    supplierId: z.union([z.number(), z.string().transform(val => parseInt(val, 10))]).optional().describe('Supplier ID (required for create)'),
    firstName: z.string().optional().describe('Contact first name'),
    lastName: z.string().optional().describe('Contact last name'),
    title: z.string().optional().describe('Contact job title'),
    email: z.string().optional().describe('Contact email address'),
    phone: z.string().optional().describe('Contact phone number'),
    linkedinUrl: z.string().optional().describe('Contact LinkedIn profile URL')
  }),
  func: async ({ action, contactId, supplierId, firstName, lastName, title, email, phone, linkedinUrl }) => {
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
});

// Search contacts across suppliers
export const searchContactsTool = new DynamicStructuredTool({
  name: 'search_contacts',
  description: 'Search for contacts across all suppliers using name, email, title, or supplier information.',
  schema: z.object({
    name: z.string().optional().describe('Search by first or last name (partial match)'),
    email: z.string().optional().describe('Search by email (partial match)'),
    title: z.string().optional().describe('Search by job title (partial match)'),
    supplierId: z.union([z.number(), z.string().transform(val => parseInt(val, 10))]).optional().describe('Filter by specific supplier ID'),
    supplierName: z.string().optional().describe('Filter by supplier name (partial match)'),
    hasLinkedIn: z.boolean().optional().describe('Filter contacts with LinkedIn profiles'),
    limit: z.union([z.number(), z.string().transform(val => parseInt(val, 10))]).default(20).describe('Maximum number of results')
  }),
  func: async ({ name, email, title, supplierId, supplierName, hasLinkedIn, limit }) => {
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
});
