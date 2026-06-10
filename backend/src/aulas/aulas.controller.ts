import { Controller, Get, Post, Put, Patch, Delete, Body, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

import { AulasService } from './aulas.service';

@Controller('aulas')
export class AulasController {

  constructor(private readonly aulasService : AulasService) {}


  // POST http://localhost:4000/aulas
  @ApiTags('Aulas')
  @ApiOperation({ summary: 'Crea una nueva aula, solo puede ser utilizado por el Administrador' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['Admin'])
  @Post()
  createAulas(@Body() body: { nombre: string ; capacidad : number ; piso: number ; ubicacion : string }) {
    return this.aulasService.create(body.nombre, body.capacidad, body.piso, body.ubicacion);
  }

  








  
  @ApiTags('Aulas')
  @ApiOperation({ summary: 'Devuelve lo que contenga el aula' })
  @UseGuards(AuthGuard)
  @Get('/aulas/:id')
  getAulas() {
    return 'aqui se verán las aulas';
  }


  @ApiTags('Aulas')
  @Patch('/aulas/:id')
  @ApiOperation({ summary: 'Modifica parcialmente los datos de un aula' })
  patchAulas() {
    return '';
  }

  @ApiTags('Aulas')
  @Put('/aulas/:id')
  @ApiOperation({ summary: 'Reemplaza completamente los datos de un aula' })
  putAulas() {
    return '';
  }

  @ApiTags('Aulas')
  @Delete('/aulas/:id')
  @ApiOperation({ summary: 'Elimina un aula' })
  deleteAulas() {
    return '';
  }
}
