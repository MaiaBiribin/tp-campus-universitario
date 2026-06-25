import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Carrera } from '../carreras/carrera.entity';
import { Inscripcion } from "../inscripciones/inscripcion.entity";

/**
 * Entidad que representa una materia académica.
 * Mapea la tabla `materias`. Cada materia pertenece a una carrera
 * y puede tener múltiples usuarios inscriptos e eventos asociados.
 */
@Entity('materias')
export class Materia {

  /** Identificador único generado automáticamente. */
  @PrimaryGeneratedColumn()
  id_materia!: number;

  /** Nombre de la materia. */
  @Column()
  nombre!: string;

  /** Carrera a la que pertenece la materia. Cargada automáticamente (eager). FK: `id_carrera`. */
  @ManyToOne(() => Carrera, { eager: true })
  @JoinColumn({ name: 'id_carrera' })
  carrera!: Carrera;

  /** Inscripciones de usuarios en esta materia. Relación inversa de Inscripcion.materia. */
  @OneToMany(() => Inscripcion, inscripcion => inscripcion.materia)
  inscripciones!: Inscripcion[];
}
