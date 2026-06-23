import { Injectable } from '@nestjs/common';
import {InjectRepository,} from '@nestjs/typeorm';
import {Repository,} from 'typeorm';
import {Usuario,EstadoUsuario,} from './usuario.entity';
import { Rol } from '../roles/rol.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository:
      Repository<Usuario>,

    @InjectRepository(Rol)
    private rolesRepository:
      Repository<Rol>,
  ) {}

  async findByMail(
    mail: string,
  ): Promise<Usuario | null> {
    return this.usuariosRepository.findOne({
      where: { mail },
    });
  }

  async create(
    nombre: string,
    apellido: string,
    mail: string,
    dni: string,
    contrasena: string,
  ): Promise<Usuario> {

    const rolEstudiante =
      await this.rolesRepository.findOne({
        where: {
          nombre: 'Estudiante',
        },
      });

    if (!rolEstudiante) {
      throw new Error(
        'No existe el rol Estudiante',
      );
    }

    const saltRounds = 12;
    const contrasenaHasheada =await bcrypt.hash(contrasena,saltRounds,);
    const usuario =
      this.usuariosRepository.create({
        mail,
        dni,
        contrasena:
          contrasenaHasheada,
        nombre,
        apellido,
        estado:
          EstadoUsuario.PENDIENTE,
        rol: {
          id_rol:
            rolEstudiante.id_rol,
        },
      });

    return this.usuariosRepository.save(
      usuario,
    );
  }

  async findPendientes():
    Promise<
      Pick<
        Usuario,
        | 'id_usuario'
        | 'nombre'
        | 'apellido'
        | 'dni'
        | 'mail'
      >[]
    > {

    return this.usuariosRepository.find({
      where: {
        estado:
          EstadoUsuario.PENDIENTE,
      },

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
      where: {
        estado:
          EstadoUsuario.HABILITADO,
      },

      relations: {
        rol: true,
      },

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

  async habilitarUsuario(
    id: number,
  ): Promise<{
    mensaje: string;
  }> {

    await this.usuariosRepository.update(
      id,
      {
        estado:
          EstadoUsuario.HABILITADO,
      },
    );

    return {
      mensaje:'Usuario habilitado correctamente',
    };
  }

  async rechazarUsuario(
    id: number,
  ): Promise<{
    mensaje: string;
  }> {
    await this.usuariosRepository.update(
      id,
      {
        estado:
          EstadoUsuario.RECHAZADO,
      },
    );
    return {
      mensaje:'Usuario rechazado correctamente',};
  }
}