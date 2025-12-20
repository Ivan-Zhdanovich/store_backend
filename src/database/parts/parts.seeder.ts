import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not } from 'typeorm';
import { Seeder } from 'nestjs-seeder';

import { faker } from '@faker-js/faker';
import { Part } from 'src/modules/parts/entities/part.entity';
import { PartsRepository } from 'src/modules/parts/repositories/parts.repository';
import { Category } from 'src/modules/categories/entities/category.entity';
import { Supplier } from 'src/modules/suppliers/entities/supplier.entity';

@Injectable()
export class PartsSeeder implements Seeder {
  constructor(
    @InjectRepository(Part)
    private readonly partsRepository: PartsRepository,
  ) {}

  async seed(): Promise<any> {
    const categories = await this.partsRepository.manager.find(Category);
    const suppliers = await this.partsRepository.manager.find(Supplier);

    if (categories.length === 0 || suppliers.length === 0) {
      return;
    }

    const totalParts = 100;
    const partsToCreate: Partial<Part>[] = [];

    const newIndexes = faker.helpers
      .shuffle(Array.from({ length: 100 }, (_, i) => i))
      .slice(0, 10);
    const saleIndexes = faker.helpers
      .shuffle(Array.from({ length: 100 }, (_, i) => i))
      .slice(0, 10);

    const carParts = [
      'Фильтр масляный',
      'Тормозные колодки',
      'Свеча зажигания',
      'Ремень ГРМ',
      'Амортизатор передний',
      'Подшипник ступицы',
      'Стойка стабилизатора',
      'Радиатор охлаждения',
      'Фара левая',
      'Генератор',
      'Стартер',
      'Диск тормозной',
    ];

    for (let i = 0; i < totalParts; i++) {
      const randomCategory = faker.helpers.arrayElement(categories);
      const randomSupplier = faker.helpers.arrayElement(suppliers);
      const partData = {
        category: { id: randomCategory.id },
        supplier: { id: randomSupplier.id },

        code:
          faker.string.alpha({ length: 3, casing: 'upper' }) +
          faker.string.numeric(5),
        name: `${faker.helpers.arrayElement(carParts)} ${faker.vehicle.manufacturer()}`,
        price: parseFloat(
          faker.commerce.price({ min: 500, max: 50000, dec: 2 }),
        ),
        in_stock: faker.datatype.boolean(),
        is_new: newIndexes.includes(i),
        is_sale: saleIndexes.includes(i),
      };

      const part = this.partsRepository.create(partData);
      partsToCreate.push(part);
    }
    for (const partData of partsToCreate) {
      await this.partsRepository.save(partData);
    }
  }

  async drop(): Promise<any> {
    return this.partsRepository.delete({ id: Not(IsNull()) });
  }
}
