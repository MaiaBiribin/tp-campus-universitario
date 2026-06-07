import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Materia } from './materia.entity';
import { AlumnoMateria } from './alumno-materia.entity';
import { DocenteMateria } from './docente-materia.entity';
import { MateriasService } from './materias.service';
import { MateriasController } from './materias.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Materia, AlumnoMateria, DocenteMateria])],
  providers: [MateriasService],
  controllers: [MateriasController],
  exports: [MateriasService],
})
export class MateriasModule {}
