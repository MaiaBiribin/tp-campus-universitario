"use client";

import { useEffect, useState } from "react";
import { getAvisosPorEvento } from "@/app/services/avisos";
import { Aviso } from "@/app/types/entidades";
import { getEventos } from "@/app/services/eventos";
import dashboard from "@/app/styles/dashboard.module.css";

export default function AvisosRecientes() {

  const [avisos,setAvisos] = useState<Aviso[]>([]);

  useEffect(()=>{
    async function cargarAvisos(){
      try{
        const eventos = await getEventos();
        const todosAvisos: Aviso[] = [];
        for(const evento of eventos){
          const avisosEvento =await getAvisosPorEvento(evento.id_evento);
          todosAvisos.push(
            ...avisosEvento
          );
        }
        const ordenados = todosAvisos.sort(
          (a,b)=>
            new Date(b.fecha_creacion).getTime()
            -
            new Date(a.fecha_creacion).getTime()
        );
        setAvisos(ordenados.slice(0,3));

      }catch(error){
        console.error("Error cargando avisos",error);
      }
    }
    cargarAvisos();
  },[]);


  return (

    <div className={dashboard.eventGrid}>
      {avisos.length > 0 ? (
        avisos.map(aviso => (
          <div
            key={aviso.id_aviso}
            className={dashboard.mainEvent}
          >
            <div>
              <p className={dashboard.label}>
                Aviso
              </p>
              <h3>
                {aviso.evento?.titulo ?? "Nuevo aviso"}
              </h3>
              <div className={dashboard.info}>
                <p>
                  {aviso.mensaje}
                </p>
                <p>
                  📅 {
                    new Date(
                      aviso.fecha_creacion
                    ).toLocaleDateString()
                  }
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className={dashboard.mainEvent}>
          <p>
            No hay avisos recientes.
          </p>
        </div>
      )}
    </div>
  );
}