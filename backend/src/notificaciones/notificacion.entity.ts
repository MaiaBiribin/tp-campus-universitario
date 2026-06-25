import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

import { Usuario } from '../usuarios/usuario.entity';
import { Evento } from '../eventos/evento.entity';

/**
 * Entidad que representa una notificación interna dirigida a un usuario.
 * Mapea la tabla `notificaciones`. Las notificaciones se crean automáticamente
 * mediante NotificacionesService cuando se crea un evento o se publica/edita un aviso.
 * Si el evento asociado se elimina, la notificación se elimina en cascada.
 */
@Entity('notificaciones')
export class Notificacion {

  /** Identificador único generado automáticamente. */
  @PrimaryGeneratedColumn()
  id_notificacion!: number;

  /** Usuario destinatario de la notificación. No se carga automáticamente (eager: false). FK: `id_usuario`. */
  @ManyToOne(() => Usuario, { eager: false })
  @JoinColumn({ name: 'id_usuario' })
  usuario!: Usuario;

  /**
   * Evento que originó la notificación. Puede ser null si el evento fue eliminado.
   * onDelete CASCADE: la notificación se elimina si el evento se borra.
   */
  @ManyToOne(() => Evento, { eager: true, nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_evento' })
  evento?: Evento;

  /** Texto de la notificación. Puede ser null en DB pero siempre se provee al crear. */
  @Column({ nullable: true })
  mensaje!: string;

  /** Indica si el usuario ya leyó la notificación. Por defecto false. */
  @Column({ default: false })
  leida!: boolean;

  /** Fecha y hora de creación generada automáticamente por la DB. */
  @CreateDateColumn()
  fecha_creacion!: Date;
}
