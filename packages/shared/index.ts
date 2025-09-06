// Shared types and utilities will be defined here
export interface SupplierStatus {
  RESEARCHING: 'Researching';
  CONTACTED: 'Contacted';
  IN_NEGOTIATION: 'In Negotiation';
  ON_HOLD: 'On Hold';
  ACTIVE: 'Active';
}

export interface ISupplier {
  supplierName: string;
  status: keyof SupplierStatus;
  primaryContact?: string;
  contactEmail?: string;
  procurementNeed?: string;
  tags?: string;
  nextFollowUpDate?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}