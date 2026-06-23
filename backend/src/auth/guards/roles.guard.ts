import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean {

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