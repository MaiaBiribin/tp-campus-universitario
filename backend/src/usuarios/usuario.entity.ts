import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Rol } from '../roles/rol.entity';
import { Inscripcion } from "../inscripciones/inscripcion.entity";

/**
 * Enum que representa el ciclo de vida de la cuenta de un usuario.
 * - PENDIENTE: recién registrado, aguarda aprobación de un administrador.
 * - HABILITADO: puede iniciar sesión en el sistema.
 * - RECHAZADO: solicitud denegada, no puede acceder.
 */
export enum EstadoUsuario {
  PENDIENTE = 'pendiente',
  HABILITADO = 'habilitado',
  RECHAZADO = 'rechazado',
}

/**
 * Entidad que representa un usuario del sistema.
 * Mapea la tabla `usuarios`. El acceso al sistema está controlado por el campo `estado`
 * y el campo `rol` determina los permisos disponibles (Admin, Docente, Estudiante).
 * La contraseña se almacena siempre hasheada con bcrypt.
 */
@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuario!: number;

  @Column()
  nombre!: string;

  @Column()
  apellido!: string;

  /** Correo electrónico único — usado como identificador de login. */
  @Column({ unique: true })
  mail!: string;

  /** Contraseña hasheada con bcrypt (saltRounds = 12). Nunca se expone en responses. */
  @Column()
  contrasena!: string;

  /** DNI único del usuario. */
  @Column({ unique: true })
  dni!: string;

  /** Estado de la cuenta. Por defecto PENDIENTE al registrarse. */
  @Column({
    type: 'enum',
    enum: EstadoUsuario,
    default: EstadoUsuario.PENDIENTE,
  })
  estado!: EstadoUsuario;

  /** Rol asignado al usuario. Cargado automáticamente (eager). FK: `id_rol`. */
  @ManyToOne(() => Rol, { eager: true })
  @JoinColumn({ name: 'id_rol' })
  rol!: Rol;

  /** Inscripciones del usuario a materias. Relación inversa de Inscripcion.usuario. */
  @OneToMany(() => Inscripcion, inscripcion => inscripcion.usuario)
  inscripciones!: Inscripcion[];
}
