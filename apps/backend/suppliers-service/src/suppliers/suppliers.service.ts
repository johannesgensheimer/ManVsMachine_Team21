import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from '../database/entities/supplier.entity';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
  ) {}

  async create(createSupplierDto: CreateSupplierDto): Promise<Supplier> {
    const supplier = this.supplierRepository.create({
      ...createSupplierDto,
      nextFollowUpDate: createSupplierDto.nextFollowUpDate 
        ? new Date(createSupplierDto.nextFollowUpDate)
        : null,
    });
    
    return await this.supplierRepository.save(supplier);
  }

  async findAll(): Promise<Supplier[]> {
    return await this.supplierRepository.find({
      order: { createdAt: 'DESC' }
    });
  }

  async findOne(supplierName: string): Promise<Supplier> {
    const supplier = await this.supplierRepository.findOne({
      where: { supplierName }
    });
    
    if (!supplier) {
      throw new NotFoundException(`Supplier with name "${supplierName}" not found`);
    }
    
    return supplier;
  }

  async update(supplierName: string, updateSupplierDto: UpdateSupplierDto): Promise<Supplier> {
    const supplier = await this.findOne(supplierName);
    
    const updateData = {
      ...updateSupplierDto,
      nextFollowUpDate: updateSupplierDto.nextFollowUpDate
        ? new Date(updateSupplierDto.nextFollowUpDate)
        : supplier.nextFollowUpDate,
    };
    
    await this.supplierRepository.update({ supplierName }, updateData);
    
    return await this.findOne(supplierName);
  }

  async remove(supplierName: string): Promise<void> {
    const supplier = await this.findOne(supplierName);
    await this.supplierRepository.remove(supplier);
  }

  async findByStatus(status: string): Promise<Supplier[]> {
    return await this.supplierRepository.find({
      where: { status: status as any },
      order: { createdAt: 'DESC' }
    });
  }

  async search(searchTerm: string): Promise<Supplier[]> {
    return await this.supplierRepository
      .createQueryBuilder('supplier')
      .where('supplier.supplierName LIKE :search', { search: `%${searchTerm}%` })
      .orWhere('supplier.primaryContact LIKE :search', { search: `%${searchTerm}%` })
      .orWhere('supplier.procurementNeed LIKE :search', { search: `%${searchTerm}%` })
      .orWhere('supplier.tags LIKE :search', { search: `%${searchTerm}%` })
      .orderBy('supplier.createdAt', 'DESC')
      .getMany();
  }
}