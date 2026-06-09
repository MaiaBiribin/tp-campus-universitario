import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { MateriasService } from './materias.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('materias')
export class MateriasController {

  constructor(private readonly materiasService: MateriasService) {}

  // Cualquiera logueado puede ver todas las materias
  //GET http://localhost:4000/materias
  @UseGuards(AuthGuard)
  @Get()
  getMaterias() {
    return this.materiasService.findAll();
  }

  // Materias por carrera
  //GET http://localhost:4000/materias/carrera/2
  @UseGuards(AuthGuard)
  @Get('carrera/:id_carrera')
  getMateriasByCarrera(@Param('id_carrera') id_carrera: number) {
    return this.materiasService.findByCarrera(id_carrera);
  }

  // Solo Admin puede crear materias
  //POST http://localhost:4000/materias
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['Admin'])
  @Post()
  createMateria(@Body() body: { nombre: string; cuatrimestre: number; id_carrera: number }) {
    return this.materiasService.create(body.nombre, body.cuatrimestre, body.id_carrera);
  }
}
