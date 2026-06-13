"use client";

import { useState,useEffect } from "react";
import { Evento } from "../types/entidades";
import { api } from "../api";




export default function EventosDia(){
   const [eventoHoy,seteventoHoy]=useState<Evento | null>(null)
  
   const [cargando, setCargando] = useState<boolean>(true);
  
   useEffect(()=>{
      async function EventoDeHoy(){
        try{ 
        setCargando(true)
         //la ruta correspondiente de buscar el evento del dia.
         const res= await api("")

         if(!res.ok){
          throw new Error("error al buscar tus eventos")
         }

         const evento:Evento=await res.json()
         seteventoHoy(evento)
        }catch(error){
           console.error("error al cargar el evento de hoy",error)
        }finally{
          setCargando(false)
        }
      }
      EventoDeHoy()
   },[])
  
    /* 
   async function buscarUsario(){
     try{  
     const res= await api(`/usuarios`)

         if(!res.ok){
            throw new Error("no se encontro al usarario:")
         }
         
         const data:Usuario= await res.json()
         setusuario(data)

        await buscarEventoDia(data.id_usuario)
      }catch(error){
         console.error("error al buscar el usario.",error)
      }finally{
        setCargando(false)
      }
   }

   async function buscarEventoDia(usarioId:number) {
     try{
      //aca tendria que ir el endpoint de traer el evento del usario del dia actual
    const res = await api(`/usuarios/${usarioId}`)
      if(res.ok){
        const data= await res.json()
        seteventoHoy(data)
      }
     } catch(error){
        console.error("error al buscar la el evento del dia.",error)
     }
    
   }
   */



  if (cargando) return <p>Cargando tus datos...</p>;

    return(
        <div>
            <div>
                <h2>tu evento del dia:</h2>
                {eventoHoy?(
                    <div>
                        <h3>{eventoHoy.titulo}</h3>
                        <p>de:{eventoHoy.horaInicio} - a:{eventoHoy.horaFin} </p>
                    </div>
                    ):(
                        <p>Si queres ver en mas detalle tus otros eventos de la semana anda a la pestaña de eventos.</p>
                 )}
            </div>
        </div>
    )
}