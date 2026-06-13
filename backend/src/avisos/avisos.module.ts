import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Aviso } from './aviso.entity';
import { AvisosService } from './avisos.service';
import { AvisosController } from './avisos.controller';
import { NotificacionesModule } from '../notificaciones/notificaciones.module';
import { Inscripcion } from '../inscripciones/inscripcion.entity';
import { Evento } from '../eventos/evento.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Aviso, Inscripcion, Evento]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
    NotificacionesModule,
  ],
  providers: [AvisosService],
  controllers: [AvisosController],
  exports: [AvisosService],
})
export class AvisosModule {}