import { api } from "../api";
import { Inscripcion } from "../types/entidades";

/**
 * Obtiene las inscripciones asociadas a una materia
 * @param {number} idMateria id de la materia.
 * @returns {Promise<Inscripcion[]>} Lista de inscripciones.
 * @throws {Error} Si falla la carga de inscripciones.
 */
export async function getInscripcionesPorMateria(idMateria: number): Promise<Inscripcion[]> {
  const res =
    await api(
      `/inscripciones/materia/${idMateria}`
    );
  if (!res.ok) {
    throw new Error(
      "Error cargando inscripciones"
    );
  }
  return res.json();
}

/**
 * Inscribe usuarios en una materia
 * @param {number} idMateria id de la materia
 * @param {number[]} usuarios ids de usuarios a inscribir
 * @returns {Promise<Inscripcion[]>} Inscripciones creadas
 * @throws {Error} Si falla la inscripción
 */
export async function inscribirUsuarios(idMateria: number,usuarios: number[]): Promise<Inscripcion[]> {
  const res =
    await api(
      "/inscripciones",
      {
        method: "POST",

        body: JSON.stringify({
          id_materia: idMateria,
          usuarios,
        }),
      }
    );

  if (!res.ok) {
    throw new Error(
      "Error al inscribir usuarios"
    );
  }

  return res.json();
}

/**
 * Extrae los identificadores de usuarios inscritos.
 * @param {Inscripcion[]} inscripciones a procesar.
 * @returns {number[]} ids de usuarios inscritos.
 */
export function obtenerIdsUsuariosInscriptos(inscripciones: Inscripcion[]): number[] {

  return inscripciones.map(
    inscripcion =>
      inscripcion.usuario.id_usuario
  );
}

export async function getCantidadInscriptos(idMateria:number){
 const res = await api(
  `/materias/${idMateria}/inscriptos`
 );

 if(!res.ok){
  throw new Error("No se pudo obtener cantidad de inscriptos");
 }
 return res.json();

}