import { api } from "../api";

export async function TraerTodasNotificaciones(){

    const res = await api("/notificaciones/mis-notificaciones");
    if(!res.ok){
        console.log(await res.text());
        throw new Error("Error al traer las notificaciones");
    }
    return res.json();
}



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