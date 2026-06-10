import { Controller, Get, Post, Put, Patch, Delete, Body, Param } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBody, ApiParam } from '@nestjs/swagger';
import { AulasService } from './aulas.service';

@ApiTags('Gestión de Aulas') 
@Controller('aulas')
export class AulasController {
  constructor(private readonly aulasService: AulasService) {}
  
  //http://localhost:4000/aulas
  @Get()
  @ApiOperation({ 
    summary: 'Obtener todas las aulas',
    description: 'Devuelve un listado completo de todas las aulas registradas en el sistema, incluyendo su estado de disponibilidad actual.'
  })
  obtenerTodasLasAulas() {
    return this.aulasService.findAll();
  }

  // http://localhost:4000/aulas/(aca va el numero del aula)
  @Get(':id')
  @ApiOperation({ 
    summary: 'Obtener detalles de un aula específica',
    description: 'Busca y devuelve toda la información de un aula filtrada por su ID único.'
  })
  @ApiParam({ name: 'id', description: 'ID numérico del aula que se desea buscar', example: '1' })
  obtenerAulaPorId(@Param('id') id: string) {
    return this.aulasService.findOne(+id);
  }

  //http://localhost:4000/aulas
  @Post()
  @ApiOperation({ 
    summary: 'Registrar una nueva aula',
    description: 'Crea un nuevo registro de aula en el sistema. El campo "disponible" es opcional y se guarda como true por defecto.'
  })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['nombre', 'capacidad', 'piso', 'ubicacion'],
      properties: {
        nombre: { type: 'string', example: 'Laboratorio de Informática' },
        capacidad: { type: 'integer', example: 40 },
        piso: { type: 'integer', example: 2 },
        ubicacion: { type: 'string', example: 'Pabellón Central, Ala Sur' },
      },
    },
  })
  async registrarNuevaAula(@Body() body: any) {
    if (!body || Object.keys(body).length === 0) {
      throw new Error("El cuerpo de la petición (Body) está vacío. Verifica el formato JSON.");
    }
    return await this.aulasService.create(body);
  }

  //http://localhost:4000/aulas/(aca va el numero del aula)
  @Patch(':id')
  @ApiOperation({ 
    summary: 'Actualizar parcialmente un aula',
    description: 'Modifica únicamente los campos enviados en el cuerpo de la petición. Es el endpoint ideal para inhabilitar un aula (cambiando "disponible" a false) o actualizar su capacidad sin afectar el resto de los datos.'
  })
  @ApiParam({ name: 'id', description: 'ID numérico del aula a modificar', example: '1' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nombre: { type: 'string', example: 'Laboratorio de Redes - Modificado' },
        capacidad: { type: 'integer', example: 45 },
        piso: { type: 'integer', example: 2 },
        ubicacion: { type: 'string', example: 'Pabellón Central' },
        disponible: { type: 'boolean', example: false }
      },
    },
  })
  async actualizarDatosDelAula(@Param('id') id: string, @Body() updateData: any) {
    console.log(`Modificación parcial solicitada para el aula con ID: ${id}`);
    console.log("Campos a actualizar enviados:", updateData);

    if (!updateData || Object.keys(updateData).length === 0) {
      throw new Error("Debes enviar al menos un campo para modificar en el cuerpo de la petición.");
    }

    return await this.aulasService.update(+id, updateData);
  }

  //http://localhost:4000/aulas/(aca va el numero del aula)
  @Put(':id')
  @ApiOperation({ 
    summary: 'Reemplazar por completo un aula',
    description: 'Sobrescribe absolutamente todos los datos de un aula existente. A diferencia del PATCH, aquí debes enviar el objeto completo con todos sus campos obligatorios.'
  })
  @ApiParam({ name: 'id', description: 'ID numérico del aula a reemplazar', example: '1' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['nombre', 'capacidad', 'piso', 'ubicacion'],
      properties: {
        nombre: { type: 'string', example: 'Aula Magna' },
        capacidad: { type: 'integer', example: 120 },
        piso: { type: 'integer', example: 0 },
        ubicacion: { type: 'string', example: 'Planta Baja' },
        disponible: { type: 'boolean', example: true }
      },
    },
  })
  reemplazarAulaCompleta(@Param('id') id: string, @Body() aulaData: any) {
    return this.aulasService.replace(+id, aulaData);
  }

  //http://localhost:4000/aulas/(aca va el numero del aula)
  @Delete(':id')
  @ApiOperation({ 
    summary: 'Eliminar un aula',
    description: 'Borra físicamente el registro de un aula de la base de datos de manera irreversible.'
  })
  @ApiParam({ name: 'id', description: 'ID numérico del aula a eliminar', example: '1' })
  eliminarAulaDefinitivamente(@Param('id') id: string) {
    return this.aulasService.delete(+id);
  }
}