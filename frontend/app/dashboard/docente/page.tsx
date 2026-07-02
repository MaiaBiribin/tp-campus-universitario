"use client";

import dashboard from "@/app/styles/dashboard.module.css";
import cards from "@/app/styles/cards.module.css";
import { useEffect, useState } from "react";
import { Evento } from "@/app/types/entidades";
import { getEventos } from "@/app/services/eventos";
import ProximoEvento from "@/app/components/proximoEvento";
import { getAvisosPorEvento } from "@/app/services/avisos";
import forms from "@/app/styles/forms.module.css";

/**
 * Dashboard principal del docente.
 * Muestra un resumen de actividad académica: clases del día, cantidad de avisos activos y el próximo evento programado.
 * @returns {JSX.Element} Vista del panel docente.
 */
export default function DashboardDocente() {
  const [clasesHoy, setClasesHoy] =useState(0);
  const [avisosActivos,setAvisosActivos] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    /**
    * Carga la información necesaria para el panel docente.
    * Obtiene eventos, calcula las clases del día y cuenta avisos asociados.
    * @async
    * @returns {Promise<void>}
    */
    async function cargar() {
      try{
        setError("");
        setCargando(true);
        const eventos = await getEventos();
        const ahora = new Date();
        const hoy = ahora.toISOString().split("T")[0];
        const clasesDeHoy = eventos.filter((evento: Evento) => {
          const inicio = new Date(`${evento.fecha}T${evento.horaInicio}`);
        const fin = new Date(`${evento.fecha}T${evento.horaFin}`);
        return (evento.fecha === hoy &&ahora >= inicio &&ahora <= fin);
    });
    setClasesHoy(clasesDeHoy.length);
      let cantidadAvisos = 0;
      for(const evento of eventos){
      const avisos =
        await getAvisosPorEvento(evento.id_evento);
        cantidadAvisos += avisos.length;
      }
    setAvisosActivos(cantidadAvisos);
   }catch{
    setError("No se pudo cargar la información del panel.");
  }finally {
    setCargando(false);
  }

}
cargar();
},[]);

 if (cargando) {
    return (
      <p className={forms.helper}>Cargando panel...</p>
    );
  }

  return (
    <>
    <header className={dashboard.header}>
      <h1>Panel docente</h1>
      <p>
        Consultá tus clases, revisá aulas asignadas
        y mantené informados a tus estudiantes.</p>
      </header>
      {error && (
        <p
          role="alert"
          className={forms.error}
        >
          ⚠️ {error}
        </p>
      )}
      {/* RESUMEN */}
      <section>
        <h2 className={dashboard.sectionTitle}>
          Resumen del día</h2>
          <div className={dashboard.summaryGrid}>
          <div className={cards.metric}>
            <p>Clases hoy</p>
            <h3>{clasesHoy}</h3>
          </div>
          <div className={cards.metric}>
            <p>Avisos activos</p>
            <h3>{avisosActivos}</h3>
          </div>
          </div>
          </section>
          {/* PRÓXIMO EVENTO */}
          <section>
            <h2 className={dashboard.sectionTitle}>
              Próximo evento</h2>
              <div className={dashboard.eventGrid}>
                <ProximoEvento
                rutaBase="/dashboard/eventos"
                label="Clase asignada"
                />
                </div>
          </section>
          </>
        );
      }