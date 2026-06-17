import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiParam } from '@nestjs/swagger';
import { InscripcionesService } from './inscripciones.service';
import { CrearInscripcionDto } from './crear-inscripcion.dto';
import { InscripcionResponseDto } from './dto/inscripcion-response.dto';

@ApiTags('inscripciones')
@Controller('inscripciones')
export class InscripcionesController {

  constructor(private readonly service: InscripcionesService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear inscripciones',
    description: 'Inscribe uno o varios usuarios en una materia. Recibe el ID de la materia y un array de IDs de usuarios.',
  })
  @ApiBody({ type: CrearInscripcionDto, description: 'Materia y lista de usuarios a inscribir' })
  @ApiResponse({ status: 201, description: 'Inscripciones creadas exitosamente', type: [InscripcionResponseDto] })
  @ApiResponse({ status: 400, description: 'Datos inválidos o faltantes' })
  crear(@Body() dto: CrearInscripcionDto) {
    return this.service.crear(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todas las inscripciones',
    description: 'Devuelve el listado completo de inscripciones registradas en el sistema.',
  })
  @ApiResponse({ status: 200, description: 'Listado de inscripciones obtenido exitosamente', type: [InscripcionResponseDto] })
  listar() {
    return this.service.listar();
  }

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
