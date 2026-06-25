import { api } from "../api";
import { Materia } from "../types/entidades";

/**
 * Obtiene las materias asociadas a una carrera.
 * @param {number} id  de la carrera.
 * @returns {Promise<Materia[]>} Lista de materias de la carrera.
 * @throws {Error} Si falla la carga de materias.
 */
export async function getMateriasPorCarrera(id: number): Promise<Materia[]> {

  const res =
    await api(`/materias/carrera/${id}`);
  if (!res.ok) {
    throw new Error("Error cargando materias");
  }
  return res.json();
}