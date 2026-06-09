import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carrera } from './carrera.entity';

@Injectable()
export class CarrerasService {

  constructor(
    @InjectRepository(Carrera)
    private carrerasRepository: Repository<Carrera>,
  ) {}

  async findAll(): Promise<Carrera[]> {
    return this.carrerasRepository.find();
  }

  async create(nombre: string): Promise<Carrera> {
    const carrera = this.carrerasRepository.create({ nombre });
    return this.carrerasRepository.save(carrera);
  }
}