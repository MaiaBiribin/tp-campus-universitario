import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('roles')
export class Rol {

  @PrimaryGeneratedColumn()
  id_rol!: number;

  @Column({ length: 50 })
  nombre!: string;
}