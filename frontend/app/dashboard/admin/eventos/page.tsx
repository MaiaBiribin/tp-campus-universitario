"use client";

import { useEffect, useState } from "react";
import { api } from "../../../api";
import layout from "@/app/styles/layout.module.css";
import dashboard from "@/app/styles/dashboard.module.css";
import buttons from "@/app/styles/buttons.module.css";
import table from "@/app/styles/table.module.css";
import { Evento } from "../../../types/entidades";

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
                          onClick={() =>
                            eliminarEvento(
                              evento.id_evento
                            )
                          }
                        >
                          Eliminar
                        </button>

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