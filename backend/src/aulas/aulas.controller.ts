import { Controller, Get, Post, Put, Patch, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { AulasService } from './aulas.service';
import { CreateAulaDto } from './dto/create-aula.dto';
import { UpdateAulaDto } from './dto/update-aula.dto';
import { AulaResponseDto } from './dto/aula-response.dto';

@ApiTags('aulas')
@Controller('aulas')
export class AulasController {
  constructor(private readonly aulasService: AulasService) {}

  /**
   * Obtiene todas las aulas registradas.
   * @returns {Promise<AulaResponseDto[]>} Lista de aulas.
   */
  @Get()
  @ApiOperation({
    summary: 'Listar todas las aulas',
    description: 'Devuelve un listado completo de todas las aulas registradas en el sistema.',
  })
  @ApiResponse({ status: 200, description: 'Listado de aulas obtenido exitosamente', type: [AulaResponseDto] })
  obtenerTodasLasAulas() {
    return this.aulasService.findAll();
  }

}
