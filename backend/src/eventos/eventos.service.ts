import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evento } from './evento.entity';

@Injectable()
export class EventosService {
  constructor(
    @InjectRepository(Evento)
    private readonly repo: Repository<Evento>,
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
    return await this.repo.save(nuevoEvento);
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