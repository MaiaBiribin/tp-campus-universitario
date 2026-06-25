import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aula } from './aula.entity';

@Injectable()
export class AulasService {
  constructor(
    @InjectRepository(Aula)
    private aulasRepository: Repository<Aula>,
  ) {}

  /**
   * Obtiene todas las aulas.
   * @returns {Promise<Aula[]>} Lista de aulas registradas.
   */
  async findAll(): Promise<Aula[]> {
    return await this.aulasRepository.find();
  }

   /**
   * Busca un aula por su id
   * @param {number} id  identificador del aula.
   * @returns {Promise<Aula>} Aula encontrada.
   * @throws {NotFoundException} Si el aula no existe.
   */
  async findOne(id: number): Promise<Aula> {
    const aula = await this.aulasRepository.findOneBy({ id_aula: id });
    if (!aula) {
      throw new NotFoundException(`Aula con ID ${id} no encontrada`);
    }
    return aula;
  }

}