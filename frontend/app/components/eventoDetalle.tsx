"use client";

import { useEffect, useState } from "react";
import { getEventoPorId } from "@/app/services/eventos";
import { Evento } from "../types/entidades";
import forms from "@/app/styles/forms.module.css";

type Props = {
  id: number;
};

/**
 * Muestra la información detallada de un evento.
 * Obtiene el evento por su identificador y gestiona los estados de carga, error y ausencia de datos.
 * @component
 * @param {Props} props propiedades del componente
 * @param {number} props.id id del evento a consultar
 * @returns {JSX.Element} detalle del evento o mensaje de estado
 * @example
 * <EventoDetalle id={15} />
 */
export default function EventoDetalle({id,}: Props) {
  const [evento, setEvento] =useState<Evento | null>(null);
  const [cargando, setCargando] =useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    async function cargarEvento() {
      try {
        const data =await getEventoPorId(id);
        setEvento(data);
      }
      catch (error) {
        setError("No se pudo cargar la información del evento.");
      }
      finally {
        setCargando(false);
      }
    }
    cargarEvento();
  }, [id]);
  if (cargando) {
    return <p>Cargando evento...</p>;
  }
  if (error) {
  return (
    <p className={forms.error}>{error}</p>
  );}
  if (!evento) {
    return <p>No se encontró el evento.</p>;
  }

  return (
    <div>
      <h1>
        {evento.titulo}
      </h1>
      <p>
        Fecha:
        {" "}
        {evento.fecha}
      </p>
      <p>
        Hora:
        {" "}
        {evento.horaInicio}
        {" - "}
        {evento.horaFin}
      </p>
      <p>
        Aula:
        {" "}
        {evento.aula?.nombre}
      </p>
      <p>
        Materia:
        {" "}
        {evento.materia?.nombre}
      </p>
      <p>
        Tipo:
        {" "}
        {evento.tipoEvento?.nombre}
      </p>
    </div>
  );
}