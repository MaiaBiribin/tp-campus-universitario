import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import { EstadoUsuario } from '../usuarios/usuario.entity';
import * as bcrypt from 'bcrypt';

/**
 * Servicio de autenticación.
 * Gestiona el inicio de sesión con validación de credenciales y emisión de JWT,
 * y el registro de nuevas cuentas con estado pendiente de habilitación.
 */
@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  /**
   * Autentica un usuario verificando mail, contraseña (bcrypt) y estado de cuenta.
   * Solo los usuarios con estado HABILITADO pueden obtener un token.
   * @param {string} mail - Correo electrónico del usuario.
   * @param {string} contrasena - Contraseña en texto plano.
   * @returns {Promise<{ access_token: string }>} Token JWT firmado.
   * @throws {UnauthorizedException} Si el usuario no existe, la contraseña no coincide o no está habilitado.
   */
  async signIn(
    mail: string,
    contrasena: string,
  ): Promise<{ access_token: string }> {
    const usuario = await this.usuariosService.findByMail(mail);

    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const contrasenaCorrecta = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!contrasenaCorrecta) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    if (usuario.estado !== EstadoUsuario.HABILITADO) {
      throw new UnauthorizedException('Usuario no habilitado');
    }

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

  /**
   * Registra una nueva cuenta con estado PENDIENTE y rol Estudiante.
   * El hasheo de la contraseña ocurre en {@link UsuariosService.create}.
   * La habilitación debe realizarla un administrador posteriormente.
   * @param {string} nombre - Nombre de pila del nuevo usuario.
   * @param {string} apellido - Apellido del nuevo usuario.
   * @param {string} mail - Correo electrónico único del usuario.
   * @param {string} dni - DNI único del usuario.
   * @param {string} contrasena - Contraseña en texto plano (se hashea antes de persistir).
   * @returns {Promise<{ mensaje: string }>} Mensaje de confirmación de la solicitud enviada.
   * @throws {BadRequestException} Si el mail ya está registrado en el sistema.
   */
  async register(nombre: string, apellido: string, mail: string, dni: string, contrasena: string) {
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
