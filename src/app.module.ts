import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './modules/categories/categories.module';
import { CategoriesService } from './modules/categories/categories.service';
import { PartsService } from './modules/parts/parts.service';
import { PartsController } from './modules/parts/parts.controller';
import { PartsModule } from './modules/parts/parts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      }),
    }),
    CategoriesModule,
    PartsModule,
  ],
  controllers: [AppController, PartsController],
  providers: [AppService, CategoriesService, PartsService],
})
export class AppModule {}
