import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Aula } from '../aulas/aula.entity';
import { TipoEvento } from './tipo-evento.entity';
import { Materia } from '../materias/materia.entity';

@Entity('eventos')
export class Evento {

  @PrimaryGeneratedColumn()
  id_evento!: number;

  @Column()
  titulo!: string;

  @Column({ type: 'date' })
  fecha!: string;

  @Column({ type: 'time' })
  horaInicio!: string;

  @Column({ type: 'time' })
  horaFin!: string;

  @Column({ default: 'aceptado' })
  estado!: string;

  @ManyToOne(() => Aula, { eager: true })
  @JoinColumn({ name: 'id_aula' })
  aula!: Aula;

  @ManyToOne(() => TipoEvento, { eager: true })
  @JoinColumn({ name: 'id_tipo_evento' })
  tipoEvento!: TipoEvento;
  
  @ManyToOne(() => Materia, { eager: true })
  @JoinColumn({ name: 'id_materia' })
  materia!: Materia;
}