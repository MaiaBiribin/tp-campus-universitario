"use client";

import { useEffect, useState } from "react";
import { getAvisosPorEvento } from "@/app/services/avisos";
import { Aviso } from "@/app/types/entidades";
import { getEventos } from "@/app/services/eventos";
import dashboard from "@/app/styles/dashboard.module.css";
import forms from "@/app/styles/forms.module.css";

export default function AvisosRecientes() {

  const [avisos,setAvisos] = useState<Aviso[]>([]);
  const [cargando,setCargando] = useState(true);
  const [error,setError] = useState("");

  useEffect(()=>{

    async function cargarAvisos(){
      try{
        setCargando(true);
        setError("");

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

        setError("No se pudieron cargar los avisos recientes.");
      }finally{
        setCargando(false);
      }
    }
    cargarAvisos();
  },[]);


  if(cargando){
    return (
      <div className={dashboard.mainEvent}>
        <p className={forms.helper}>
          Cargando avisos...
        </p>
      </div>
    );
  }


  if(error){
    return (
      <div className={dashboard.mainEvent}>
        <p className={forms.error}>
          {error}
        </p>
      </div>
    );
  }

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