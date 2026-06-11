"use client";

import { useEffect, useState } from "react";
import { api } from "../../../lib/api";
import layout from "@/app/styles/layout.module.css";
import dashboard from "@/app/styles/dashboard.module.css";
import cards from "@/app/styles/cards.module.css";
import buttons from "@/app/styles/buttons.module.css";
import { Solicitud } from "../../../lib/entidades";
import styles from "./page.module.css";
import SideBar from "../components/sideBar";

export default function SolicitudesAdmin() {

      <SideBar />

  const [cargando, setCargando] =
    useState(true);

  useEffect(() => {

    async function cargarSolicitudes() {

      try {

        const res = await api("/usuarios/pendientes");

        const data =
          await res.json();

        setSolicitudes(data);

      } finally {

        setCargando(false);

      }

    }

    cargarSolicitudes();

  }, []);

  async function aprobar(id: number) {
  try {
    await api(`/usuarios/${id}/habilitar`, {
      method: "PATCH",});
    setSolicitudes((prev) =>
      prev.filter(
        (u) => u.id_usuario !== id
      )
    );
  } catch (error) {
    console.error(error);}
}

  async function rechazar(id: number) {
  try {
    await api(`/usuarios/${id}/rechazar`, {
      method: "PATCH",
    });
    setSolicitudes((prev) =>
      prev.filter(
        (u) => u.id_usuario !== id
      )
    );
  } catch (error) {
    console.error(error);}
}

  if (cargando) {

    return (

      <main className={layout.main}>
        <div className={layout.content}>
          <h1>
            Cargando solicitudes...
          </h1>
        </div>
      </main>

    );

  }

  return (
    <main className={layout.main}>
      <div className={layout.content}>
        <header className={dashboard.header}>
          <div>

            <h1>
              Panel de administración
            </h1>

            <p>
              Gestioná eventos, aulas, usuarios y la
              organización académica desde un único lugar.
            </p>

          </header>

          <section>

            <h2 className={styles.sectionTitle}>
              Resumen rápido
            </h2>

            <div className={styles.summaryGrid}>

              <div className={styles.metric}>
                <p>Eventos hoy</p>
                <h3>12</h3>
              </div>

              <div className={styles.metric}>
                <p>Solicitudes pendientes</p>
                <h3>8</h3>
              </div>

              <div className={styles.metric}>
                <p>Aulas ocupadas</p>
                <h3>19</h3>
              </div>

            </div>

          </section>

          <section>

            <h2 className={styles.sectionTitle}>
              Accesos rápidos
            </h2>

                <article
                  key={usuario.id_usuario}
                  className={cards.card}
                >

                  <h3>
                    {titulo}
                  </h3>

                  <p>
                    {desc}
                  </p>

                    <div>

                      <h2>
                        {usuario.nombre}
                        {" "}
                        {usuario.apellido}
                      </h2>

                      <p>
                        {usuario.mail}
                      </p>

                    </div>

                  </div>

                  <div className={styles.data}>

                    <div>

                      <span>
                        DNI
                      </span>

                      <strong>
                        {usuario.dni}
                      </strong>

                    </div>

                    <div>

                      <span>
                        Estado
                      </span>

                      <strong
                        className={styles.pending}
                      >
                        Pendiente
                      </strong>

                    </div>

                  </div>

                  <div className={styles.actions}>

                    <button
                      className={buttons.primary}
                      onClick={() =>
                        aprobar(usuario.id_usuario)
                      }
                    >
                      Aprobar
                    </button>

                    <button
                      className={buttons.danger}
                      onClick={() =>
                        rechazar(usuario.id_usuario)
                      }
                    >
                      Rechazar
                    </button>

                  </div>

                </article>

              ))}

            </div>

          </section>

          <section>

            <h2 className={styles.sectionTitle}>
              Actividad reciente
            </h2>

            <div className={styles.card}>

              <div className={styles.notice}>

                <h3>
                  Evento creado
                </h3>

                <p>
                  Programación 3 — Aula 205
                </p>

              </div>

              <div className={styles.notice}>

                <h3>
                  Nuevo registro
                </h3>

                <p>
                  Hay usuarios esperando aprobación
                </p>

              </div>

              <div className={styles.notice}>

                <h3>
                  Actualización académica
                </h3>

                <p>
                  Se modificó una asignación docente
                </p>

              </div>

            </div>

          </section>

        </div>

      </main>

    </div>

    </main>

  );

}