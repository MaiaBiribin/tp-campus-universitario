"use client";

import { useEffect, useState } from "react";
import { api } from "../../../lib/api";
import styles from "./page.module.css";

type Evento = {
  id_evento: number;
  titulo: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  estado: string;

  aula: {
    id_aula: number;
    nombre: string;
  };

  tipoEvento: {
    id_tipo_evento: number;
    nombre: string;
  };

  materia: {
    id_materia: number;
    nombre: string;
  };
};

export default function EventosAdmin() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargarEventos() {
      try {
        const res = await api("/eventos");

        const data = await res.json();

        setEventos(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
      } finally {
        setCargando(false);
      }
    }

    cargarEventos();
  }, []);

  function crearEvento() {
    window.location.href = "/dashboard/admin/eventos/nuevo";
  }

  async function eliminarEvento(id: number) {
    try {
      await api(`/eventos/${id}`, {
        method: "DELETE",
      });

      setEventos((prev) =>
        prev.filter((e) => e.id_evento !== id));
    } catch (error) {
      console.error(error);
    }
  }

  if (cargando) {
    return (
      <main className={styles.main}>
        Cargando eventos...
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <header className={styles.header}>
          <div>
            <h1>Eventos</h1>
            <p>Gestioná clases, parciales e informativos</p>
          </div>

          <button
            className={styles.createButton}
            onClick={crearEvento}
          >
            Crear evento
          </button>
        </header>

        <section className={styles.list}>
          {eventos.length === 0 ? (
            <p>No hay eventos creados</p>
          ) : (
            eventos.map((evento) => (
  <div
    key={evento.id_evento}
    className={styles.card}
  >
    <h3>{evento.titulo}</h3>

    <p>Fecha: {evento.fecha}</p>

    <p>
      Horario: {evento.horaInicio} - {evento.horaFin}
    </p>

    <p>
      Aula: {evento.aula?.nombre}
    </p>

    <p>
      Materia: {evento.materia?.nombre}
    </p>

    <p>
      Tipo de evento: {evento.tipoEvento?.nombre}
    </p>

    <button
      onClick={() =>
        eliminarEvento(evento.id_evento)
      }
    >
      Eliminar
    </button>
  </div>
))
          )}
        </section>
      </div>
    </main>
  );
}