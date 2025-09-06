import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Supplier } from './entities/supplier.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: configService.get<string>('DATABASE_PATH', 'suppliers.db'),
        entities: [Supplier],
        synchronize: configService.get<boolean>('DATABASE_SYNC', true),
        logging: configService.get<boolean>('DATABASE_LOGGING', false),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Supplier]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}