import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Supplier } from '../entities/supplier.entity';

@Injectable()
export class SuppliersRepository extends Repository<Supplier> {
  constructor(private dataSource: DataSource) {
    super(Supplier, dataSource.createEntityManager());
  }
}
