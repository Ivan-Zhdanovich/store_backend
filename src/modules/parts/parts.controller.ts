import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { PartsService } from './parts.service';
import { Part } from './entities/part.entity';
import { CreatePartDto } from './dto/create-part-dto';

@Controller('api/parts')
export class PartsController {
  constructor(private partsService: PartsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() part: CreatePartDto): Promise<Part> {
    return await this.partsService.create(part);
  }

  @Get()
  findAll(): Promise<Part[]> {
    return this.partsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Part> {
    return this.partsService.findOneById(id);
  }

  @Put('id')
  updatePart(
    @Body() part: CreatePartDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Part> {
    return this.partsService.update(id, part);
  }
}
