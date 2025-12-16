import { IsDefined, IsNotEmpty } from 'class-validator';
import { Category } from 'src/modules/categories/entities/category.entity';
import { Supplier } from 'src/modules/suppliers/entities/supplier.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Parts')
export class Part {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsDefined()
  cat_id: number;

  @Column()
  supplier_id: number;

  @Index()
  @Column({ type: 'varchar', length: 50 })
  @IsNotEmpty()
  code: string;

  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @IsDefined()
  price: number;

  @Column({ type: 'tinyint', width: 1, default: 0 })
  in_stock: number;

  @Column({ type: 'tinyint', width: 4, default: 0 })
  is_new: number;

  @Column({ type: 'tinyint', width: 1, default: 0 })
  is_sale: number;

  @ManyToMany(() => Category, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'cat_id' })
  category: Category;

  @ManyToMany(() => Supplier, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'supplier_id' })
  supplier: Supplier;
}
