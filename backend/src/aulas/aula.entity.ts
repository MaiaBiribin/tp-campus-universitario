import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('aulas')
export class Aula {
  @PrimaryGeneratedColumn()
  id_aula!: number;

  @Column({ nullable: true })
  nombre!: string;

  @Column()
  capacidad!: number;

  @Column()
  piso!: number;

  @Column()
  ubicacion!: string;

}