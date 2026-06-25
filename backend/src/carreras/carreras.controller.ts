import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CarrerasService } from './carreras.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateCarreraDto } from './dto/create-carrera.dto';
import { CarreraResponseDto } from './dto/carrera-response.dto';

/**
 * Controlador de carreras universitarias.
 * Todos los endpoints requieren autenticación. La creación es exclusiva del rol Admin.
 */
@ApiTags('carreras')
@ApiBearerAuth()
@Controller('carreras')
export class CarrerasController {

  constructor(private readonly carrerasService: CarrerasService) {}

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({
    summary: 'Listar todas las carreras',
    description: 'Devuelve el listado completo de carreras universitarias registradas en el sistema. Requiere autenticación.',
  })
  @ApiResponse({ status: 200, description: 'Listado de carreras obtenido exitosamente', type: [CarreraResponseDto] })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  getCarreras() {
    return this.carrerasService.findAll();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  @Post()
  @ApiOperation({
    summary: 'Crear una nueva carrera',
    description: 'Registra una nueva carrera universitaria en el sistema. Solo los usuarios con rol Admin pueden realizar esta acción.',
  })
  @ApiBody({ type: CreateCarreraDto, description: 'Nombre de la carrera a registrar' })
  @ApiResponse({ status: 201, description: 'Carrera creada exitosamente', type: CarreraResponseDto })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 403, description: 'Sin permisos (se requiere rol Admin)' })
  createCarrera(@Body() createCarreraDto: CreateCarreraDto) {
    return this.carrerasService.create(createCarreraDto.nombre);
  }
}
