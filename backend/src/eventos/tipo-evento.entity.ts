import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tipos_evento')
export class TipoEvento {

  @PrimaryGeneratedColumn()
  id_tipo_evento!: number;

  @Column({ length: 50 })
  nombre!: string;
}