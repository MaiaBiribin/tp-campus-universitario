import { api } from "../api";
/**
 * busca todas las notificaciones que tiene un usuario.
 * @returns {Promise<res>} devuelve todas las notificaciones del usuario
 * @throw {Error} si es que no se pudo traer todas las notificaciones
 */
export async function TraerTodasNotificaciones(){

    const res = await api("/notificaciones/mis-notificaciones");
    if(!res.ok){
        console.log(await res.text());
        throw new Error("Error al traer las notificaciones");
    }
    return res.json();
}


/**
 * se encarga de cambiar el estado de la notificacion a leida
 * @param {number} id_notificacion el id de la notificacion que fue leida
 * @returns {Promise<res>} devulve la notificacion con el estado leida
 * @throw {Error} si es que no se pudo cambiar el estado de la notificacion
 */
export async function NotificacionLeida(
  id_notificacion:number
){
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
 * se encarga de cambiar el estado de todas las notificaciones a leidas
 * @returns {Promise<res>} devuelve a todas las notifiaciones como leidas.
 * @throw {Error} si es que no se pudo cambiar el estado de las notificaciones.
 */
export async function NotificacionLeidas(){
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
 * se encarga de cargar todas las notificaciones no leidas
 * @returns {Promise<res>} devuelve la cantidad de notificaciones no leidas.
 * @throw {Error} si es que no se pudo cargar las notificaciones no leidas.
 */
export async function CantidadNotificacionesSinLeer(){

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