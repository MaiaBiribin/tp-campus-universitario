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

  @Put(':id')
  @ApiOperation({
    summary: 'Reemplazar por completo un aula',
    description: 'Sobrescribe todos los datos de un aula existente. Requiere enviar el objeto completo con todos sus campos.',
  })
  @ApiParam({ name: 'id', description: 'ID numérico del aula a reemplazar', example: 1 })
  @ApiBody({ type: CreateAulaDto, description: 'Datos completos del aula para reemplazo total' })
  @ApiResponse({ status: 200, description: 'Aula reemplazada exitosamente', type: AulaResponseDto })
  @ApiResponse({ status: 404, description: 'Aula no encontrada' })
  reemplazarAulaCompleta(@Param('id') id: string, @Body() createAulaDto: CreateAulaDto) {
    return this.aulasService.replace(+id, createAulaDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un aula',
    description: 'Borra físicamente el registro de un aula de la base de datos de manera irreversible.',
  })
  @ApiParam({ name: 'id', description: 'ID numérico del aula a eliminar', example: 1 })
  @ApiResponse({ status: 200, description: 'Aula eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Aula no encontrada' })
  eliminarAulaDefinitivamente(@Param('id') id: string) {
    return this.aulasService.delete(+id);
  }
}
