"use client";

import { Evento } from "../types/entidades";
import Card from "@/app/components/ui/card";

type Props = {
  eventos: Evento[];
};

/**
 * Renderiza una lista de eventos semanales en tarjetas informativas.
 * @param props Propiedades del componente.
 * @param props.eventos Eventos que serán mostrados.
 * @returns elemento JSX con los eventos o un mensaje si no existen eventos disponibles.
 */
export default function RenderizarEventosSemana({ eventos }: Props) {
  if (!eventos || eventos.length === 0) {
    return <p>No tenés eventos esta semana.</p>;
  }

  return (
    <div>
      {eventos.map((ev) => (
        <Card key={ev.id_evento}>
          <h3>{ev.titulo}</h3>
          <p>📅 {ev.fecha}</p>
          <p>🕒 {ev.horaInicio} - {ev.horaFin}</p>
          <p>🏫 {ev.aula?.nombre}</p>
          <p>📚 {ev.materia?.nombre}</p>
        </Card>
      ))}
    </div>
  );
}