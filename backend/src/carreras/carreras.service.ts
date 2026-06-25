import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carrera } from './carrera.entity';

/**
 * Servicio de gestión de carreras universitarias.
 * Provee operaciones de consulta y creación sobre la tabla `carreras`.
 */
@Injectable()
export class CarrerasService {

  constructor(
    @InjectRepository(Carrera)
    private carrerasRepository: Repository<Carrera>,
  ) {}

  /**
   * Devuelve todas las carreras registradas en el sistema.
   * @returns {Promise<Carrera[]>} Lista de carreras.
   */
  async findAll(): Promise<Carrera[]> {
    return this.carrerasRepository.find();
  }

  /**
   * Crea y persiste una nueva carrera universitaria.
   * @param {string} nombre - Nombre de la carrera.
   * @returns {Promise<Carrera>} Carrera creada con su ID generado.
   */
  async create(nombre: string): Promise<Carrera> {
    const carrera = this.carrerasRepository.create({ nombre });
    return this.carrerasRepository.save(carrera);
  }
}
