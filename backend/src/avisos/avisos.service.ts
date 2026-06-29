import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aviso } from './aviso.entity';
import { Inscripcion } from '../inscripciones/inscripcion.entity';
import { NotificacionesService } from '../notificaciones/notificaciones.service';
import { Evento } from '../eventos/evento.entity';
import { UpdateAvisoDto } from './dto/update-aviso.dto';

@Injectable()
export class AvisosService {
  constructor(
    @InjectRepository(Aviso)
    private avisosRepository: Repository<Aviso>,
    @InjectRepository(Inscripcion)
    private inscripcionRepository: Repository<Inscripcion>,
    @InjectRepository(Evento)
    private eventoRepository: Repository<Evento>,
    private notificacionesService: NotificacionesService,
  ) {}

  /**
   * Crea un aviso asociado a un evento y genera notificaciones
   * para los usuarios inscriptos.
   * @param {string} mensaje Contenido del aviso
   * @param {number} idUsuarioCreador Usuario que crea el aviso.
   * @param {number} idEvento Evento asociado al aviso.
   * @returns {Promise<Aviso>} Aviso creado.
   * @throws {BadRequestException} Si el evento no existe.
   */
  async create(mensaje: string, idUsuarioCreador: number, idEvento: number): Promise<Aviso> {
    const aviso = this.avisosRepository.create({
      mensaje,
      usuarioCreador: { id_usuario: idUsuarioCreador },
      evento: { id_evento: idEvento },
    });
    const avisoGuardado = await this.avisosRepository.save(aviso);
    const evento = await this.eventoRepository.findOne({
        where: { id_evento: idEvento },
    });

    if (!evento) {
        throw new BadRequestException('El evento no existe');
    }
    const inscriptos = await this.inscripcionRepository.find({
        where: { materia: { id_materia: evento.materia.id_materia } },
        relations: { usuario: true },
        select: { usuario: { id_usuario: true } },
    });

    if (inscriptos.length > 0) {
      await this.notificacionesService.crearNotificaciones(
        idEvento,
        `Nuevo aviso: ${mensaje}`,
        inscriptos.map(i => ({ id_usuario: i.usuario.id_usuario })),
      );
    }
    return avisoGuardado;
  }

  /**
   * Obtiene todos los avisos asociados a un evento.
   * @param {number} idEvento ID del evento.
   * @returns {Promise<Aviso[]>} Avisos encontrados.
   */
  async findByEvento(idEvento: number): Promise<Aviso[]> {
    return this.avisosRepository.find({
      where: { evento: { id_evento: idEvento } },
      order: { fecha_creacion: 'DESC' },
    });
  }
  /**
   * Obtiene todos los avisos registrados.
   * @returns {Promise<Aviso[]>} Lista de avisos ordenados por fecha.
   */
  async findAll(): Promise<Aviso[]> {
    return this.avisosRepository.find({
      relations:{
        evento:true,
        usuarioCreador:true,
      },
      order:{
        fecha_creacion:"DESC"
      }
    });
  }
/**
   * Elimina un aviso verificando que pertenezca al usuario.
   * @param {number} idAviso id de aviso.
   * @param {number} idUsuario Usuario solicitante.
   * @returns {Promise<{message: string}>} Confirmación de eliminación.
   * @throws {BadRequestException} Si el aviso no existe o no pertenece al usuario.
   */
  async remove(idAviso:number,idUsuario:number){
    const aviso =
    await this.avisosRepository.findOne({
      where:{
        id_aviso:idAviso
      },
      relations:{
        usuarioCreador:true
      }
    });
    if(!aviso){throw new BadRequestException("El aviso no existe");}
    if(aviso.usuarioCreador.id_usuario !== idUsuario)
    {throw new BadRequestException("No podés eliminar un aviso que no creaste");}
    await this.avisosRepository.delete(idAviso);
    return {message:"Aviso eliminado correctamente"};
  }

  /**
   * Actualiza el contenido de un aviso existente. Después genera nuevas notificaciones para los usuarios relacionados.
   * @param {number} idAviso - Identificador del aviso.
   * @param {number} idUsuario - Usuario que realiza la edición.
   * @param {UpdateAvisoDto} datosActualizar - Datos modificados del aviso.
   * @returns {Promise<Aviso>} Aviso actualizado.
   * @throws {BadRequestException} Si el aviso no existe o no pertenece al usuario.
   */
  async update(idAviso:number,idUsuario:number,datosActualizar: UpdateAvisoDto,): Promise<Aviso> {
    const aviso = await this.avisosRepository.findOne({
    where: {
    id_aviso: idAviso,
    },
    relations: {
    usuarioCreador: true,
    evento: {
      materia: true,
    },
    },
    });
    if (!aviso) {
      throw new BadRequestException('El aviso no existe');
    }
    if (aviso.usuarioCreador.id_usuario !== idUsuario) {
      throw new BadRequestException('No podés editar un aviso que no creaste');
    }
    aviso.mensaje = datosActualizar.mensaje;
    const avisoActualizado = await this.avisosRepository.save(aviso);
    const inscriptos = await this.inscripcionRepository.find({
      where: { materia: { id_materia: aviso.evento.materia.id_materia } },
      relations: { usuario: true },
      select: { usuario: { id_usuario: true } },
    });
    if (inscriptos.length > 0) {
      await this.notificacionesService.crearNotificaciones(
        aviso.evento.id_evento,
        `Aviso Editado: ${datosActualizar.mensaje}`,
        inscriptos.map(i => ({ id_usuario: i.usuario.id_usuario })),
      );
    }
    return avisoActualizado;
  }
  /**
   * Busca un aviso específico por su id.
   * @param {number} idAviso id del aviso
   * @returns {Promise<Aviso>} Aviso encontrado.
   * @throws {BadRequestException} Si el aviso no existe.
   */
  async findOne(idAviso: number): Promise<Aviso> {
  const aviso = await this.avisosRepository.findOne({
    where: {
      id_aviso: idAviso
    },
    relations: {
      evento: true,
      usuarioCreador: true,
    },
  });
  if (!aviso) {
    throw new BadRequestException("El aviso no existe");
  }
  return aviso;}
  
  async avisosUsuario(idUsuario:number){
    return this.avisosRepository.find({
      where:{evento:{materia:{
        inscripciones:{usuario:{id_usuario:idUsuario}}}}},
        relations:{evento:{materia:true},
        usuarioCreador:true},
        order:{fecha_creacion:"DESC"}});
  }
}