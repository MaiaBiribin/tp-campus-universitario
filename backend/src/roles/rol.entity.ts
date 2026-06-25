import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

/**
 * Entidad que representa un rol del sistema.
 * Mapea la tabla `roles`. Los valores canónicos son: 'Admin', 'Docente', 'Estudiante',
 * accesibles como constantes en `auth/constants.ts` → ROLES.ADMIN, ROLES.DOCENTE, ROLES.ESTUDIANTE.
 * El rol determina los permisos de acceso a cada endpoint mediante RolesGuard.
 */
@Entity('roles')
export class Rol {
  /** Identificador único generado automáticamente. */
  @PrimaryGeneratedColumn()
  id_rol!: number;

  /** Nombre del rol (ej: 'Admin', 'Docente', 'Estudiante'). Máximo 50 caracteres. */
  @Column({ length: 50 })
  nombre!: string;
}
