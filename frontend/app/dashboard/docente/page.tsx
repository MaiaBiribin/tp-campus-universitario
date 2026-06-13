"use client";

import Link from "next/link";
import dashboard from "@/app/styles/dashboard.module.css";
import cards from "@/app/styles/cards.module.css";
import { getEventos } from "@/app/services/eventos";
import { useEffect, useState } from "react";
import { Evento } from "@/app/types/entidades";


export default function DashboardDocente() {
  const [clasesHoy, setClasesHoy] = useState(0);
  const [proximoEvento, setProximoEvento] =useState<Evento | null>(null);
  useEffect(() => {
  async function cargar() {
    try {
      const eventos = await getEventos();

      const hoy =new Date().toISOString().split("T")[0];

      const clasesDeHoy =
        eventos.filter(
          (evento: Evento) =>
            evento.fecha === hoy
        );

      setClasesHoy(
        clasesDeHoy.length
      );

      const futuros =
        eventos
          .filter((evento: Evento) => {
            const fechaHora =
              new Date(
                `${evento.fecha}T${evento.horaInicio}`
              );

            return (fechaHora >=new Date());}).sort(
            (
              a: Evento,
              b: Evento
            ) =>
              new Date(`${a.fecha}T${a.horaInicio}`).getTime()
              -
              new Date(`${b.fecha}T${b.horaInicio}`).getTime());

      setProximoEvento(futuros[0]);

    } catch (error) {
      console.error(error);
    }
  }

  cargar();
}, [])

  return (

    <>
      <header className={dashboard.header}>
        <h1>
          Panel docente
        </h1>
        <p>
          Consultá tus clases, revisá aulas asignadas
          y mantené informados a tus estudiantes.
        </p>
      </header>
      {/* RESUMEN */}
      <section>
        <h2 className={dashboard.sectionTitle}>
          Resumen del día
        </h2>
        <div className={dashboard.summaryGrid}>
          <div className={cards.metric}>
            <p>
              Clases hoy
            </p>
            <h3>{clasesHoy}</h3>
          </div>
          <div className={cards.metric}>
            <p>
              Avisos activos
            </p>
            <h3>
              1
            </h3>
          </div>
        </div>
      </section>
      {/* PRÓXIMO EVENTO */}
      <section>
        <h2 className={dashboard.sectionTitle}>
          Próximo evento
        </h2>
        <div className={dashboard.mainEvent}>
          {proximoEvento ? (
            <>
        <div>
        <p className={dashboard.label}>
          Clase asignada
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
        href={`/dashboard/docente/eventos/${proximoEvento.id_evento}`}
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
      </section>
    </>
  );
}