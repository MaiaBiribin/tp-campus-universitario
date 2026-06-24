import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario, EstadoUsuario } from './usuario.entity';
import { Rol } from '../roles/rol.entity';
import { Evento } from '../eventos/evento.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

const ROL_ALUMNO_ID = 3;

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,

    @InjectRepository(Rol)
    private rolesRepository: Repository<Rol>,

    @InjectRepository(Evento)
    private eventosRepository: Repository<Evento>,
  ) {}

  async findByMail(mail: string): Promise<Usuario | null> {
    return this.usuariosRepository.findOne({ where: { mail } });
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuariosRepository.find({ relations: { rol: true } });
  }

  async findById(id: number): Promise<Usuario> {
    const usuario = await this.usuariosRepository.findOne({
      where: { id_usuario: id },
      relations: { rol: true },
    });
    if (!usuario) throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    return usuario;
  }

  async create(
    nombre: string,
    apellido: string,
    mail: string,
    dni: string,
    contrasena: string,
  ): Promise<Usuario> {
    const rolEstudiante = await this.rolesRepository.findOne({
      where: { nombre: 'Estudiante' },
    });

    if (!rolEstudiante) {
      throw new Error('No existe el rol Estudiante');
    }

    const saltRounds = 12;
    const contrasenaHasheada = await bcrypt.hash(contrasena, saltRounds);
    const usuario = this.usuariosRepository.create({
      mail,
      dni,
      contrasena: contrasenaHasheada,
      nombre,
      apellido,
      estado: EstadoUsuario.PENDIENTE,
      rol: { id_rol: rolEstudiante.id_rol },
    });
    return this.usuariosRepository.save(usuario);
  }

  async update(id: number, data: UpdateUsuarioDto): Promise<Usuario> {
    await this.findById(id);
    await this.usuariosRepository.update(id, data);
    return this.findById(id);
  }

  async remove(id: number): Promise<void> {
    const usuario = await this.findById(id);
    await this.usuariosRepository.remove(usuario);
  }

  async findPendientes(): Promise<Pick<Usuario, 'id_usuario' | 'nombre' | 'apellido' | 'dni' | 'mail'>[]> {
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
        rol: { id_rol: true, nombre: true },
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

  async misEventos(idUsuario: number): Promise<Evento[]> {
    const ahora = new Date();
    const hoy = ahora.toLocaleDateString('sv-SE');
    const horaActual = ahora.toTimeString().slice(0, 5);

    const eventos = await this.eventosRepository.find({
      where: {
        materia: {
          inscripciones: {
            usuario: { id_usuario: idUsuario },
          },
        },
      },
      relations: { materia: { carrera: true } },
      order: { fecha: 'ASC', horaInicio: 'ASC' },
    });

    return eventos.filter(evento => {
      if (evento.fecha > hoy) return true;
      if (evento.fecha === hoy) return evento.horaInicio >= horaActual;
      return false;
    });
  }
}
