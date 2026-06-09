import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Carrera } from './carrera.entity';
import { CarrerasService } from './carreras.service';
import { CarrerasController } from './carreras.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Carrera]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
    ],
  providers: [CarrerasService],
  controllers: [CarrerasController],
  exports: [CarrerasService],
})
export class CarrerasModule {}