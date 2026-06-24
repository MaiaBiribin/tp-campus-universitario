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

  // 1. Obtener todas las aulas
  async findAll(): Promise<Aula[]> {
    return await this.aulasRepository.find();
  }

  // 2. Obtener una por ID
  async findOne(id: number): Promise<Aula> {
    const aula = await this.aulasRepository.findOneBy({ id_aula: id });
    if (!aula) {
      throw new NotFoundException(`Aula con ID ${id} no encontrada`);
    }
    return aula;
  }

  // 3. Reemplazo completo (PUT)
  async replace(id: number, aulaData: Partial<Aula>): Promise<Aula> {
    const aula = await this.findOne(id);
    const aulaActualizada = this.aulasRepository.merge(aula, aulaData);
    return await this.aulasRepository.save(aulaActualizada);
  }

  // 4. Eliminar aula
  async delete(id: number): Promise<void> {
    const aula = await this.findOne(id);
    await this.aulasRepository.remove(aula);
  }
}