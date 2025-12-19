import { Category } from 'src/modules/categories/entities/category.entity';
import { Supplier } from 'src/modules/suppliers/entities/supplier.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Parts')
export class Part {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cat_id: number;

  @Column()
  supplier_id: number;

  @Index()
  @Column({ type: 'varchar', length: 50 })
  code: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({
    type: 'tinyint',
    width: 1,
    default: 0,
    transformer: {
      from: (value: number) => !!value,
      to: (value: boolean) => (value ? 1 : 0),
    },
  })
  in_stock: boolean;

  @Column({
    type: 'tinyint',
    width: 1,
    default: 0,
    transformer: {
      from: (value: number) => !!value,
      to: (value: boolean) => (value ? 1 : 0),
    },
  })
  is_new: boolean;

  @Column({
    type: 'tinyint',
    width: 1,
    default: 0,
    transformer: {
      from: (value: number) => !!value,
      to: (value: boolean) => (value ? 1 : 0),
    },
  })
  is_sale: boolean;

  @ManyToOne(() => Category, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'cat_id' })
  category: Category;

  @ManyToOne(() => Supplier, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'supplier_id' })
  supplier: Supplier;
}
