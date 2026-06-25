import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Aula } from '../aulas/aula.entity';
import { TipoEvento } from './tipo-evento.entity';
import { Materia } from '../materias/materia.entity';

/**
 * Entidad que representa un evento académico en el sistema.
 * Mapea la tabla `eventos`. Un evento ocupa un aula en una fecha y rango horario específico.
 * Al crearse, EventosService valida que no haya conflicto de horario en el aula
 * y envía notificaciones a los usuarios inscriptos en la materia.
 */
@Entity('eventos')
export class Evento {

  @PrimaryGeneratedColumn()
  id_evento!: number;

  @Column()
  titulo!: string;

  /** Fecha del evento en formato `YYYY-MM-DD`. Almacenado como `date` en la DB. */
  @Column({ type: 'date' })
  fecha!: string;

  /** Hora de inicio en formato `HH:mm`. Almacenado como `time` en la DB. */
  @Column({ type: 'time' })
  horaInicio!: string;

  /** Hora de fin en formato `HH:mm`. Debe ser mayor que `horaInicio`. */
  @Column({ type: 'time' })
  horaFin!: string;

  /** Estado del evento. Por defecto 'aceptado' al crearse. */
  @Column({ default: 'aceptado' })
  estado!: string;

  /** Aula donde se realiza el evento. Cargada automáticamente (eager). FK: `id_aula`. */
  @ManyToOne(() => Aula, { eager: true })
  @JoinColumn({ name: 'id_aula' })
  aula!: Aula;

  /** Tipo de evento (clase, examen, etc.). Cargado automáticamente (eager). FK: `id_tipo_evento`. */
  @ManyToOne(() => TipoEvento, { eager: true })
  @JoinColumn({ name: 'id_tipo_evento' })
  tipoEvento!: TipoEvento;

  /** Materia a la que pertenece el evento. Cargada automáticamente (eager). FK: `id_materia`. */
  @ManyToOne(() => Materia, { eager: true })
  @JoinColumn({ name: 'id_materia' })
  materia!: Materia;
}
