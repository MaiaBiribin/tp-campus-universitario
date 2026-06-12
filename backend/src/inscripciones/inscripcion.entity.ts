import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { Usuario } from "../usuarios/usuario.entity";
import { Materia } from "../materias/materia.entity";


@Entity("inscripciones")
export class Inscripcion {


  @PrimaryGeneratedColumn()
  id_inscripcion!: number;



  @ManyToOne(
    () => Usuario,
    usuario => usuario.inscripciones
  )
  @JoinColumn({
    name:"id_usuario"
  })
  usuario!: Usuario;



  @ManyToOne(
    () => Materia,
    materia => materia.inscripciones
  )
  @JoinColumn({
    name:"id_materia"
  })
  materia!: Materia;


}