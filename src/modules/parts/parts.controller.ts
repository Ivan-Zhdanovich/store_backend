import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PartsService } from './parts.service';
import { Part } from './entities/part.entity';
import { CreatePartDto } from './dto/create-part-dto';
import { PartsQueryDto } from './dto/parts-query-dto';

@Controller('api/parts')
export class PartsController {
  constructor(private partsService: PartsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() part: CreatePartDto): Promise<Part> {
    return await this.partsService.create(part);
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async findAll(@Query() query: PartsQueryDto) {
    return this.partsService.findAll(query);
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

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.partsService.remove(id);
  }
}
