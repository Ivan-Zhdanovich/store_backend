import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Subcategory } from './subcategory.entity';

@Entity('Categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Subcategory, (subcategory) => subcategory.category)
  subcategories: Subcategory[];
}
