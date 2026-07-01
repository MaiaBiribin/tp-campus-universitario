import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Materia } from './materia.entity';

/**
 * Servicio de gestión de materias académicas.
 * Permite consultar materias globalmente o filtradas por carrera, y crear nuevas.
 */
@Injectable()
export class MateriasService {

  constructor(
    @InjectRepository(Materia)
    private materiasRepository: Repository<Materia>,
  ) {}

  /**
   * Devuelve todas las materias registradas en el sistema.
   * @returns {Promise<Materia[]>} Lista completa de materias.
   */
  async findAll(): Promise<Materia[]> {
    return this.materiasRepository.find();
  }

  /**
   * Devuelve las materias pertenecientes a una carrera específica.
   * Útil para poblar selectores en el frontend según la carrera seleccionada.
   * @param {number} id_carrera - ID de la carrera a filtrar.
   * @returns {Promise<Materia[]>} Materias de esa carrera.
   */
  async findByCarrera(id_carrera: number): Promise<Materia[]> {
    return this.materiasRepository.find({
      where: { carrera: { id_carrera } }
    });
  }

  /**
   * Crea y persiste una nueva materia asociada a una carrera.
   * La carrera se referencia por FK sin cargar la entidad completa.
   * @param {string} nombre - Nombre de la materia.
   * @param {number} id_carrera - ID de la carrera a la que pertenece.
   * @returns {Promise<Materia>} Materia creada con su ID generado.
   */
  async create(nombre: string, id_carrera: number): Promise<Materia> {
    const materia = this.materiasRepository.create({
      nombre,
      carrera: { id_carrera },
    });
    return this.materiasRepository.save(materia);
  }

  async cantidadInscriptos(id_materia:number): Promise<number>{
    const materia = await this.materiasRepository.findOne({
    where:{
      id_materia
    },
    relations:{
      inscripciones:true
    }
  });
  if(!materia){
    return 0;
  }

  return materia.inscripciones.length;}
}
