import { api } from "../api";
import { Notificacion } from "../types/entidades";

/**
 * Obtiene las notificaciones del usuario
 * @returns {Promise<Notificacion[]>} Lista de notificaciones.
 * @throws {Error} Si no se pueden cargar las notificaciones.
 */
export async function TraerTodasNotificaciones(): Promise<Notificacion[]> {

    const res = await api("/notificaciones/mis-notificaciones");
    if(!res.ok){
        throw new Error("Error al traer las notificaciones");
    }
    return res.json();
}

/**
 * Marca una notificación específica como leída
 * @param {number} id_notificacion id de la notificación.
 * @returns {Promise<Notificacion>} Notificación actualizada.
 * @throws {Error} Si no se pudo actualizar el estado.
 */
export async function NotificacionLeida(
  id_notificacion: number
): Promise<Notificacion> {
    const res = await api(
      `/notificaciones/${id_notificacion}/leida`,
      {
        method:"PATCH"
      }
    );
    if(!res.ok){
      throw new Error(
        "Error al cambiar estado notificacion"
      );
    }
    return res.json();
}

/**
 * Marca todas las notificaciones pendientes como leídas
 * @returns {Promise<Notificacion[]>} Lista de notificaciones actualizadas.
 * @throws {Error} Si falla la actualización masiva.
 */
export async function NotificacionLeidas(): Promise<Notificacion[]> {
    const res = await api(
      "/notificaciones/marcar-todas-leidas",
      {
        method:"PATCH"
      }
    );

    if(!res.ok){
      throw new Error(
        "Error al cambiar estado notificaciones"
      );
    }
    return res.json();
}

/**
 * Obtiene la cantidad de notificaciones no leídas.
 * @returns {Promise<number>} Cantidad de notificaciones pendientes.
 * @throws {Error} Si falla la carga de notificaciones.
 */
export async function CantidadNotificacionesSinLeer(): Promise<number> {

    const res = await api(
      "/notificaciones/mis-notificaciones"
    );
    if(!res.ok){
      throw new Error("No se pudieron cargar");
    }
    const data = await res.json();
    return data.filter(
      (n:any)=>!n.leida
    ).length;
}