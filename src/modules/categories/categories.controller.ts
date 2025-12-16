import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';

@Controller('api/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findRoots(): Promise<Category[]> {
    return this.categoriesService.findRootCategories();
  }

  @Get(':id/children')
  findChildren(@Param('id', ParseIntPipe) id: number): Promise<Category[]> {
    return this.categoriesService.findChildren(id);
  }
}
