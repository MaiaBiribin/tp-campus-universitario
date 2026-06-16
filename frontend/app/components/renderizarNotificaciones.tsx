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
     const notificacionLeida =await NotificacionLeida(Id)
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