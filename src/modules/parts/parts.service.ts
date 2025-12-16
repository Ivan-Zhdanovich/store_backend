import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PartsRepository } from './repositories/parts.repository';
import { Part } from './entities/part.entity';

@Injectable()
export class PartsService {
  constructor(
    @InjectRepository(Part)
    private readonly partsRepository: PartsRepository,
  ) {}

  async create(partData: Partial<Part>): Promise<Part> {
    const part = this.partsRepository.create(partData);
    return this.partsRepository.save(part);
  }

  async findAll(): Promise<Part[]> {
    return this.partsRepository.find();
  }

  async findOneById(id: number): Promise<Part> {
    const part = await this.partsRepository.findOneBy({ id });
    if (!part) {
      throw new NotFoundException(`Part with id ${id} not found`);
    }
    return part;
  }

  async update(id: number, updateData: Partial<Part>): Promise<Part> {
    const part = await this.findOneById(id);
    Object.assign(part, updateData);
    return this.partsRepository.save(part);
  }

  async remove(id: number): Promise<void> {
    const part = await this.findOneById(id);
    await this.partsRepository.remove(part);
  }
}
