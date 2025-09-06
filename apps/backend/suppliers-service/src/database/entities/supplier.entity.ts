import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum SupplierStatus {
  RESEARCHING = 'Researching',
  CONTACTED = 'Contacted',
  IN_NEGOTIATION = 'In Negotiation',
  ON_HOLD = 'On Hold',
  ACTIVE = 'Active'
}

@Entity('suppliers')
export class Supplier {
  @PrimaryColumn()
  supplierName: string;

  @Column({
    type: 'varchar',
    enum: SupplierStatus,
    default: SupplierStatus.RESEARCHING
  })
  status: SupplierStatus;

  @Column({ nullable: true })
  primaryContact: string;

  @Column({ nullable: true })
  contactEmail: string;

  @Column({ type: 'text', nullable: true })
  procurementNeed: string;

  @Column({ type: 'text', nullable: true })
  tags: string; // JSON string for multiple tags

  @Column({ type: 'date', nullable: true })
  nextFollowUpDate: Date;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}