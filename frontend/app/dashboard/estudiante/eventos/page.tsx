"use client";

import layout from "@/app/styles/layout.module.css";
import EventosSemanaView from "@/app/components/eventoSemanaView";

export default function Eventos() {

  return (
    <div className={layout.main}>

      <EventosSemanaView
        titulo="Eventos de la semana"
        descripcion="Acá podés ver tus próximas clases y actividades."
      />

    </div>
  );

}