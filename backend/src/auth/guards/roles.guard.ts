import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {

    // 1. Lee los roles requeridos por la ruta (@Roles(['Admin']))
    const rolesRequeridos = this.reflector.get(Roles, context.getHandler());

    // 2. Si la ruta no tiene @Roles() → deja pasar a todos
    if (!rolesRequeridos) {
      return true;
    }

    // 3. Lee el usuario del request (lo puso el AuthGuard)
    const request = context.switchToHttp().getRequest();
    const usuario = request.user;

    // 4. Verifica si el rol del usuario está en los roles requeridos
    const tieneRol = rolesRequeridos.includes(usuario?.rol);

    if (!tieneRol) {
      throw new ForbiddenException('No tenés permisos para acceder a este recurso');
    }

    return true;
  }
}