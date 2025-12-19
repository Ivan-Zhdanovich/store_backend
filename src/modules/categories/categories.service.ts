import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { CategoriesRepository } from './repositories/categories.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: CategoriesRepository,
  ) {}

  async findRootCategories(): Promise<Category[]> {
    return this.categoriesRepository.find({
      where: { parent_id: IsNull() },
      relations: ['children'],
    });
  }

  async findChildren(id: number): Promise<Category[]> {
    const parentCategory = await this.categoriesRepository.findOne({
      where: { id: id },
      relations: ['children'],
    });

    if (!parentCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return parentCategory.children;
  }
}
