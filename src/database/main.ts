import { TypeOrmModule } from '@nestjs/typeorm';
import { seeder } from 'nestjs-seeder';
import { Category } from 'src/modules/categories/entities/category.entity';
import { CategoriesSeeder } from './categories/categories.seeder';
import { Supplier } from 'src/modules/suppliers/entities/supplier.entity';
import { SuppliersSeeder } from './suppliers/suppliers.seeder';
import { Part } from 'src/modules/parts/entities/part.entity';
import { PartsSeeder } from './parts/parts.seeder';
import * as dotenv from 'dotenv';

dotenv.config();

seeder({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Category, Supplier, Part],
      // synchronize: true,
    }),
    TypeOrmModule.forFeature([Category, Supplier, Part]),
  ],
}).run([CategoriesSeeder, SuppliersSeeder, PartsSeeder]);
