"use client";

import { useState,useEffect } from "react";
import { Notificacion } from "../types/entidades";
import{
   TraerTodasNotificaciones,
   NotificacionLeida,
   NotificacionLeidas,
} from  "../services/notificaciones"
import cards from "@/app/styles/cards.module.css";
import Card from "@/app/components/ui/card";
import Button from "@/app/components/ui/button";

export default function RenderizarNotifiaciones(){
    const [notificiaciones,setNotificaciones]= useState<Notificacion[]>([])
    const [cargando,setCargando]=useState<boolean>(true)
    const [error,setError]=useState<string | null>(null);
  
    useEffect(() => {

  async function TraerNotificaciones() {

    try {
      setError(null);
      const data = await TraerTodasNotificaciones();
      setNotificaciones(data);
    } 
    catch(error) {
      setError("No se pudieron cargar las notificaciones.");
    }
    finally {
      setCargando(false);
    }
  }
  TraerNotificaciones();
  const intervalo = setInterval(() => {
    TraerNotificaciones();
  },5000);
  return () => clearInterval(intervalo);},[]);
   
   const handleMarcarNotificacion=async(Id:number)=>{
      try{  
     const notificacionLeida =await NotificacionLeida(Id)
      setNotificaciones((prev)=>prev.map((N)=>(N.id_notificacion === Id ? notificacionLeida:N)))
      }catch(error){
        setError("No se pudo marcar la notificación como leída.");
      }
   }

   const handleMarcarNotificaciones=async()=>{
      try{  
     const notificacionLeidas= await NotificacionLeidas()
      setNotificaciones(notificacionLeidas)
      }catch(error){
        setError("No se pudo marcar la notificación como leída.");
      }
   }
    const tienePendientes = notificiaciones.some((notif) => !notif.leida);
   if(cargando){
    return <p>Cargando notificaciones...</p>;
  }
  if(error){
    return (
    <div>
      <p>⚠️ {error}</p>
      <Button
      onClick={()=>window.location.reload()}>
        Reintentar
      </Button>
  </div>
  );}
    return (
    <div>
      {tienePendientes && (
        <div>
          <Button
            onClick={() => handleMarcarNotificaciones()}
          >
            Marcar todas como leídas
          </Button>
        </div>
      )}

      <div className={cards.grid}>
        {notificiaciones.map(notif => (
          <Card
            key={notif.id_notificacion}
          >
            <div>
              <h3>
                {notif.evento?.titulo ?? "Aviso"}
              </h3>
              <p>
                {notif.mensaje}
              </p>
              {notif.evento && (
                <>
                  <p>
                    📅 {notif.evento.fecha}
                  </p>
                  <p>
                    ⏰ {notif.evento.horaInicio}
                  </p>
                </>
              )}
              <p>
                {new Date(
                  notif.fecha_creacion
                ).toLocaleDateString()}
              </p>
              {!notif.leida && (
                <Button
                  type="button"
                  onClick={() =>
                    handleMarcarNotificacion(
                      notif.id_notificacion
                    )
                  }
                >
                  Marcar leída
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}