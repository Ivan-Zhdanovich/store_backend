import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './modules/categories/categories.module';
import { CategoriesService } from './modules/categories/categories.service';
import { PartsService } from './modules/parts/parts.service';
import { PartsController } from './modules/parts/parts.controller';
import { PartsModule } from './modules/parts/parts.module';

@Module({
  imports: [CategoriesModule, PartsModule],
  controllers: [AppController, PartsController],
  providers: [AppService, CategoriesService, PartsService],
})
export class AppModule {}
