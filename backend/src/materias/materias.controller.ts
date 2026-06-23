import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { MateriasService } from './materias.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { MateriaResponseDto } from './dto/materia-response.dto';

@ApiTags('materias')
@ApiBearerAuth()
@Controller('materias')
export class MateriasController {

  constructor(private readonly materiasService: MateriasService) {}

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({
    summary: 'Listar todas las materias',
    description: 'Devuelve el listado completo de materias registradas en el sistema. Requiere autenticación.',
  })
  @ApiResponse({ status: 200, description: 'Listado de materias obtenido exitosamente', type: [MateriaResponseDto] })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  getMaterias() {
    return this.materiasService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('carrera/:id_carrera')
  @ApiOperation({
    summary: 'Obtener materias por carrera',
    description: 'Devuelve todas las materias pertenecientes a una carrera específica identificada por su ID.',
  })
  @ApiParam({ name: 'id_carrera', description: 'ID numérico de la carrera', example: 2 })
  @ApiResponse({ status: 200, description: 'Materias de la carrera obtenidas exitosamente', type: [MateriaResponseDto] })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  getMateriasByCarrera(@Param('id_carrera') id_carrera: number) {
    return this.materiasService.findByCarrera(id_carrera);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  @Post()
  @ApiOperation({
    summary: 'Crear una nueva materia',
    description: 'Registra una nueva materia en el sistema asociándola a una carrera. Solo los usuarios con rol Admin pueden realizar esta acción.',
  })
  @ApiBody({ type: CreateMateriaDto, description: 'Nombre de la materia y carrera a la que pertenece' })
  @ApiResponse({ status: 201, description: 'Materia creada exitosamente', type: MateriaResponseDto })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 403, description: 'Sin permisos (se requiere rol Admin)' })
  createMateria(@Body() createMateriaDto: CreateMateriaDto) {
    return this.materiasService.create(createMateriaDto.nombre, createMateriaDto.id_carrera);
  }
}
