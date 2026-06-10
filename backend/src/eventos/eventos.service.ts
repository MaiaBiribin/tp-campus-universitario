import { Injectable } from '@nestjs/common';
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
  const evento = this.repo.create({
    titulo: data.titulo,
    fecha: data.fecha,
    horaInicio: data.horaInicio,
    horaFin: data.horaFin,
    estado: 'aceptado',

    aula: { id_aula: Number(data.aula?.id) },
    tipoEvento: { id_tipo_evento: Number(data.tipoEvento?.id) },
    materia: { id_materia: Number(data.materia?.id) },
  });

  const guardado = await this.repo.save(evento);

  console.log("EVENTO GUARDADO:");
  console.log(guardado);

  return guardado;
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