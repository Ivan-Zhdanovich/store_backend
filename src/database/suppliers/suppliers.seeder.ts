import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Supplier } from 'src/modules/suppliers/entities/supplier.entity';
import { SuppliersRepository } from 'src/modules/suppliers/repositories/suppliers.repository';
import { suppliersData } from './suppliers.data';
import { IsNull, Not } from 'typeorm';

@Injectable()
export class SuppliersSeeder implements Seeder {
  constructor(
    @InjectRepository(Supplier)
    private readonly suppliersRepository: SuppliersRepository,
  ) {}

  async seed(): Promise<any> {
    return this.suppliersRepository.save(suppliersData);
  }

  async drop(): Promise<any> {
    return this.suppliersRepository.delete({ id: Not(IsNull()) });
  }
}
