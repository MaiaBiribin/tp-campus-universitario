import { api } from "../api";



export async function TraerTodasNotificaciones(
 
){
    const res= await api(``)

    if(!res.ok){
        console.log(await res.text()
    )
    throw new Error("Error al traer las notificaciones")
    };
    
    return res.json()
}


export async function NotificacionLeida(
 leido:boolean
){
    const res= await api(`/${leido}`,{
        method:"Patch"
    });

   if(!res.ok){
     throw new Error("Error al cambiar el estado de la notificacion")
   }

  return res

}


export async function NotificacionLeidas(
 leido:boolean
){
    const res= await api(`/${leido}`,{
        method:"Patch"
    });

   if(!res.ok){
     throw new Error("Error al cambiar el estado de la notificacion")
   }

  return res

}