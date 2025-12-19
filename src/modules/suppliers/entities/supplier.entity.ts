import { Part } from 'src/modules/parts/entities/part.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Suppliers')
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  country: string;

  @OneToMany(() => Part, (part) => part.supplier)
  parts: Part[];
}
