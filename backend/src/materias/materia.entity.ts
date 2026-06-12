import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Carrera } from '../carreras/carrera.entity';
import { Inscripcion } from "../inscripciones/inscripcion.entity";
import { OneToMany } from "typeorm";

@Entity('materias')
export class Materia {

  @PrimaryGeneratedColumn()
  id_materia!: number;

  @Column()
  nombre!: string;

  @ManyToOne(() => Carrera, { eager: true })
  @JoinColumn({ name: 'id_carrera' })
  carrera!: Carrera;

  @OneToMany(
 () => Inscripcion,
 inscripcion => inscripcion.materia
)
inscripciones!: Inscripcion[];
}