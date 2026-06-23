"use client";

import { useEffect, useState } from "react";
import layout from "@/app/styles/layout.module.css";
import dashboard from "@/app/styles/dashboard.module.css";
import buttons from "@/app/styles/buttons.module.css";
import table from "@/app/styles/table.module.css";
import forms from "@/app/styles/forms.module.css";
import { Evento } from "../../../types/entidades";
import { getEventos, eliminarEvento as borrarEvento } from "@/app/services/eventos";

export default function EventosAdmin() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [eliminando, setEliminando] = useState<number | null>(null);
 
  useEffect(() => {
    async function cargarEventos() {
      try {
      const data = await getEventos();
      setEventos(Array.isArray(data) ? data : []);
    } catch {
      setError("No se pudieron cargar los eventos.");
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
  setError("");
  setEliminando(id);
  try {
    await borrarEvento(id);
    setEventos((prev) =>
      prev.filter(
        (e) => e.id_evento !== id
      )
    );
  } catch {
    setError("No se pudo eliminar el evento. Puede tener información asociada."
    );

  } finally {
    setEliminando(null);
  }
}


return (
  <main className={layout.main}>
    <div className={layout.content}>
      <header className={dashboard.header}>
        <div>
          <h1>
            Eventos académicos
          </h1>
          <p>
            Gestioná clases, parciales y finales.
          </p>
        </div>
        <button
          className={buttons.primary}
          onClick={crearEvento}
        >
          Crear evento
        </button>
      </header>
      {error && (<p className={forms.error}>{error}</p>)}
      {eventos.length === 0 ? (
        <div className={table.empty}>
          <h2>
            No hay eventos creados
          </h2>
          <p>
            Creá tu primer evento académico.
          </p>
        </div>
      ) : (
        <div className={table.tableContainer}>
          <div className={table.tableWrapper}>
            <table className={table.table}>
              <thead>
                <tr>
                  <th>
                    Evento
                  </th>
                  <th>
                    Carrera
                  </th>
                  <th>
                    Fecha
                  </th>
                  <th>
                    Horario
                  </th>
                  <th>
                    Aula
                  </th>
                  <th>
                    Tipo
                  </th>
                  <th>
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {eventos.map((evento) => (
                  <tr
                    key={evento.id_evento}
                  >
                    <td>
                      {evento.materia?.nombre}
                    </td>
                    <td>
                      {evento.materia?.carrera?.nombre}
                    </td>
                    <td>
                      {evento.fecha}
                    </td>
                    <td>
                      {evento.horaInicio}
                      {" - "}
                      {evento.horaFin}
                    </td>
                    <td>
                      {evento.aula?.nombre}
                    </td>
                    <td>
                      <span
                        className={`${table.badge} ${table.info}`}
                      >
                        {evento.tipoEvento?.nombre}
                      </span>
                    </td>
                    <td>
                      <div
                        className={table.actions}
                      >
                        <button
                        className={buttons.danger}
                        disabled={eliminando === evento.id_evento}
                        onClick={() =>eliminarEvento(evento.id_evento)}>{eliminando === evento.id_evento
                          ? "Eliminando..."
                          : "Eliminar"}</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  </main>
)}