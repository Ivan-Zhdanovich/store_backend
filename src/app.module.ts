import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './modules/categories/categories.module';
import { CategoriesService } from './module/categories/categories.service';

@Module({
  imports: [CategoriesModule],
  controllers: [AppController],
  providers: [AppService, CategoriesService],
})
export class AppModule {}
