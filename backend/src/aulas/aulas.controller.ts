import { Controller, Get, Post, Put, Patch, Delete, Body, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AulasService } from './aulas.service';

@ApiTags('Aulas')
@Controller('aulas')
export class AulasController {
  constructor(private readonly aulasService: AulasService) {}
  
  @Get()
  @ApiOperation({ summary: 'Devuelve todas las aulas' })
  findAll() {
    return this.aulasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Devuelve los detalles de un aula' })
  findOne(@Param('id') id: string) {
    return this.aulasService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Crea una nueva aula' })
  async createAulas(@Body() body: any) { 
    // Si al probar desde Swagger la terminal imprime "Datos recibidos: {}"
    // significa que Swagger no está enviando el cuerpo en formato JSON.
    console.log("Datos recibidos en el controlador:", body);
    
    if (!body || Object.keys(body).length === 0) {
      throw new Error("El cuerpo de la petición (Body) está vacío. Verifica el formato JSON.");
    }
    
    return await this.aulasService.create(body);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modifica parcialmente los datos de un aula' })
  patchAulas(@Param('id') id: string, @Body() updateData: any) {
    return this.aulasService.update(+id, updateData);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Reemplaza completamente los datos de un aula' })
  putAulas(@Param('id') id: string, @Body() aulaData: any) {
    return this.aulasService.replace(+id, aulaData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina un aula' })
  deleteAulas(@Param('id') id: string) {
    return this.aulasService.delete(+id);
  }
}