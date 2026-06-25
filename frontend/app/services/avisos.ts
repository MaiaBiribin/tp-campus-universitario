import { api } from "../api";
import { Aviso } from "../types/entidades";

/**
 * se encarga de recibir los datos para crear un nuevo aviso de un evento
 * @param {string} mensaje el mensaje que escribe el profesor
 * @param {number} id_evento el id del evento del cual se quiera crear un aviso
 * @throw {Error} si falla en crear el aviso
 * @returns {Promise<res.json>}   crea el aviso
 */
export async function crearAviso(
  mensaje: string,
  id_evento: number
) {
  const res = await api("/avisos", {
    method: "POST",
    body: JSON.stringify({
      mensaje,
      id_evento,
    }),
  });
  if (!res.ok) {
    throw new Error("Error creando aviso");
  }
  return res.json();
}

/**
 * busca los avisos que tiene un evento
 * @param {number} id_evento el evento que se quiere buscar su avisos
 * @returns {Promise<res>} devuelve los avisos del evento buscado
 * @throw {Error} tira error si es que no encuentra los avisos
 */
export async function getAvisosPorEvento(
  id_evento:number
): Promise<Aviso[]> {
  const res = await api(
    `/avisos/evento/${id_evento}`
  );
  if (!res.ok) {
    throw new Error("Error cargando avisos");
  }
  return res.json();
}
/**
 *elimina el aviso 
 * @param {number} id el id del aviso que se quiere borrar
 * @returns {Promis<res>} devuelve si fue exitosa la operacion
 * @throw {Error} si es que no se pudo borrar el aviso
 */
export async function eliminarAviso(id:number){
  const res = await api(
    `/avisos/${id}`,
    {
      method:"DELETE",
    }
  );

  if(!res.ok){
    throw new Error(
      "Error eliminando aviso"
    );
  }

  return res.json();
}
/**
 * busca todos loas aviso que hay en el sistema
 * @returns {Promise<res>} devuelve los avisos que hay
 * @throw {Error} si es que no se pudo conseguir los avisos
 */
export async function getAvisos(): Promise<Aviso[]> {
  const res = await api("/avisos");
  if(!res.ok){
    throw new Error(
      "Error cargando avisos"
    );
  }

  return res.json();
}