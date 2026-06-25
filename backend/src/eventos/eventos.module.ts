import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TipoEvento } from './tipo-evento.entity';
import { Evento } from './evento.entity';
import { EventosService } from './eventos.service';
import { EventosController } from './eventos.controller';
import { NotificacionesModule } from '../notificaciones/notificaciones.module';
import { Inscripcion } from '../inscripciones/inscripcion.entity';
import { Aviso } from '../avisos/aviso.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TipoEvento, Evento, Inscripcion, Aviso]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
    NotificacionesModule,
  ],
  providers: [EventosService],
  controllers: [EventosController],
  exports: [EventosService],
})
export class EventosModule {}