import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CarrerasService } from './carreras.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('carreras')
export class CarrerasController {

  constructor(private readonly carrerasService: CarrerasService) {}

  // Cualquiera logueado puede ver las carreras
  //GET http://localhost:4000/carreras
  @UseGuards(AuthGuard)
  @Get()
  getCarreras() {
    return this.carrerasService.findAll();
  }

  // Solo Admin puede crear carreras
  //POST http://localhost:4000/carreras
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['Admin'])
  @Post()
  createCarrera(@Body() body: { nombre: string }) {
    return this.carrerasService.create(body.nombre);
  }
}
