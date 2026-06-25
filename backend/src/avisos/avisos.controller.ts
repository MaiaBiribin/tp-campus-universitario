import { 
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  UseGuards,
  Patch,
  Request,
  ParseIntPipe
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { AvisosService } from './avisos.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateAvisoDto } from './dto/create-aviso.dto';
import { AvisoResponseDto } from './dto/aviso-response.dto';
import { UpdateAvisoDto } from './dto/update-aviso.dto';

@ApiTags('avisos')
@ApiBearerAuth()
@Controller('avisos')
export class AvisosController {

  constructor(private readonly avisosService: AvisosService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Docente')
  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo aviso',
    description: 'Publica un aviso asociado a un evento. Solo pueden crear avisos los usuarios con rol Docente.',
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
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Docente')
  @Delete(':id')
  @ApiOperation({
  summary: "Eliminar aviso",
  description: "Elimina un aviso creado por el docente."})
  @ApiParam({
  name:"id",
  description:"ID del aviso"
 })
 async remove(
  @Param('id', ParseIntPipe) id: number,
  @Request() req){
  return this.avisosService.remove(
    id,
    req.user.sub
  );}

  @Get(':id')
@UseGuards(AuthGuard)
@ApiOperation({
  summary: "Obtener aviso por id",
  description: "Devuelve un aviso específico."
})
@ApiParam({
  name: "id",
  description: "ID del aviso"
})
@ApiResponse({
  status: 200,
  description: "Aviso encontrado",
  type: AvisoResponseDto
})
@ApiResponse({
  status: 404,
  description: "Aviso inexistente"
})
findOne(
  @Param('id', ParseIntPipe) id: number
) {
  return this.avisosService.findOne(id);
}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Docente')
  @Patch(':id')
  @ApiOperation({
    summary: 'Editar aviso',
    description: 'Edita el mensaje de un aviso. Solo puede editarlo el usuario que lo creó.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del aviso a editar',
  })
  @ApiBody({ type: UpdateAvisoDto, description: 'Nuevo mensaje del aviso' })
  @ApiResponse({ status: 200, description: 'Aviso actualizado exitosamente', type: AvisoResponseDto })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 403, description: 'Sin permisos (se requiere rol Docente)' })
  @ApiResponse({ status: 400, description: 'El aviso no existe o el usuario no es el creador' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAvisoDto: UpdateAvisoDto,
    @Request() req,
  ) {
    return this.avisosService.update(
      id,
      req.user.sub,
      updateAvisoDto,
    );
  }

}
