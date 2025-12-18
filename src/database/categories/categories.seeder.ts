import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Category } from 'src/modules/categories/entities/category.entity';
import { CategoriesRepository } from 'src/modules/categories/repositories/categories.repository';
import { categoriesPayload } from './categories.data';
import { IsNull, Not } from 'typeorm';

@Injectable()
export class CategoriesSeeder implements Seeder {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: CategoriesRepository,
  ) {}

  async seed(): Promise<any> {
    for (const item of categoriesPayload) {
      const parent = await this.categoriesRepository.save({
        name: item.name,
        parent_id: null,
      });

      const children = item.children.map((childName) => ({
        name: childName,
        parent_id: parent.id,
      }));
      await this.categoriesRepository.save(children);
    }
  }

  async drop(): Promise<any> {
    return this.categoriesRepository.delete({ id: Not(IsNull()) });
  }
}
