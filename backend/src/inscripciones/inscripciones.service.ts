import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Inscripcion } from "./inscripcion.entity";
import { Usuario } from "../usuarios/usuario.entity";
import { Materia } from "../materias/materia.entity";
import { CrearInscripcionDto } from "./crear-inscripcion.dto";

/**
 * Servicio de gestión de inscripciones.
 * Administra la relación entre usuarios y materias.
 * Es consumido por AvisosService y EventosService para obtener los destinatarios
 * de notificaciones asociadas a una materia.
 */
@Injectable()
export class InscripcionesService {

  constructor(
    @InjectRepository(Inscripcion)
    private inscripcionesRepo: Repository<Inscripcion>,

    @InjectRepository(Usuario)
    private usuariosRepo: Repository<Usuario>,

    @InjectRepository(Materia)
    private materiasRepo: Repository<Materia>
  ) {}

  /**
   * Inscribe uno o más usuarios en una materia en una sola operación.
   * Si un usuario del array no existe en la DB, se omite sin lanzar error.
   * La materia debe existir, de lo contrario se aborta la operación completa.
   * @param {CrearInscripcionDto} dto - Contiene el ID de la materia y el array de IDs de usuarios.
   * @returns {Promise<Inscripcion[]>} Lista de inscripciones creadas (puede ser menor que el array de usuarios si algunos no existen).
   * @throws {NotFoundException} Si la materia especificada no existe.
   */
  async crear(dto: CrearInscripcionDto): Promise<Inscripcion[]> {
    const materia = await this.materiasRepo.findOne({
      where: { id_materia: dto.id_materia }
    });

    if (!materia) {
      throw new NotFoundException('Materia no encontrada');
    }

    const creadas: Inscripcion[] = [];

    for (const idUsuario of dto.usuarios) {
      const usuario = await this.usuariosRepo.findOne({
        where: { id_usuario: idUsuario }
      });

      if (!usuario) {
        continue;
      }

      const inscripcion = this.inscripcionesRepo.create({ usuario, materia });
      creadas.push(await this.inscripcionesRepo.save(inscripcion));
    }

    return creadas;
  }

  /**
   * Devuelve todas las inscripciones de una materia con datos del usuario y la materia.
   * @param {number} id - ID de la materia.
   * @returns {Promise<Inscripcion[]>} Inscripciones con relaciones de usuario y materia cargadas.
   */
  async obtenerPorMateria(id: number): Promise<Inscripcion[]> {
    return this.inscripcionesRepo.find({
      where: { materia: { id_materia: id } },
      relations: { usuario: true, materia: true }
    });
  }

  /**
   * Devuelve todas las inscripciones del sistema sin filtros ni relaciones adicionales.
   * @returns {Promise<Inscripcion[]>} Lista completa de inscripciones.
   */
  async listar(): Promise<Inscripcion[]> {
    return this.inscripcionesRepo.find();
  }
}
