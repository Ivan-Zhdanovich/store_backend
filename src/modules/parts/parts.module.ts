import { Module } from '@nestjs/common';
import { Part } from './entities/part.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartsService } from './parts.service';
import { CategoriesController } from '../categories/categories.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Part])],
  providers: [PartsService],
  controllers: [CategoriesController],
})
export class PartsModule {}
