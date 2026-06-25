"use client";

import layout from "@/app/styles/layout.module.css";
import EventosSemanaView from "@/app/components/eventoSemanaView";
/**
 * pagina que se encarga de mostrar los eventos asignados de un usuario
 * el usuario puede ver todos los eventos que tiene en la semana.
 * @returns {JSX.Element} vista de los eventos de la semana
 */
export default function EventosPage() {
  return (
    <div className={layout.main}>
      <EventosSemanaView
        titulo="Eventos de la semana"
        descripcion="Visualizá tus próximas clases y actividades"
      />
    </div>
  );
}