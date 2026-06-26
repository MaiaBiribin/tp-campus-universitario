import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from '../constants';

/**
 * Guard de autenticación
 * Valida el token enviado en el header Authorization y adjunta el payload al request.
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

   /**
   * Verifica si la request puede continuar según la validez del JWT
   * @param {ExecutionContext}context contexto de ejecución de NestJS.
   * @returns `true` si el token es válido.
   * @throws {UnauthorizedException} Si no hay token o es inválido/expirado.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token no encontrado');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Token inválido o expirado');
    }

    return true;
  }

  /**
   * Extrae el JWT desde el header Authorization.
   * @param {Request} request request HTTP de Express.
   * @returns Token JWT o `undefined` si no existe o no es Bearer.
   */
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
