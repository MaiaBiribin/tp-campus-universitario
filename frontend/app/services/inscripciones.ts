import { api } from "../api";
import { Inscripcion } from "../types/entidades";
/**
 * se encarga de buscar las inscripciones que hay de una materia
 * @param {number} idMateria la materia que se este buscando
 * @returns {promise<res>} devuelve las todas las inscripciones de esa materia
 * @throw {Error} si es que no se pudo carga las inscripciones
 */
export async function getInscripcionesPorMateria(
  idMateria: number
) {

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
 * se encarga de inscribir a un usario en un materia
 * @param {number} idMateria la materia la cual se quiera inscribir
 * @param {number} usuarios los usuarios que se les quiera escribir a esa materia
 * @returns {Promise<res>} inscribe a los usuarios a la materia designada.
 * @throw {Error} si es que no se pudo inscribir a los usuarios a la materia
 */
export async function inscribirUsuarios(
  idMateria: number,
  usuarios: number[]
) {

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
 * busca todos los id de los usuarios inscriptos en el sistema
 * @param {Inscripcion} inscripciones array con todas las inscripciones en el sistema
 * @returns {Promise<res>} devulve los id de los usuarios inscriptos en el sistema.
 */
export function obtenerIdsUsuariosInscriptos(
  inscripciones: Inscripcion[]
): number[] {

  return inscripciones.map(
    inscripcion =>
      inscripcion.usuario.id_usuario
  );

}