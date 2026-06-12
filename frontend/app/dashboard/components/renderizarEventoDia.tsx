"use client";

import { useState,useEffect } from "react";
import { Evento } from "@/app/lib/entidades";
import { Usuario } from "@/app/lib/entidades";
import { api } from "@/app/lib/api";



export default function EventosDia(){
   const [eventoHoy,seteventoHoy]=useState<Evento | null>(null)
   const [usuario,setusuario]=useState<Usuario | null>(null)
   const [cargando, setCargando] = useState<boolean>(true);
   async function buscarUsario(){
     try{  
     const res= await api(`/usuarios`)

         if(!res.ok){
            throw new Error("no se encontro al usarario:")
         }
         
         const data:Usuario= await res.json()
         setusuario(data)

        await buscarEventoDia(data.idUsario)
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
   
useEffect(() => {
  buscarUsario(); 
}, [])


  if (cargando) return <p>Cargando tus datos...</p>;
  if (!usuario) return <p>No pudimos autenticar tu usuario.</p>;

    return(
        <div>
            <div>
            <h1>hola,{usuario?.nombre},{usuario?.apellido }</h1>
            </div>

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