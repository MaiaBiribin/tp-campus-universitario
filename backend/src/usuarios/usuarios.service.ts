import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario, EstadoUsuario } from './usuario.entity';
import { Rol } from '../roles/rol.entity';
import { Evento } from '../eventos/evento.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

const ROL_ALUMNO_ID = 3;

/**
 * Servicio de gestión de usuarios.
 * Cubre el ciclo completo del usuario: creación con hasheo de contraseña,
 * búsqueda por distintos criterios, habilitación/rechazo administrativo,
 * actualización de datos y consulta de próximos eventos del usuario autenticado.
 */
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

  /**
   * Busca un usuario por su correo electrónico. Usado principalmente en el flujo de login.
   * @param {string} mail - Correo electrónico a buscar.
   * @returns {Promise<Usuario | null>} Usuario encontrado o null si no existe.
   */
  async findByMail(mail: string): Promise<Usuario | null> {
    return this.usuariosRepository.findOne({ where: { mail } });
  }

  /**
   * Devuelve todos los usuarios del sistema con su rol incluido.
   * @returns {Promise<Usuario[]>} Lista completa de usuarios con relación de rol cargada.
   */
  async findAll(): Promise<Usuario[]> {
    return this.usuariosRepository.find({ relations: { rol: true } });
  }

  /**
   * Busca un usuario por su ID incluyendo su rol.
   * @param {number} id - ID numérico del usuario.
   * @returns {Promise<Usuario>} Usuario encontrado con su rol.
   * @throws {NotFoundException} Si no existe un usuario con ese ID.
   */
  async findById(id: number): Promise<Usuario> {
    const usuario = await this.usuariosRepository.findOne({
      where: { id_usuario: id },
      relations: { rol: true },
    });
    if (!usuario) throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    return usuario;
  }

  /**
   * Crea un nuevo usuario con estado PENDIENTE y rol Estudiante.
   * La contraseña se hashea con bcrypt antes de persistir.
   * @param {string} nombre - Nombre de pila.
   * @param {string} apellido - Apellido.
   * @param {string} mail - Correo electrónico único.
   * @param {string} dni - DNI único.
   * @param {string} contrasena - Contraseña en texto plano.
   * @returns {Promise<Usuario>} Usuario creado y persistido.
   * @throws {Error} Si el rol 'Estudiante' no existe en la base de datos.
   */
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

  /**
   * Actualiza parcialmente los datos de un usuario existente.
   * Verifica la existencia del usuario antes de actualizar y retorna el estado final.
   * @param {number} id - ID del usuario a modificar.
   * @param {UpdateUsuarioDto} data - Campos a actualizar (todos opcionales).
   * @returns {Promise<Usuario>} Usuario con los datos actualizados.
   * @throws {NotFoundException} Si el usuario no existe.
   */
  async update(id: number, data: UpdateUsuarioDto): Promise<Usuario> {
    await this.findById(id);
    await this.usuariosRepository.update(id, data);
    return this.findById(id);
  }

  /**
   * Elimina físicamente un usuario de la base de datos.
   * @param {number} id - ID del usuario a eliminar.
   * @returns {Promise<void>}
   * @throws {NotFoundException} Si el usuario no existe.
   */
  async remove(id: number): Promise<void> {
    const usuario = await this.findById(id);
    await this.usuariosRepository.remove(usuario);
  }

  /**
   * Devuelve usuarios con estado PENDIENTE. Solo expone id, nombre, apellido, dni y mail
   * (sin contraseña ni estado). Usado por el panel de solicitudes del administrador.
   * @returns {Promise<Partial<Usuario>[]>} Lista de usuarios pendientes con campos básicos.
   */
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

  /**
   * Devuelve usuarios con estado HABILITADO incluyendo nombre del rol.
   * Usado por el panel de gestión de usuarios activos.
   * @returns {Promise<Partial<Usuario>[]>} Usuarios habilitados con id, datos personales y rol.
   */
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

  /**
   * Cambia el estado de un usuario a HABILITADO, permitiéndole acceder al sistema.
   * @param {number} id - ID del usuario a habilitar.
   * @returns {Promise<{ mensaje: string }>} Mensaje de confirmación.
   */
  async habilitarUsuario(id: number): Promise<{ mensaje: string }> {
    await this.usuariosRepository.update(id, { estado: EstadoUsuario.HABILITADO });
    return { mensaje: 'Usuario habilitado correctamente' };
  }

  /**
   * Cambia el estado de un usuario a RECHAZADO, bloqueando su acceso al sistema.
   * @param {number} id - ID del usuario a rechazar.
   * @returns {Promise<{ mensaje: string }>} Mensaje de confirmación.
   */
  async rechazarUsuario(id: number): Promise<{ mensaje: string }> {
    await this.usuariosRepository.update(id, { estado: EstadoUsuario.RECHAZADO });
    return { mensaje: 'Usuario rechazado correctamente' };
  }

  /**
   * Devuelve los próximos eventos del usuario filtrados por sus inscripciones.
   * Excluye eventos pasados; del día actual solo incluye los que aún no comenzaron.
   * @param {number} idUsuario - ID del usuario autenticado.
   * @returns {Promise<Evento[]>} Eventos futuros ordenados por fecha y hora de inicio.
   */
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
