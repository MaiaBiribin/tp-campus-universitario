"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import dashboard from "@/app/styles/dashboard.module.css";
import cards from "@/app/styles/cards.module.css";
import { getEventos } from "@/app/services/eventos";
import { Evento } from "@/app/types/entidades";

type Props = {
  rutaBase: string;
  label: string;
};

export default function ProximoEvento({
  rutaBase,
  label,
}: Props) {

const [proximoEvento,setProximoEvento] =useState<Evento | null>(null);
useEffect(() => {
  async function cargar() {
    try {
      const eventos =await getEventos();
      const futuros =eventos.filter((evento: Evento) => {
        const fechaHora =new Date(`${evento.fecha}T${evento.horaInicio}`);
        return (
          fechaHora >=new Date());}).sort((a: Evento,b: Evento) =>
            new Date(`${a.fecha}T${a.horaInicio}`).getTime()-
            new Date(`${b.fecha}T${b.horaInicio}`).getTime());
            setProximoEvento(futuros[0] || null);
    }
    catch(error){
      console.error(error);
    }
  }
  cargar();
}, []);

return (
<div className={dashboard.mainEvent}>
  {proximoEvento ? (
    <>
<div>
  <p className={dashboard.label}>
    {label}
    </p>
<h3>
{proximoEvento.titulo}
</h3>
<div className={dashboard.info}>
<p>
📅 {proximoEvento.fecha}
</p>
<p>
🕒 {proximoEvento.horaInicio}
{" - "}
{proximoEvento.horaFin}
</p>
<p>
🏫 {proximoEvento.aula?.nombre}
</p>
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
<p>
No hay eventos próximos.
</p>
)}
</div>
);
}