import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; //Repository es la clase de TypeORM que tiene todos los métodos para hablar con la DB
import { Usuario } from './usuario.entity';
import { EstadoUsuario } from './usuario.entity';


@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>, //guardamos la tabla Usuarios en la variable
  ) {}

  // Busca un usuario por mail (lo usa el login)
  async findByMail(mail: string): Promise<Usuario | null> {
    //devuelve un Usuario si lo encuentra o null si no existe
    return this.usuariosRepository.findOne({ where: { mail } });
  }

  async create(
    nombre: string,
    apellido: string,
    mail: string,
    dni: string,
    contrasena: string,
  ): Promise<Usuario> {
    const usuario = this.usuariosRepository.create({
      mail,
      dni,
      contrasena,
      nombre,
      apellido,
      estado: EstadoUsuario.PENDIENTE,
      rol: { id_rol: 3 }, // 3 = Alumno
    });
    return this.usuariosRepository.save(usuario);
  }

  async findPendientes(): Promise<Pick<Usuario, 'id_usuario' |'nombre' | 'apellido' | 'dni'>[]> {
  return this.usuariosRepository.find({
    where: { estado: EstadoUsuario.PENDIENTE },
    select: {
      id_usuario: true,
      nombre: true,
      apellido: true,
      dni: true,
      mail: true,
    },
    });
  }

  async findHabilitados() {
    return this.usuariosRepository.find({
      where: { estado: EstadoUsuario.HABILITADO,},
      relations: {rol: true,},
      select: {
        id_usuario: true,
        nombre: true,
        apellido: true,
        mail: true,
        dni: true,
        rol: {
          id_rol: true,
          nombre: true,
        },
      },
    });
  }

  async habilitarUsuario(id: number): Promise<{ mensaje: string }> {
  await this.usuariosRepository.update(id, { estado: EstadoUsuario.HABILITADO });
  return { mensaje: 'Usuario habilitado correctamente' };
  }

  async rechazarUsuario(id: number): Promise<{ mensaje: string }> {
  await this.usuariosRepository.update(id, { estado: EstadoUsuario.RECHAZADO });
  return { mensaje: 'Usuario rechazado correctamente' };
  }
}
