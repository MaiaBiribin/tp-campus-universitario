"use client";

import { useState } from "react";
import { api } from "../../../../lib/api";
import styles from "./page.module.css";

export default function CrearEvento() {
  const [titulo, setTitulo] = useState("");
  const [fecha, setFecha] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");

  const [idAula, setIdAula] = useState("");
  const [idMateria, setIdMateria] = useState("");
  const [idTipoEvento, setIdTipoEvento] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await api("/eventos", {
        method: "POST",
        body: JSON.stringify({
          titulo,
          fecha,
          horaInicio,
          horaFin,
          aula: { id: Number(idAula) },
          tipoEvento: { id: Number(idTipoEvento) },
          materia: { id: Number(idMateria) },
        }),
      });

      if (res.ok) {
        alert("Evento creado");
        window.location.href = "/dashboard/admin/eventos";
      } else {
        const error = await res.json().catch(() => ({}));
        console.log(error);
        alert("Error al crear evento");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <h1>Crear evento</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          
          <label>Título</label>
          <input
            className={styles.input}
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />

          <label>Fecha</label>
          <input
            className={styles.input}
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />

          <label>Hora inicio</label>
          <input
            className={styles.input}
            type="time"
            value={horaInicio}
            onChange={(e) => setHoraInicio(e.target.value)}
          />

          <label>Hora fin</label>
          <input
            className={styles.input}
            type="time"
            value={horaFin}
            onChange={(e) => setHoraFin(e.target.value)}
          />

          <label>Aula ID</label>
          <input
            className={styles.input}
            type="number"
            value={idAula}
            onChange={(e) => setIdAula(e.target.value)}
          />

          <label>Tipo de evento ID</label>
          <input
            className={styles.input}
            type="number"
            value={idTipoEvento}
            onChange={(e) => setIdTipoEvento(e.target.value)}
          />

          <label>Materia ID</label>
          <input
            className={styles.input}
            type="number"
            value={idMateria}
            onChange={(e) => setIdMateria(e.target.value)}
          />

          <button className={styles.boton}>
            Crear
          </button>

        </form>
      </div>
    </main>
  );
}