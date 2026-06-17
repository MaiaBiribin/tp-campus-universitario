import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notificacion } from './notificacion.entity';

@Injectable()
export class NotificacionesService {

  constructor(
    @InjectRepository(Notificacion)
    private readonly notificacionesRepository: Repository<Notificacion>,
  ) {}

  //crear múltiples notificaciones
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

  // obtener notificaciones del usuario
  async getMisNotificaciones(idUsuario: number): Promise<Notificacion[]> {
    return this.notificacionesRepository.find({
      where: { usuario: { id_usuario: idUsuario } },
      order: { fecha_creacion: 'DESC' },
    });
  }

  async marcarLeida(idNotificacion: number): Promise<Notificacion> {
    const notificacion = await this.notificacionesRepository.findOneBy({ id_notificacion: idNotificacion });
    if (!notificacion) {
      throw new NotFoundException(`Notificación con ID ${idNotificacion} no encontrada`);
    }
    notificacion.leida = true;
    return this.notificacionesRepository.save(notificacion);
  }

  async marcarTodasLeidas(idUsuario: number): Promise<void> {
    await this.notificacionesRepository.update(
      { usuario: { id_usuario: idUsuario }, leida: false },
      { leida: true }
    );
  }
}