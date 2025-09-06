import { Supplier, Contact, Interaction, Note } from '@prisma/client';
export type SupplierWithRelations = Supplier & {
    contacts?: Contact[];
    interactions?: (Interaction & {
        contact?: Contact | null;
    })[];
    notes?: Note[];
};
export type ContactWithSupplier = Contact & {
    supplier: Supplier;
    interactions?: Interaction[];
};
export type InteractionWithRelations = Interaction & {
    supplier: Supplier;
    contact?: Contact | null;
};
export interface CreateSupplierInput {
    name: string;
    domain: string;
    status: string;
    tier: string;
}
export interface CreateContactInput {
    supplierId: number;
    firstName: string;
    lastName: string;
    title?: string;
    email: string;
    phone?: string;
    linkedinUrl?: string;
}
export interface CreateInteractionInput {
    supplierId: number;
    contactId?: number;
    channel: string;
    summary: string;
    sentiment: string;
    occurredAt: Date;
    slackThreadId?: string;
}
export interface CreateNoteInput {
    supplierId: number;
    authorId: string;
    body: string;
}
export interface SupplierSearchFilters {
    name?: string;
    domain?: string;
    status?: string;
    tier?: string;
    createdAfter?: Date;
    createdBefore?: Date;
}
export interface InteractionSearchFilters {
    supplierId?: number;
    contactId?: number;
    channel?: string;
    sentiment?: string;
    occurredAfter?: Date;
    occurredBefore?: Date;
    limit?: number;
}
//# sourceMappingURL=database.d.ts.map