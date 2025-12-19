import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PartsRepository } from './repositories/parts.repository';
import { Part } from './entities/part.entity';
import { PartsQueryDto } from './dto/parts-query-dto';

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

  async findAll(query: PartsQueryDto) {
    const { page, limit, sort } = query;
    const queryBuilder = this.partsRepository.createQueryBuilder('part');

    const sortField = sort.substring(1);
    const sortOrder = sort.startsWith('-') ? 'DESC' : 'ASC';

    const allowedSortFields = ['code', 'name', 'price', 'id'];
    if (allowedSortFields.includes(sortField)) {
      queryBuilder.orderBy(`part.${sortField}`, sortOrder);
    }

    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);

    const [items, total] = await queryBuilder.getManyAndCount();

    return {
      items,
      meta: {
        totalItems: total,
        itemCount: items.length,
        itemPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
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
