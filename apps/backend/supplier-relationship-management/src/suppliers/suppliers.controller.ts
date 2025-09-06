import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Supplier } from '../database/entities/supplier.entity';

@ApiTags('suppliers')
@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new supplier' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The supplier has been successfully created.',
    type: Supplier,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async create(@Body() createSupplierDto: CreateSupplierDto): Promise<Supplier> {
    return await this.suppliersService.create(createSupplierDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all suppliers' })
  @ApiQuery({ name: 'status', required: false, description: 'Filter by status' })
  @ApiQuery({ name: 'search', required: false, description: 'Search suppliers' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return all suppliers.',
    type: [Supplier],
  })
  async findAll(
    @Query('status') status?: string,
    @Query('search') search?: string,
  ): Promise<Supplier[]> {
    if (status) {
      return await this.suppliersService.findByStatus(status);
    }
    
    if (search) {
      return await this.suppliersService.search(search);
    }
    
    return await this.suppliersService.findAll();
  }

  @Get(':supplierName')
  @ApiOperation({ summary: 'Get supplier by name' })
  @ApiParam({ name: 'supplierName', description: 'Supplier name' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return the supplier.',
    type: Supplier,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Supplier not found' })
  async findOne(@Param('supplierName') supplierName: string): Promise<Supplier> {
    return await this.suppliersService.findOne(supplierName);
  }

  @Patch(':supplierName')
  @ApiOperation({ summary: 'Update supplier' })
  @ApiParam({ name: 'supplierName', description: 'Supplier name' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The supplier has been successfully updated.',
    type: Supplier,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Supplier not found' })
  async update(
    @Param('supplierName') supplierName: string,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ): Promise<Supplier> {
    return await this.suppliersService.update(supplierName, updateSupplierDto);
  }

  @Delete(':supplierName')
  @ApiOperation({ summary: 'Delete supplier' })
  @ApiParam({ name: 'supplierName', description: 'Supplier name' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The supplier has been successfully deleted.',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Supplier not found' })
  async remove(@Param('supplierName') supplierName: string): Promise<void> {
    await this.suppliersService.remove(supplierName);
  }
}