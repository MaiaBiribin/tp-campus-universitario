import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiParam } from '@nestjs/swagger';
import { InscripcionesService } from './inscripciones.service';
import { CrearInscripcionDto } from './crear-inscripcion.dto';
import { InscripcionResponseDto } from './dto/inscripcion-response.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ROLES } from '../auth/constants';

/**
 * Controlador de inscripciones.
 * Gestiona la relación usuario–materia. La creación de inscripciones
 * acepta múltiples usuarios en un solo request y omite silenciosamente los que no existen.
 */
@ApiTags('inscripciones')
@Controller('inscripciones')
export class InscripcionesController {

  constructor(private readonly service: InscripcionesService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ROLES.ADMIN, ROLES.ESTUDIANTE)
  @Post()
  crear(@Body() dto: CrearInscripcionDto) {
  return this.service.crear(dto);}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ROLES.ADMIN)
  @Get()
  @ApiOperation({
    summary: 'Listar todas las inscripciones',
    description: 'Devuelve el listado completo de inscripciones registradas en el sistema.',
  })
  @ApiResponse({ status: 200, description: 'Listado de inscripciones obtenido exitosamente', type: [InscripcionResponseDto] })
  listar() {
    return this.service.listar();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ROLES.ADMIN, ROLES.DOCENTE, ROLES.ESTUDIANTE)
  @Get('materia/:id')
  @ApiOperation({
    summary: 'Obtener inscripciones por materia',
    description: 'Devuelve todas las inscripciones correspondientes a una materia específica identificada por su ID.',
  })
  @ApiParam({ name: 'id', description: 'ID numérico de la materia', example: 3 })
  @ApiResponse({ status: 200, description: 'Inscripciones de la materia obtenidas exitosamente', type: [InscripcionResponseDto] })
  @ApiResponse({ status: 404, description: 'Materia no encontrada' })
  obtenerPorMateria(@Param('id') id: string) {
    return this.service.obtenerPorMateria(Number(id));
  }
}
