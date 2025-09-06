import { IsString, IsOptional, IsEmail, IsEnum, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SupplierStatus } from '../../database/entities/supplier.entity';

export class CreateSupplierDto {
  @ApiProperty({ description: 'Supplier name (unique identifier)' })
  @IsString()
  supplierName: string;

  @ApiPropertyOptional({ enum: SupplierStatus, description: 'Current status' })
  @IsOptional()
  @IsEnum(SupplierStatus)
  status?: SupplierStatus;

  @ApiPropertyOptional({ description: 'Primary contact person' })
  @IsOptional()
  @IsString()
  primaryContact?: string;

  @ApiPropertyOptional({ description: 'Contact email address' })
  @IsOptional()
  @IsEmail()
  contactEmail?: string;

  @ApiPropertyOptional({ description: 'Procurement need description' })
  @IsOptional()
  @IsString()
  procurementNeed?: string;

  @ApiPropertyOptional({ description: 'Tags for classification' })
  @IsOptional()
  @IsString()
  tags?: string;

  @ApiPropertyOptional({ description: 'Next follow-up date' })
  @IsOptional()
  @IsDateString()
  nextFollowUpDate?: string;

  @ApiPropertyOptional({ description: 'Additional notes' })
  @IsOptional()
  @IsString()
  notes?: string;
}