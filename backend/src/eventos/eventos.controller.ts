import { Controller, Get, Post, Put, Patch, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiParam } from '@nestjs/swagger';
import { EventosService } from './eventos.service';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { EventoResponseDto } from './dto/evento-response.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ROLES } from '../auth/constants';

@ApiTags('eventos')
@Controller('eventos')
export class EventosController {
  constructor(private readonly eventosService: EventosService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar todos los eventos',
    description: 'Devuelve el listado completo de eventos registrados en el sistema.',
  })
  @ApiResponse({ status: 200, description: 'Listado de eventos obtenido exitosamente', type: [EventoResponseDto] })
  getAllEventos() {
    return this.eventosService.findAll();
  }

  @Get('usuario/:id')
  @ApiOperation({
    summary: 'Obtener eventos de un usuario',
    description: 'Devuelve todos los eventos asociados al usuario identificado por su ID.',
  })
  @ApiParam({ name: 'id', description: 'ID numérico del usuario', example: 1 })
  @ApiResponse({ status: 200, description: 'Eventos del usuario obtenidos exitosamente', type: [EventoResponseDto] })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  getEventosUsuario(@Param('id') id: string) {
    return this.eventosService.eventosUsuario(Number(id));
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un evento por ID',
    description: 'Busca y devuelve los datos completos de un evento específico por su ID único.',
  })
  @ApiParam({ name: 'id', description: 'ID numérico del evento', example: 1 })
  @ApiResponse({ status: 200, description: 'Evento encontrado', type: EventoResponseDto })
  @ApiResponse({ status: 404, description: 'Evento no encontrado' })
  getEventoById(@Param('id') id: number) {
    return this.eventosService.findOne(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ROLES.ADMIN, ROLES.DOCENTE)
  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo evento',
    description: 'Registra un nuevo evento en el sistema asignando aula, tipo de evento y materia mediante sus IDs de referencia.',
  })
  @ApiBody({ type: CreateEventoDto, description: 'Datos del evento a crear, incluyendo referencias a aula, tipo y materia' })
  @ApiResponse({ status: 201, description: 'Evento creado exitosamente', type: EventoResponseDto })
  @ApiResponse({ status: 400, description: 'Datos inválidos o faltantes' })
  createEvento(@Body() createEventoDto: CreateEventoDto) {
    return this.eventosService.create(createEventoDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ROLES.ADMIN, ROLES.DOCENTE)
  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar parcialmente un evento',
    description: 'Modifica solo los campos enviados en el cuerpo de la petición sin afectar los demás datos del evento.',
  })
  @ApiParam({ name: 'id', description: 'ID numérico del evento a modificar', example: 1 })
  @ApiBody({ type: UpdateEventoDto, description: 'Campos a actualizar (todos opcionales)' })
  @ApiResponse({ status: 200, description: 'Evento actualizado exitosamente', type: EventoResponseDto })
  @ApiResponse({ status: 404, description: 'Evento no encontrado' })
  patchEvento(@Param('id') id: number, @Body() updateEventoDto: UpdateEventoDto) {
    return this.eventosService.updatePartial(id, updateEventoDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ROLES.ADMIN)
  @Put(':id')
  @ApiOperation({
    summary: 'Reemplazar por completo un evento',
    description: 'Sobrescribe todos los datos de un evento existente. Requiere enviar el objeto completo con todos sus campos.',
  })
  @ApiParam({ name: 'id', description: 'ID numérico del evento a reemplazar', example: 1 })
  @ApiBody({ type: CreateEventoDto, description: 'Datos completos del evento para reemplazo total' })
  @ApiResponse({ status: 200, description: 'Evento reemplazado exitosamente', type: EventoResponseDto })
  @ApiResponse({ status: 404, description: 'Evento no encontrado' })
  putEvento(@Param('id') id: number, @Body() createEventoDto: CreateEventoDto) {
    return this.eventosService.replace(id, createEventoDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ROLES.ADMIN)
  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un evento',
    description: 'Borra físicamente el registro de un evento de la base de datos de manera irreversible.',
  })
  @ApiParam({ name: 'id', description: 'ID numérico del evento a eliminar', example: 1 })
  @ApiResponse({ status: 200, description: 'Evento eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Evento no encontrado' })
  deleteEvento(@Param('id') id: number) {
    return this.eventosService.remove(id);
  }
}
