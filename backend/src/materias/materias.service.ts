import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Materia } from './materia.entity';

@Injectable()
export class MateriasService {

  constructor(
    @InjectRepository(Materia)
    private materiasRepository: Repository<Materia>,
  ) {}

  async findAll(): Promise<Materia[]> {
    return this.materiasRepository.find();
  }

  async findByCarrera(id_carrera: number): Promise<Materia[]> {
    return this.materiasRepository.find({
      where: { carrera: { id_carrera } }
    });
  }

  async create(nombre: string, id_carrera: number): Promise<Materia> {
    const materia = this.materiasRepository.create({
      nombre,
      carrera: { id_carrera },
    });
    return this.materiasRepository.save(materia);
  }
}