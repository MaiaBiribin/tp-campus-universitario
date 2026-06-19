import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import { EstadoUsuario } from '../usuarios/usuario.entity';
import * as bcrypt from 'bcrypt'; 

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

    // 2. Si el usuario no existe en la base de datos → error
    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const contrasenaCorrecta = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!contrasenaCorrecta) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // 3. Verifica que el usuario esté habilitado
    if (usuario.estado !== EstadoUsuario.HABILITADO) {
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

  async register(nombre: string, apellido: string, mail: string, dni: string, contrasena: string) {
    // 1. Verifica que el mail no esté ya registrado
    const usuarioExistente = await this.usuariosService.findByMail(mail);
    if (usuarioExistente) {
      throw new BadRequestException('El mail ya está registrado');
    }

    await this.usuariosService.create(nombre, apellido, mail, dni, contrasena);

    return {
      mensaje:
        'Solicitud de registro enviada. Aguardá la habilitación del administrador.',
    };
  }
}