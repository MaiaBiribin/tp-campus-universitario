"use client"
import { useState,useEffect } from "react";
import { Evento } from "../types/entidades";

import { api } from "../api";



export default function RenderizarEventos(){
       const [eventos,seteventos]=useState<Evento []| null>(null)
    
        const [cargando, setCargando] = useState<boolean>(true);
   
        useEffect(()=>{
           async function cargarEventos(){
               try{
               setCargando(true)
               //aca iria el endpoint de todos los eventos del usario.
               const res= await api("/eventos")

               if(!res.ok){
                throw new Error("hubo un error al cargar los datos")
               }

               const eventos:Evento[] = await res.json()
                 seteventos(eventos)
               }catch (error){
                console.error("error la buscar los eventos",error)
               } finally{
                 setCargando(false)
               }
             
          

           }
           cargarEventos()
        },[])



        /*
        async function buscarUsario():Promise<Usuario | null>{
          try{  
            //tambien este
          const res= await api(`/usuarios`)
     
              if(!res.ok){
                 throw new Error("no se encontro al usarario:")
              }
              
              const data:Usuario= await res.json()
              setusuario(data)
              return data
           }catch(error){
              console.error("error al buscar el usario.",error)
              return null
           }
        }
     
        async function buscarEventos(usuarioId: number){
            try{
                //quizas haya que cambiar este campo
              const res= await api(`/usuarios/${usuarioId}`)

                if (!res.ok) {
                   throw new Error("No se pudieron obtener los eventos");
                 }

              const data: Evento[] = await res.json();
              seteventos(data); 
            }catch(error){
                console.error("No se pudo encontrar los eventos:",error)
            }

        }

        useEffect(() => {
    async function inicializarDatos() {
      try {
        //tambien esta
        const usuarioLogeado=await buscarUsario()

       if(usuarioLogeado){
             await buscarEventos(usuarioLogeado.idUsario)
       }


        
      ;
      } catch (error) {
        console.error("Error al inicializar la pantalla:", error);
      } finally {
        setCargando(false);
      }
    }

    inicializarDatos();
  }, []);
 */
  if (cargando) return <p>Cargando eventos de la semana...</p>;
 
    return(
        <div>
            <main>
                <header>
                    <h1>Lista de eventos en la semana</h1>
                </header>

                <section>
                 {!eventos || eventos.length === 0?(
                    <p>No tienes aun eventos asignados.</p>
                 ):(
                    <div>
                        {eventos.map((ev)=>(
                            <div
                              key={ev.id_evento}>
                              <h3>Titulo:{ev.titulo}</h3>
                               <p>fecha:{ev.fecha} </p>
                               <p>De:{ev.horaFin}-:{ev.horaFin}</p>
                                <p>aula:{ev.aula.nombre}</p>
                                <p>materia:{ev.materia.nombre}</p> 
                            </div>
                        ))
                        }
                    </div>
                 )}
                </section>
            </main>
        </div>
    )
}