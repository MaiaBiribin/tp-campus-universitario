import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { Usuario } from "../usuarios/usuario.entity";
import { Materia } from "../materias/materia.entity";

/**
 * Entidad que representa la inscripción de un usuario en una materia.
 * Mapea la tabla `inscripciones`. Es la tabla de unión entre Usuario y Materia.
 * Se consulta desde EventosService y AvisosService para determinar
 * qué usuarios deben recibir notificaciones al crearse eventos o avisos.
 */
@Entity("inscripciones")
export class Inscripcion {

  /** Identificador único generado automáticamente. */
  @PrimaryGeneratedColumn()
  id_inscripcion!: number;

  /** Usuario inscripto. Relación inversa de Usuario.inscripciones. FK: `id_usuario`. */
  @ManyToOne(() => Usuario, usuario => usuario.inscripciones)
  @JoinColumn({ name: "id_usuario" })
  usuario!: Usuario;

  /** Materia en la que está inscripto el usuario. Relación inversa de Materia.inscripciones. FK: `id_materia`. */
  @ManyToOne(() => Materia, materia => materia.inscripciones)
  @JoinColumn({ name: "id_materia" })
  materia!: Materia;
}
