import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import {Aula} from './aula.entity';

@Injectable()
export class AulasService {

    constructor(
     @InjectRepository(Aula)
     private aulasRepository: Repository<Aula>,
    ){}

    async findAll(): Promise<Aula[]> {
        return this.aulasRepository.find();
    }

    async create(
        nombre: string,
        capacidad: number,
        piso: number,
        ubicacion: string,
    ): Promise<Aula> {
        const aula = this.aulasRepository.create({
        nombre,
        capacidad,
        piso,
        ubicacion,
    });
        return this.aulasRepository.save(aula);
    }
}
