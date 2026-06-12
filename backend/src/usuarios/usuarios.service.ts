import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; // Repository es la clase de TypeORM que tiene todos los métodos para hablar con la DB
import { Usuario } from './usuario.entity';
import { EstadoUsuario } from './usuario.entity';
import * as bcrypt from 'bcrypt'; 

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>, // guardamos la tabla Usuarios en la variable
  ) {}

  // Busca un usuario por mail (lo usa el login)
  async findByMail(mail: string): Promise<Usuario | null> {
    return this.usuariosRepository.findOne({ where: { mail } });
  }

  async create(
    nombre: string,
    apellido: string,
    mail: string,
    dni: string,
    contrasena: string,
  ): Promise<Usuario> {
    const saltRounds = 12;
    const contrasenaHasheada = await bcrypt.hash(contrasena, saltRounds);
    const usuario = this.usuariosRepository.create({
      mail,
      dni,
      contrasena: contrasenaHasheada, // <--- 3. ACÁ PASAMOS LA CONTRASEÑA ENCRIPTADA
      nombre,
      apellido,
      estado: EstadoUsuario.PENDIENTE,
      rol: { id_rol: 3 }, // 3 = Alumno
    });
    return this.usuariosRepository.save(usuario);
  }

  async findPendientes(): Promise<Pick<Usuario, 'id_usuario' | 'nombre' | 'apellido' | 'dni'>[]> {
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
      where: { estado: EstadoUsuario.HABILITADO },
      relations: { rol: true },
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