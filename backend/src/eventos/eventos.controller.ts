import { Controller, Get, Post, Put, Patch, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiParam } from '@nestjs/swagger';
import { EventosService } from './eventos.service';
import { CreateEventoDto } from './dto/create-evento.dto';
import { EventoResponseDto } from './dto/evento-response.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ROLES } from '../auth/constants';
/**
 * Controlador de eventos académicos.
 * Expone endpoints para consulta, creación y eliminación de eventos.
 */
@ApiTags('eventos')
@Controller('eventos')
export class EventosController {
  constructor(private readonly eventosService: EventosService) {}

  /**
   * Lista todos los eventos registrados.
   * @returns {Promise<Evento[]>} Lista de eventos.
   */
  @Get()
  @ApiOperation({
    summary: 'Listar todos los eventos',
    description: 'Devuelve el listado completo de eventos registrados en el sistema.',
  })
  @ApiResponse({ status: 200, description: 'Listado de eventos obtenido exitosamente', type: [EventoResponseDto] })
  getAllEventos() {
    return this.eventosService.findAll();
  }

  /**
   * Obtiene eventos asociados a un usuario.
   * @param id id del usuario.
   * @returns {Promise<Evento[]>} Eventos del usuario.
   */
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

  /**
   * Obtiene un evento por su ID.
   * @param id del evento.
   * @returns {Promise<Evento | null>} Evento encontrado.
   */
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

  /**
   * Crea un nuevo evento.
   * @param createEventoDto datos del evento.
   * @returns {Promise<Evento>} Evento creado.
   * @throws {BadRequestException} Si los datos son inválidos.
   */
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ROLES.ADMIN)
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
  /**
   * Elimina un evento por id
   * @param id del evento.
   * @returns {{ message: string }} Resultado de la operación.
   * @throws {BadRequestException} Si el evento no existe o no puede eliminarse.
   */
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
