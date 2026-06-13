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

@Entity('notificaciones')
export class Notificacion {

  @PrimaryGeneratedColumn()
  id_notificacion!: number;

  @ManyToOne(() => Usuario, { eager: false })
  @JoinColumn({ name: 'id_usuario' })
  usuario!: Usuario;

  @ManyToOne(() => Evento, { eager: true, nullable: true })
  @JoinColumn({ name: 'id_evento' })
  evento?: Evento;

  @Column({ nullable: true })
  mensaje!: string;

  @Column({ default: false })
  leida!: boolean;

  @CreateDateColumn()
  fecha_creacion!: Date;
}