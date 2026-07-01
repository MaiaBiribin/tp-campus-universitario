import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evento } from './evento.entity';
import { Aviso } from '../avisos/aviso.entity';
import { Inscripcion } from '../inscripciones/inscripcion.entity';
import { NotificacionesService } from '../notificaciones/notificaciones.service';
import { CreateEventoDto } from './dto/create-evento.dto';
/**
 * Servicio encargado de la gestión de eventos académicos
 * Incluye creación, consulta, actualización, eliminación y validaciones de negocio.
 */
@Injectable()
export class EventosService {
  constructor(
    @InjectRepository(Evento)
    private readonly repo: Repository<Evento>,
    @InjectRepository(Inscripcion)
    private readonly inscripcionRepo: Repository<Inscripcion>,
    private readonly notificacionesService: NotificacionesService,
    @InjectRepository(Aviso)
    private readonly avisoRepo: Repository<Aviso>,
  ) {}

  /**
   * Obtiene todos los eventos.
   * @returns {Promise<Evento[]>} Lista de eventos.
   */
  findAll() {
    return this.repo.find();
  }

  /**
   * Obtiene un evento por id.
   * @param id del evento.
   * @returns {Promise<Evento | null>} Evento encontrado o null.
   */
  findOne(id: number) {
    return this.repo.findOneBy({ id_evento: id });
  }

  /**
   * Crea un nuevo evento con validación de horarios y notificaciones a inscriptos.
   * @param data -dto con los datos del evento.
   * @throws {BadRequestException} Si el horario es inválido o hay conflictos de aula.
   * @returns {Promise<Evento>} Evento creado.
   */
  async create(data: CreateEventoDto) {
    if (data.horaInicio >= data.horaFin) {
      throw new BadRequestException('La hora de inicio debe ser menor que la hora de fin');
    }
    const idAula = Number(data.aula?.id_aula);
    const aula = await this.repo.manager.getRepository('aulas').findOne({where:{id_aula:idAula}});
    const inscriptos = await this.inscripcionRepo.find({where:{materia:{
      id_materia:Number(data.materia?.id_materia)}}});
      if(aula && inscriptos.length > aula.capacidad){
        throw new BadRequestException(`El aula ${aula.nombre} no tiene capacidad suficiente. Capacidad: ${aula.capacidad}. Alumnos inscriptos: ${inscriptos.length}`);
      }
    const eventosExistentes = await this.repo.find({
      where: {
        fecha: data.fecha,
        aula: {
          id_aula: idAula,
        },
      },
    });
    for (const evento of eventosExistentes) {
      const inicioNuevo = data.horaInicio;
      const finNuevo = data.horaFin;
      const inicioExistente = evento.horaInicio;
      const finExistente = evento.horaFin;
      const hayConflicto = inicioNuevo < finExistente && finNuevo > inicioExistente;
      if (hayConflicto) {
        throw new BadRequestException(`El aula ${evento.aula.nombre} ya está ocupada de ${inicioExistente} a ${finExistente}. Elegí otro horario u otra aula.`);
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

    const eventoGuardado = await this.repo.save(nuevoEvento);

    if (inscriptos.length > 0) {
      await this.notificacionesService.crearNotificaciones(
        eventoGuardado.id_evento,
        `Nuevo evento: ${data.titulo} el ${data.fecha} de ${data.horaInicio} a ${data.horaFin}`,
        inscriptos.map(i => ({
          id_usuario: i.usuario.id_usuario,
        })),
      );
    }

    return eventoGuardado;

  }

  /**
   * Obtiene eventos asociados a un usuario.
   * @param idUsuario id del usuario.
   * @returns {Promise<Evento[]>} Lista filtrada de eventos.
   */
async eventosUsuario(idUsuario: number) {

  const ahora = new Date();

  const hoy = ahora.toLocaleDateString("sv-SE");


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

    const inicio = new Date(
      `${evento.fecha}T${evento.horaInicio}`
    );

    const fin = new Date(
      `${evento.fecha}T${evento.horaFin}`
    );

    return fin >= ahora;

  });

}

  /**
   * Elimina un evento si cumple reglas de negocio:
   * - Debe existir
   * - No puede ser futuro con avisos asociados
   * @param id id del evento
   * @throws {BadRequestException} Si no existe o no puede eliminarse.
   * @returns {{ message: string }} Confirmación de eliminación.
   */
  async remove(id: number) {
    const evento = await this.repo.findOne({where: { id_evento: id },});
    if (!evento) {
      throw new BadRequestException("El evento no existe");}
    const avisos = await this.avisoRepo.find({where: { evento: { id_evento: id } },});
    const ahora = new Date();
    const fechaEvento = new Date(`${evento.fecha}T${evento.horaInicio}`);
    const esPasado = fechaEvento < ahora;
    const tieneAvisos = avisos.length > 0;
    if (!esPasado && tieneAvisos) {
      throw new BadRequestException("No se puede eliminar un evento futuro con avisos asociados");
    }
    await this.repo.delete(id);
    return {message: "Evento eliminado correctamente",};
  }

  async eventoUsuario(idEvento:number,idUsuario:number){
    const evento =await this.repo.findOne({where:{
      id_evento:idEvento,materia:{inscripciones:{usuario:{id_usuario:idUsuario}}}}
    });
    if(!evento){
      throw new BadRequestException("No tenés acceso a este evento");
    }
    return evento;
  }

}