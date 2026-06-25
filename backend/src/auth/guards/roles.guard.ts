import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

/**
 * Guard de autorización basado en roles.
 * Verifica si el usuario autenticado posee uno de los roles requeridos por la ruta.
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
  ) {}

  /**
   * Determina si la request puede continuar según los roles del usuario.
   * @param {ExecutionContext} context contexto de ejecución de NestJS.
   * @returns `true` si el usuario tiene permiso o no hay restricción de roles.
   * @throws {ForbiddenException} Si el usuario no posee el rol requerido.
   */
  canActivate(context: ExecutionContext,): boolean {
    const rolesRequeridos =
      this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [
          context.getHandler(),
          context.getClass(),
        ],
      );

    if (!rolesRequeridos) {
      return true;
    }

    const request =context.switchToHttp().getRequest();

    const usuario =request.user;

    const tieneRol = rolesRequeridos?.includes(usuario?.rol);
    if (!tieneRol) {
      throw new ForbiddenException(
        'No tenés permisos para acceder a este recurso',
      );
    }
    return true;
  }
}