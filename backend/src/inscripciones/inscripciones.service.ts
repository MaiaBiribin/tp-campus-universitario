import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Inscripcion } from "./inscripcion.entity";
import { Usuario } from "../usuarios/usuario.entity";
import { Materia } from "../materias/materia.entity";
import { CrearInscripcionDto } from "./crear-inscripcion.dto";


@Injectable()
export class InscripcionesService {


constructor(

 @InjectRepository(Inscripcion)
 private inscripcionesRepo: Repository<Inscripcion>,


 @InjectRepository(Usuario)
 private usuariosRepo: Repository<Usuario>,


 @InjectRepository(Materia)
 private materiasRepo: Repository<Materia>

){}



async crear(dto:CrearInscripcionDto){

 const materia =
 await this.materiasRepo.findOne({
  where:{
    id_materia:dto.id_materia
  }
 });


 if(!materia){
   throw new Error("Materia no encontrada");
 }


 const creadas: Inscripcion[] = [];


 for(const idUsuario of dto.usuarios){

  const usuario =
  await this.usuariosRepo.findOne({
   where:{
    id_usuario:idUsuario
   }
  });


  if(!usuario){
    continue;
  }


  const inscripcion =
   this.inscripcionesRepo.create({
    usuario,
    materia
   });


  creadas.push(
   await this.inscripcionesRepo.save(inscripcion)
  );

 }


 return creadas;
}



async listar(){

 return this.inscripcionesRepo.find();

}

}