import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

/**
 * Entidad que representa una carrera universitaria.
 * Mapea la tabla `carreras`. Es el nivel superior de la jerarquía académica:
 * una carrera contiene materias, y las materias tienen inscripciones y eventos.
 */
@Entity('carreras')
export class Carrera {

  /** Identificador único generado automáticamente. */
  @PrimaryGeneratedColumn()
  id_carrera!: number;

  /** Nombre de la carrera universitaria. */
  @Column()
  nombre!: string;
}
