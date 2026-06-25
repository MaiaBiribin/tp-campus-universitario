import { api } from "../api";
/**
 *  usa la api para luego devolver todas las aulas de la base de datos.
 * throw {Error} en el caso de que hubo un problema en traer las aulas
 * @returns {Promise<res>} devuevle la promesa con todas las aulas del sistema * 
 */
export async function getAulas() {
  const res =
    await api("/aulas");
  if (!res.ok) {
    throw new Error("Error cargando aulas");
  }
  return res.json();
}