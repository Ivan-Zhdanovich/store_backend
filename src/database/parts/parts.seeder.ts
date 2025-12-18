import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not } from 'typeorm';
import { Seeder } from 'nestjs-seeder';

import { faker } from '@faker-js/faker';
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
    const partsToCreate: Part[] = [];

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
      const part = this.partsRepository.create({
        cat_id: faker.number.int({ min: 1, max: 10 }),
        supplier_id: faker.number.int({ min: 1, max: 5 }),
        code:
          faker.string.alpha({ length: 3, casing: 'upper' }) +
          faker.string.numeric(5),
        name: `${faker.helpers.arrayElement(carParts)} ${faker.vehicle.manufacturer()}`,
        price: parseFloat(
          faker.commerce.price({ min: 500, max: 50000, dec: 2 }),
        ),
        in_stock: faker.helpers.arrayElement([0, 1]),
        is_new: newIndexes.includes(i) ? 1 : 0,
        is_sale: saleIndexes.includes(i) ? 1 : 0,
      });
      partsToCreate.push(part);
    }
    return this.partsRepository.save(partsToCreate);
  }

  async drop(): Promise<any> {
    return this.partsRepository.delete({ id: Not(IsNull()) });
  }
}
