import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual } from 'typeorm';
import { Evento } from './evento.entity';
import { Inscripcion } from '../inscripciones/inscripcion.entity';
import { NotificacionesService } from '../notificaciones/notificaciones.service';

@Injectable()
export class EventosService {
  constructor(
    @InjectRepository(Evento)
    private readonly repo: Repository<Evento>,

    @InjectRepository(Inscripcion)
    private readonly inscripcionRepo: Repository<Inscripcion>,

    private readonly notificacionesService: NotificacionesService,
  ) {}

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id_evento: id });
  }

  async create(data: any) {
    if (data.horaInicio >= data.horaFin) {
      throw new BadRequestException('La hora de inicio debe ser menor que la hora de fin');
    }
    const idAula = Number(data.aula?.id_aula);
    // busca eventos del mismo dia y aula
    const eventosExistentes = await this.repo.find({
      where: {
        fecha: data.fecha,
        aula: {
          id_aula: idAula,
        },
      },
    });
    // verifica superp de hs
    for (const evento of eventosExistentes) {
      const inicioNuevo = data.horaInicio;
      const finNuevo = data.horaFin;
      const inicioExistente = evento.horaInicio;
      const finExistente = evento.horaFin;
      const hayConflicto = inicioNuevo < finExistente && finNuevo > inicioExistente;
      if (hayConflicto) {
        throw new BadRequestException(`El aula ${evento.aula.nombre} ya está ocupada entre ${inicioExistente} y ${finExistente}`);
      }
    }

    const nuevoEvento = this.repo.create({
      titulo: data.titulo,
      fecha: data.fecha,
      horaInicio: data.horaInicio,
      horaFin: data.horaFin,
      estado: 'aceptado',
      aula: {
        id_aula: idAula,
      },
      tipoEvento: {
        id_tipo_evento: Number(data.tipoEvento?.id_tipo_evento),
      },
      materia: {
        id_materia: Number(data.materia?.id_materia),
      },
    });

    //return await this.repo.save(nuevoEvento);
    const eventoGuardado = await this.repo.save(nuevoEvento);

    // Busca todos los inscriptos en esa materia
    const inscriptos = await this.inscripcionRepo.find({
      where: { materia: { id_materia: Number(data.materia?.id_materia) } },
      relations: { usuario: true },
    });

    // Crea una notificación por cada inscripto
    if (inscriptos.length > 0) {
      await this.notificacionesService.crearNotificaciones(
        eventoGuardado.id_evento,
        Number(data.materia?.id_materia),
        `Nuevo evento: ${data.titulo} el ${data.fecha} de ${data.horaInicio} a ${data.horaFin}`,
        inscriptos.map(i => ({ id_usuario: i.usuario.id_usuario })),
      );
    }

    return eventoGuardado;

  }

async eventosUsuario(idUsuario: number) {

  const ahora = new Date();

  const hoy = ahora.toLocaleDateString("sv-SE");
  const horaActual = ahora.toTimeString().slice(0,5);


  const eventos = await this.repo.find({

    where: {
      materia: {
        inscripciones: {
          usuario: {
            id_usuario: idUsuario
          }
        }
      }
    },

    relations: {
      materia: {
        carrera: true,
      }
    },

    order: {
      fecha: "ASC",
      horaInicio: "ASC"
    }

  });


  return eventos.filter(evento => {

    if (evento.fecha > hoy) {
      return true;
    }


    if (evento.fecha === hoy) {
      return evento.horaInicio >= horaActual;
    }


    return false;

  });

}

  async updatePartial(id: number, data: any) {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  replace(id: number, data: any) {
    return this.repo.save({ id_evento: id, ...data });
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}