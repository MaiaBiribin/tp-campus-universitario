"use client";

import { useEffect, useState } from "react";
import layout from "@/app/styles/layout.module.css";
import dashboard from "@/app/styles/dashboard.module.css";
import buttons from "@/app/styles/buttons.module.css";
import table from "@/app/styles/table.module.css";
import forms from "@/app/styles/forms.module.css";
import { Evento } from "../../../types/entidades";
import { getEventos, eliminarEvento as borrarEvento } from "@/app/services/eventos";
/**
 * panel de eventos del admin
 * muestra todos los eventos que creo el admin y tambien el link para ir a la pestana de crear un nuevo evento.
 * @returns {JSX.Element} vista de los eventos del admin
 */
export default function EventosAdmin() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");
  const [eliminando, setEliminando] = useState<number | null>(null);
 
  useEffect(() => {
    /**
     * funcion para cargar los eventos a la pestaña
     *  @throws en el caso que no se pudo cargar los eventos
     */
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
 /**
  * esta funcion redirige a la pestaña de crear un nuevo evento.
  */
  function crearEvento() {
    window.location.href = "/dashboard/admin/eventos/nuevo";
  }
 /**
  * esta funcion sirve para poder eliminar del sistema un evento
  * @param {number} id id del evento que se quiera borrar
  *  @throws en caso que no se pudo borrar el evento. 
  */
  async function eliminarEvento(id: number) {
  setError("");
  setExito("");
  setEliminando(id);
  try {
    await borrarEvento(id);
    setEventos((prev) =>
      prev.filter(
        (e) => e.id_evento !== id
      )
    );
    setExito("Evento eliminado correctamente.");
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
      {exito && (<p className={forms.success}>{exito}</p>)}
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