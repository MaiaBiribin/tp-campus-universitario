import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';
import { Materia } from './materia.entity';

@Entity('docentes_materias')
export class DocenteMateria {

  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Usuario, { eager: true })
  @JoinColumn({ name: 'id_usuario' })
  usuario!: Usuario;

  @ManyToOne(() => Materia, { eager: true })
  @JoinColumn({ name: 'id_materia' })
  materia!: Materia;
}