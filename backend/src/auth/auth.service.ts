import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    mail: string,
    contrasena: string,
  ): Promise<{ access_token: string }> {
    // 1. Busca el usuario por mail en la DB
    const usuario = await this.usuariosService.findByMail(mail);

    // 2. Si no existe o la contraseña no coincide → error
    if (!usuario || usuario.contrasena !== contrasena) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // 3. Verifica que el usuario esté habilitado
    if (!usuario.habilitado) {
      throw new UnauthorizedException('Usuario no habilitado');
    }

    // 4. Genera el JWT con los datos del usuario
    const payload = {
      sub: usuario.id_usuario,
      mail: usuario.mail,
      rol: usuario.rol.nombre,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      dni: usuario.dni,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(mail: string, dni: string, contrasena: string) {
    // 1. Verifica que el mail no esté ya registrado
    const usuarioExistente = await this.usuariosService.findByMail(mail);
    if (usuarioExistente) {
      throw new BadRequestException('El mail ya está registrado');
    }

    // 2. Crea el usuario con habilitado=false y rol=Alumno
    await this.usuariosService.create(mail, dni, contrasena);

    return {
      mensaje:
        'Solicitud de registro enviada. Aguardá la habilitación del administrador.',
    };
  }
}
