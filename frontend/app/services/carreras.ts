import { api } from "../api";
import { Carrera } from "../types/entidades";

/**
 * Obtiene todas las carreras disponibles.
 * @returns {Promise<Carrera[]>} Lista de carreras registradas.
 * @throws {Error} Si falla la carga de carreras.
 */
export async function getCarreras(): Promise<Carrera[]> {
  const res =
    await api("/carreras");

  if (!res.ok) {
    throw new Error("Error cargando carreras");
  }
  return res.json();
}