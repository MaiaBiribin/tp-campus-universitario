import { api } from "../api";



export async function TraerTodasNotificaciones(
 
){
    const res= await api(`mis-notificaciones`)

    if(!res.ok){
        console.log(await res.text()
    )
    throw new Error("Error al traer las notificaciones")
    };
    
    return res.json()
}


export async function NotificacionLeida(
  id_notificacion:number,
    leido:boolean
){
    const res= await api(`${id_notificacion}/${leido}`,{
        method:"PATCH"
    });

   if(!res.ok){
     throw new Error("Error al cambiar el estado de la notificacion")
   }

  return await res.json()

}


export async function NotificacionLeidas(
 
){
    const res= await api(`marcar-todas-leidas'`,{
        method:"PATCH",
    });

   if(!res.ok){
     throw new Error("Error al cambiar el estado de la notificacion")
   }

  return await res.json()

}