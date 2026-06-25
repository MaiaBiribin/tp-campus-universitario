
import { api } from "../api";

/**
 * busca las carreras en el sistema
 * @returns {Promise<res>} devulve todas las carreras que hay
 * @throw {Error} si es que no se pudo cargar las carreras
 */
export async function getCarreras() {
  const res =
    await api("/carreras");

  if (!res.ok) {
    console.log(await res.text());
    throw new Error("Error cargando carreras");
  }
  return res.json();
}