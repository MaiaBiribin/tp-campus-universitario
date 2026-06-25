import { api } from "../api";
import { Aviso } from "../types/entidades";

/**
 * Crea un nuevo aviso asociado a un evento
 * @param {string} mensaje contenido del aviso
 * @param {number} id_evento id del evento asociado
 * @throws {Error} si falla en crear el aviso
 * @returns {Promise<res.json>} aviso creado
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
 * Obtiene los avisos asociados a un evento.
 * @param {number} id_evento id del evento.
 * @returns {Promise<Aviso[]>} Lista de avisos del evento.
 * @throws {Error} Si no se pueden cargar los avisos.
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
 * Elimina un aviso existente.
 * @param {number} id - Identificador del aviso.
 * @returns {Promise<Aviso>} Aviso eliminado.
 * @throws {Error} Si falla la eliminación.
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
 * Obtiene todos los avisos registrados
 * @returns {Promise<Aviso[]>} lista de avisos.
 * @throws {Error} Si falla la carga de avisos.
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

/**
 * Actualiza el mensaje de un aviso.
 * @param {number} id identificador del aviso.
 * @param {string} mensaje nuevo mensaje.
 * @returns {Promise<Aviso>} Aviso actualizado.
 * @throws {Error} Si falla la actualización.
 */
export async function editarAviso(id: number,mensaje: string,): Promise<Aviso> {
  const res = await api(
    `/avisos/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify({
        mensaje,
      }),
    },
  );
  if (!res.ok) {
    throw new Error("Error actualizando aviso",);
  }
  return res.json();
}
/**
 * Obtiene un aviso por id.
 * @param {number} id identificador del aviso.
 * @returns {Promise<Aviso>} Aviso encontrado.
 * @throws {Error} Si no puede obtenerse.
 */
export async function getAvisoById(id:number): Promise<Aviso> {
  const res = await api(`/avisos/${id}`);
  if(!res.ok){
    throw new Error("Error cargando aviso");
  }
  return res.json();
}