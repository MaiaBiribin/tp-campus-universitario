import { api } from "../api";
/**
 * busca todas las materias de cada carrera
 * @param {number} id el id de la carrera
 * @returns {Promise<res>} devuelve todas las materias asociadas a esa materia
 * @throw {Error} si es que no se pudo cargar las materias.
 */
export async function getMateriasPorCarrera(
  id: number
) {

  const res =
    await api(`/materias/carrera/${id}`);

  if (!res.ok) {
    console.log(
      await res.text()
    );
    throw new Error("Error cargando materias");
  }
  return res.json();
}