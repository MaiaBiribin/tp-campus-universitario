import { Controller, Post, Get, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AvisosService } from './avisos.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiBearerAuth()
@Controller('avisos')
export class AvisosController {

  constructor(private readonly avisosService: AvisosService) {}

  // Admin y Profesor pueden crear avisos
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['Admin', 'Profesor'])
  @Post()
  @ApiTags('Avisos')
  @ApiOperation({ summary: 'Crea un nuevo aviso' })
  @ApiBody({
    schema: {
      properties: {
        mensaje:   { type: 'string', example: 'El parcial se posterga una semana' },
        id_evento: { type: 'number', example: 1 },
      },
    },
  })
  create(@Body() body: { mensaje: string; id_evento: number }, @Request() req) {
    const idUsuarioCreador = req.user.sub;
    return this.avisosService.create(body.mensaje, idUsuarioCreador, body.id_evento);
  }

  // Ver avisos de un evento
  @UseGuards(AuthGuard)
  @Get('evento/:id_evento')
  @ApiTags('Avisos')
  @ApiOperation({ summary: 'Ver avisos de un evento' })
  findByEvento(@Param('id_evento') id_evento: number) {
    return this.avisosService.findByEvento(id_evento);
  }
}