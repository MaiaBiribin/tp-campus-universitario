import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';
import { Evento } from '../eventos/evento.entity';

@Entity('avisos')
export class Aviso {

  @PrimaryGeneratedColumn()
  id_aviso!: number;

  @Column()
  mensaje!: string;

  @CreateDateColumn()
  fecha_creacion!: Date;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'id_usuario_creador' })
  usuarioCreador!: Usuario;

  @ManyToOne(() => Evento, { eager: true })
  @JoinColumn({ name: 'id_evento' })
  evento!: Evento;
}