import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Carrera } from '../carreras/carrera.entity';

@Entity('materias')
export class Materia {

  @PrimaryGeneratedColumn()
  id_materia!: number;

  @Column()
  nombre!: string;

  @Column()
  cuatrimestre!: number;

  @ManyToOne(() => Carrera, { eager: true })
  @JoinColumn({ name: 'id_carrera' })
  carrera!: Carrera;
}