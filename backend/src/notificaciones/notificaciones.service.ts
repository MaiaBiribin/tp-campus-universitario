import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notificacion } from './notificacion.entity';

/**
 * Servicio de notificaciones internas del sistema.
 * Es invocado como efecto secundario por EventosService y AvisosService
 * para informar a los usuarios inscriptos en una materia sobre cambios relevantes.
 */
@Injectable()
export class NotificacionesService {

  constructor(
    @InjectRepository(Notificacion)
    private readonly notificacionesRepository: Repository<Notificacion>,
  ) {}

  /**
   * Crea y persiste una notificación para cada usuario de la lista.
   * Es invocado por EventosService y AvisosService al crear o editar eventos y avisos.
   * @param {number} idEvento - ID del evento al que refiere la notificación.
   * @param {string} mensajeEvento - Texto de la notificación.
   * @param {{ id_usuario: number }[]} inscriptos - Destinatarios identificados por su ID.
   * @returns {Promise<void>}
   */
  async crearNotificaciones(
    idEvento: number,
    mensajeEvento: string,
    inscriptos: { id_usuario: number }[],
  ): Promise<void> {
    const notificaciones = inscriptos.map((inscripto) =>
      this.notificacionesRepository.create({
        usuario: { id_usuario: inscripto.id_usuario },
        evento: { id_evento: idEvento },
        mensaje: mensajeEvento,
        leida: false,
      }),
    );
    await this.notificacionesRepository.save(notificaciones);
  }

  /**
   * Devuelve todas las notificaciones del usuario autenticado, ordenadas de más reciente a más antigua.
   * @param {number} idUsuario - ID del usuario propietario de las notificaciones.
   * @returns {Promise<Notificacion[]>} Lista de notificaciones ordenadas por fecha DESC.
   */
  async getMisNotificaciones(idUsuario: number): Promise<Notificacion[]> {
    return this.notificacionesRepository.find({
      where: { usuario: { id_usuario: idUsuario } },
      order: { fecha_creacion: 'DESC' },
    });
  }

  /**
   * Marca una notificación específica como leída y la devuelve actualizada.
   * @param {number} idNotificacion - ID de la notificación a marcar.
   * @returns {Promise<Notificacion>} Notificación con `leida = true`.
   * @throws {NotFoundException} Si no existe una notificación con ese ID.
   */
  async marcarLeida(idNotificacion: number): Promise<Notificacion> {
    const notificacion = await this.notificacionesRepository.findOneBy({ id_notificacion: idNotificacion });
    if (!notificacion) {
      throw new NotFoundException(`Notificación con ID ${idNotificacion} no encontrada`);
    }
    notificacion.leida = true;
    return this.notificacionesRepository.save(notificacion);
  }

  /**
   * Marca como leídas todas las notificaciones no leídas del usuario.
   * Opera por update masivo sin cargar las entidades individualmente.
   * @param {number} idUsuario - ID del usuario cuyas notificaciones se marcan.
   * @returns {Promise<void>}
   */
  async marcarTodasLeidas(idUsuario: number): Promise<void> {
    await this.notificacionesRepository.update(
      { usuario: { id_usuario: idUsuario }, leida: false },
      { leida: true }
    );
  }
}
