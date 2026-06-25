import { api } from "../api";
/**
 * Obtiene todas las aulas disponibles
 * @returns {Promise<Aula[]>} Lista de aulas en formato JSON.
 * @throws {Error} Si falla la petición al servidor.
 */
export async function getAulas() {
  const res =
    await api("/aulas");
  if (!res.ok) {
    throw new Error("Error cargando aulas");
  }
  return res.json();
}