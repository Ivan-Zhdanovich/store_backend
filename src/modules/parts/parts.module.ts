import { Module } from '@nestjs/common';
import { Part } from './entities/part.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartsService } from './parts.service';
import { PartsController } from './parts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Part])],
  providers: [PartsService],
  controllers: [PartsController],
})
export class PartsModule {}
