import { Controller, Get } from '@nestjs/common';
import { Supplier } from './entities/supplier.entity';
import { SuppliersService } from './suppliers.service';

@Controller('suppliers')
export class SuppliersController {
  constructor(private suppliersService: SuppliersService) {}

  @Get()
  findAll(): Promise<Supplier[]> {
    return this.suppliersService.findAll();
  }
}
