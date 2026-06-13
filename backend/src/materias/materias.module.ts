import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Materia } from './materia.entity';
import { MateriasService } from './materias.service';
import { MateriasController } from './materias.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Materia,
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (
        configService: ConfigService
      ) => ({
        secret:
          configService.get<string>(
            'JWT_SECRET'
          ),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MateriasService],
  controllers: [MateriasController],
  exports: [MateriasService],
})
export class MateriasModule {}
