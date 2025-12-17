import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Part } from 'src/modules/parts/entities/part.entity';
import { PartsRepository } from 'src/modules/parts/repositories/parts.repository';

@Injectable()
export class PartsSeeder implements Seeder {
  constructor(
    @InjectRepository(Part)
    private readonly partsRepository: PartsRepository,
  ) {}

  async seed(): Promise<any> {
    const totalParts = 100;
    const newCount = 10;
    const saleCount = 10;
    const partsToCreate: Part[] = [];

    const indexes = Array.from({ length: totalParts }, (_, i) => i);
    faker.helpers.shuffle(indexes);

    const newIndexes = new Set(indexes.slice(0, newCount));
    const saleIndexes = new Set(indexes.slice(newCount, newCount + saleCount));

    for (let i = 0; i < totalParts; i++) {
      const part = this.partsRepository.create({
        cat_id: faker.number.int({ min: 1, max: 10 }),
        supplier_id: faker.number.int({ min: 1, max: 5 }),
        code: faker.commerce.isbn(10),
        name: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price({ min: 10, max: 1000 })),
        in_stock: faker.helpers.arrayElement([0, 1]),
        is_new: newIndexes.has(i) ? 1 : 0,
        is_sale: saleIndexes.has(i) ? 1 : 0,
      });
      partsToCreate.push(part);
    }
    return this.partsRepository.save(partsToCreate);
  }

  async drop(): Promise<any> {
    return this.partsRepository.delete({});
  }
}
