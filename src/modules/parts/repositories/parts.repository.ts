import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Part } from '../entities/part.entity';

@Injectable()
export class PartsRepository extends Repository<Part> {
  constructor(private dataSource: DataSource) {
    super(Part, dataSource.createEntityManager());
  }
}
