import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Inscripcion } from "./inscripcion.entity";
import { InscripcionesController } from "./inscripciones.controller";
import { InscripcionesService } from "./inscripciones.service";
import { Usuario } from "../usuarios/usuario.entity";
import { Materia } from "../materias/materia.entity";


@Module({

  imports:[
    TypeOrmModule.forFeature([
      Inscripcion,
      Usuario,
      Materia
    ])
  ],


  controllers:[
    InscripcionesController
  ],


  providers:[
    InscripcionesService
  ],


  exports:[
    InscripcionesService
  ]

})
export class InscripcionesModule {}