import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';

import { ApiOperation, ApiTags, ApiBody } from '@nestjs/swagger';
import { EventosService } from './eventos.service';

@Controller('eventos')
export class EventosController {
  constructor(private readonly eventosService: EventosService) {}

  // listar
  @ApiTags('Eventos')
  @Get()
  @ApiOperation({
    summary: 'Devuelve todos los eventos',
  })
  getAllEventos() {
    return this.eventosService.findAll();
  }

  @Get("usuario/:id")
  getEventosUsuario(
    @Param("id") id:string
  ){
    return this.eventosService.eventosUsuario(Number(id));
  }

  // traer por id
  @ApiTags('Eventos')
  @Get(':id')
  @ApiOperation({
    summary: 'Devuelve un evento por id',
  })
  getEventoById(@Param('id') id: number) {
    return this.eventosService.findOne(id);
  }

  // crea
  @ApiTags('Eventos')
  @Post()
  @ApiOperation({
    summary: 'Crea un nuevo evento',
  })
  @ApiBody({
  schema: {
    properties: {
      titulo:     { type: 'string', example: 'Parcial de Matemáticas' },
      fecha:      { type: 'string', example: '2026-06-20' },
      horaInicio: { type: 'string', example: '09:00:00' },
      horaFin:    { type: 'string', example: '11:00:00' },
      aula:       { type: 'object', example: { id_aula: 1 } },
      tipoEvento: { type: 'object', example: { id_tipo_evento: 1 } },
      materia:    { type: 'object', example: { id_materia: 16 } },
    },
  },
  })
  createEvento(@Body() body: any) {
  console.log("EVENTO BODY:", body);
  return this.eventosService.create(body);
  }

  // edita parcial
  @ApiTags('Eventos')
  @Patch(':id')
  patchEvento(@Param('id') id: number, @Body() body: any) {
    return this.eventosService.updatePartial(id, body);
  }

  // reemplaza
  @ApiTags('Eventos')
  @Put(':id')
  putEvento(@Param('id') id: number, @Body() body: any) {
    return this.eventosService.replace(id, body);
  }

  // borra
  @ApiTags('Eventos')
  @Delete(':id')
  deleteEvento(@Param('id') id: number) {
    return this.eventosService.remove(id);
  }
}