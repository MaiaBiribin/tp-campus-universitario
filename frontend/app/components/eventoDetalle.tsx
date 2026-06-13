"use client";

import { useEffect, useState } from "react";
import { getEventoPorId } from "@/app/services/eventos";
import { Evento } from "../types/entidades";

type Props = {
  id: number;
};

export default function EventoDetalle({id,}: Props) {

  const [evento, setEvento] =useState<Evento | null>(null);
  const [cargando, setCargando] =useState(true);
  useEffect(() => {
    async function cargarEvento() {
      try {
        const data =await getEventoPorId(id);
        setEvento(data);
      }
      catch (error) {
        console.error(error);
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