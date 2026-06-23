import { Controller, Post, Get, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { AvisosService } from './avisos.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateAvisoDto } from './dto/create-aviso.dto';
import { AvisoResponseDto } from './dto/aviso-response.dto';

@ApiTags('avisos')
@ApiBearerAuth()
@Controller('avisos')
export class AvisosController {

  constructor(private readonly avisosService: AvisosService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin', 'Docente')
  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo aviso',
    description: 'Publica un aviso asociado a un evento. Solo pueden crear avisos los usuarios con rol Admin o Docente.',
  })
  @ApiBody({ type: CreateAvisoDto, description: 'Mensaje del aviso y el evento al que pertenece' })
  @ApiResponse({ status: 201, description: 'Aviso creado exitosamente', type: AvisoResponseDto })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 403, description: 'Sin permisos (se requiere rol Admin o Docente)' })
  create(@Body() createAvisoDto: CreateAvisoDto, @Request() req) {
    const idUsuarioCreador = req.user.sub;
    return this.avisosService.create(createAvisoDto.mensaje, idUsuarioCreador, createAvisoDto.id_evento);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: "Ver todos los avisos"})
    @ApiResponse({
      status:200,
      description:"Lista de avisos"
    })
    findAll() {
      return this.avisosService.findAll();
    }
  @Get('evento/:id_evento')
  @ApiOperation({
    summary: 'Ver avisos de un evento',
    description: 'Devuelve todos los avisos publicados asociados a un evento específico identificado por su ID.',
  })
  @ApiParam({ name: 'id_evento', description: 'ID del evento cuyos avisos se desean consultar', example: 1 })
  @ApiResponse({ status: 200, description: 'Lista de avisos del evento', type: [AvisoResponseDto] })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  findByEvento(@Param('id_evento') id_evento: number) {
    return this.avisosService.findByEvento(id_evento);
  }
}
