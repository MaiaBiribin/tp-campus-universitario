import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';
import { Materia } from './materia.entity';

@Entity('alumnos_materias')
export class AlumnoMateria {

  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Usuario, { eager: true })
  @JoinColumn({ name: 'id_usuario' })
  usuario!: Usuario;

  @ManyToOne(() => Materia, { eager: true })
  @JoinColumn({ name: 'id_materia' })
  materia!: Materia;
}