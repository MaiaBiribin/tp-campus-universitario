"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import dashboard from "@/app/styles/dashboard.module.css";
import cards from "@/app/styles/cards.module.css";
import { getEventos } from "@/app/services/eventos";
import { Evento } from "@/app/types/entidades";
import forms from "@/app/styles/forms.module.css";

type Props = {
  rutaBase: string;
  label: string;
};

/**
 * Muestra el próximo evento disponible.
 * Obtiene los eventos, filtra los futuros y selecciona el más cercano según fecha y hora de inicio.
 * Incluye estados visuales de carga, error y ausencia de eventos.
 * @component
 * @param {Props} props propiedades del componente.
 * @param {string} props.rutaBase ruta base para navegar al detalle del evento.
 * @param {string} props.label etiqueta descriptiva del evento.
 * @returns {JSX.Element} tarjeta con información del próximo evento.
 * @example
 * <ProximoEvento
 *   rutaBase="/eventos"
 *   label="Próximo evento"
 * />
 */
export default function ProximoEvento({
  rutaBase,
  label,
}: Props) {

const [proximoEvento,setProximoEvento] =useState<Evento | null>(null);
const [cargando,setCargando] = useState(true);
const [error,setError] = useState("");
useEffect(() => {

  async function cargar() {
    try {
      setError("");
      const eventos = await getEventos();
      const futuros = eventos
        .filter((evento: Evento) => {

          const fechaHora =
            new Date(
              `${evento.fecha}T${evento.horaInicio}`
            );
          return fechaHora >= new Date();

        })
        .sort((a: Evento,b: Evento) =>
          new Date(
            `${a.fecha}T${a.horaInicio}`
          ).getTime()
          -
          new Date(
            `${b.fecha}T${b.horaInicio}`
          ).getTime()

        );

      setProximoEvento(futuros[0] || null);

    } catch(error) {
      setError("No se pudo cargar el próximo evento.");
    } finally {
      setCargando(false);
    }
  }
  cargar();
}, []);
if (cargando) {
  return (
    <div className={dashboard.mainEvent}>
      <p>Cargando evento...</p>
    </div>
  );
}

if (error) {
  return (
    <div className={dashboard.mainEvent}>
      <p className={forms.error}>{error}</p>
    </div>
  );

}

return (
<div className={dashboard.mainEvent}>
  {proximoEvento ? (
    <>
<div>
  <p className={dashboard.label}>
    {label}
    </p>
    <h3>{proximoEvento.titulo}</h3>
    <div className={dashboard.info}>
      <p>📅 {proximoEvento.fecha}</p>
      <p>🕒 {proximoEvento.horaInicio}{" - "}{proximoEvento.horaFin}</p>
      <p>🏫 {proximoEvento.aula?.nombre}</p>
    </div>
</div>
<Link
href={`${rutaBase}/${proximoEvento.id_evento}`}
className={cards.whiteButton}
>
Ver evento
</Link>
</>
) : (
<p>No hay eventos próximos.</p>
)}
</div>
);
}