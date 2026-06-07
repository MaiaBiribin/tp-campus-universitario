import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoEvento } from './tipo-evento.entity';
import { Evento } from './evento.entity';
import { EventosService } from './eventos.service';
import { EventosController } from './eventos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TipoEvento, Evento])],
  providers: [EventosService],
  controllers: [EventosController],
  exports: [EventosService],
})
export class EventosModule {}