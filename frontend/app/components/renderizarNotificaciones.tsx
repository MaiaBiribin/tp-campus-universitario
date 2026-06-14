"use client";

import { useState,useEffect } from "react";
import { Notificacion } from "../types/entidades";

import{
   TraerTodasNotificaciones,
   NotificacionLeida,
   NotificacionLeidas,
} from  "../services/notificaciones"


export default function RenderizarNotifiaciones(){
    const [notificiaciones,setNotificaciones]= useState<Notificacion[]>([])
    const [cargando,setCargando]=useState<boolean>(true)
  
    useEffect(()=>{
    async function TraerNotificaciones() {
         setCargando(true)
        try{
          const data= await TraerTodasNotificaciones()
          setNotificaciones(data)
        }catch(error){
            console.error("error al traer todas las notificaciones",error)
        }finally{
            setCargando(false)
        }
   }
   TraerNotificaciones()
    },[])
   
   const handleMarcarNotificacion=async(Id:number)=>{
      try{  
     const notificacionLeida= await NotificacionLeida(Id,true)
      setNotificaciones((prev)=>prev.map((N)=>(N.id_notificacion === Id ? notificacionLeida:N)))
      }catch(error){
        console.error("no se pudo marcar la notificacion",error)
      }
   }

   const handleMarcarNotificaciones=async()=>{
      try{  
     const notificacionLeidas= await NotificacionLeidas()
      setNotificaciones(notificacionLeidas)
      }catch(error){
        console.error("no se pudo marcar la notificacion",error)
      }
   }
    const tienePendientes = notificiaciones.some((notif) => !notif.leida);
   if(cargando) return <p>Cargando Notifiaciones</p>
    return(
    <div>
      <main>
        <div>
        <header>
            <h1>Mis Notifiaciones:</h1>
        </header>
        </div>
      {tienePendientes && (
          <div style={{ marginBottom: "15px" }}>
            <button
              onClick={handleMarcarNotificaciones}
              style={{
                padding: "8px 12px",
                backgroundColor: "#15105a",
                color: "white",
                border: "none",
                cursor: "pointer",
                borderRadius: "4px",
              }}
            >
              Marcar todas como leídas
            </button>
          </div>
        )}
       <div>
        <ul>
         {notificiaciones.map((notif)=>( 
            <li
             key={notif.id_notificacion}
             style={{
                padding: "15px",
                margin: "10px 0",
                border: "1px solid #0f0303",
                borderRadius: "6px",
                backgroundColor: notif.leida ? "#f9f9f9" : "#e3f2fd", // Fondo celeste si no está leída
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
            <div>
                <p>{notif.mensaje}</p>

            </div>
            
            {!notif.leida && (
                    <button
                      onClick={() => handleMarcarNotificacion(notif.id_notificacion)}
                      style={{ padding: "6px 12px", cursor: "pointer" }}
                    >
                      Leída
                    </button>
                  )}
            </li>
         ))}
        </ul>
       </div>
      </main>
    </div>
   )
}