import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Rol } from '../roles/rol.entity';

export enum EstadoUsuario {
  PENDIENTE = 'pendiente',
  HABILITADO = 'habilitado',
  RECHAZADO = 'rechazado',
}

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn() // Esta columna es la clave primaria (PK) y El valor se genera automáticamente
  id_usuario!: number;

  @Column()
  nombre!: string;

  @Column()
  apellido!: string;

  @Column({ unique: true })
  mail!: string;

  @Column()
  contrasena!: string;

  @Column({ unique: true })
  dni!: string;

  @Column({ type: 'enum', enum: EstadoUsuario})
  estado!: EstadoUsuario;

  // Relación con Rol
  @ManyToOne(() => Rol, { eager: true })
  @JoinColumn({ name: 'id_rol' })
  rol!: Rol; //genera "id_rol" como FK
}
