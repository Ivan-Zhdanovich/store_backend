import { Injectable } from '@nestjs/common';
import { SuppliersRepository } from './repositories/suppliers.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from './entities/supplier.entity';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private readonly suppliersRepository: SuppliersRepository,
  ) {}

  async findAll(): Promise<Supplier[]> {
    return this.suppliersRepository.find();
  }
}
