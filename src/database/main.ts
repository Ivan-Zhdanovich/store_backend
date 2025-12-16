import { TypeOrmModule } from '@nestjs/typeorm';
import { seeder } from 'nestjs-seeder';
import { Category } from 'src/modules/categories/entities/category.entity';
import { CategoriesSeeder } from './categories/categories.seeder';
import { Supplier } from 'src/modules/suppliers/entities/supplier.entity';
import { SuppliersSeeder } from './suppliers/suppliers.seeder';

seeder({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'storedb',
      entities: [Category, Supplier],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Category, Supplier]),
  ],
}).run([CategoriesSeeder, SuppliersSeeder]);
