import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';
import { Evento } from '../eventos/evento.entity';

/**
 * Entidad que representa un aviso publicado por un Docente sobre un evento.
 * Mapea la tabla `avisos`. Cada aviso dispara notificaciones automáticas
 * a todos los estudiantes inscriptos en la materia del evento asociado.
 */
@Entity('avisos')
export class Aviso {

  @PrimaryGeneratedColumn()
  id_aviso!: number;

  @Column()
  mensaje!: string;

  @CreateDateColumn()
  fecha_creacion!: Date;

  /** Usuario (Docente) que publicó el aviso. FK: `id_usuario_creador`. */
  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'id_usuario_creador' })
  usuarioCreador!: Usuario;

  /** Evento al que pertenece el aviso. Cargado automáticamente (eager). FK: `id_evento`. */
  @ManyToOne(() => Evento, { eager: true })
  @JoinColumn({ name: 'id_evento' })
  evento!: Evento;
}
