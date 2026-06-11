"use client";

import { useEffect, useState } from "react";
import { api } from "../../../lib/api";
import layout from "@/app/styles/layout.module.css";
import dashboard from "@/app/styles/dashboard.module.css";
import cards from "@/app/styles/cards.module.css";
import buttons from "@/app/styles/buttons.module.css";
import { Solicitud } from "../../../lib/entidades";
import styles from "./page.module.css";

export default function SolicitudesAdmin() {

  const [solicitudes, setSolicitudes] =
    useState<Solicitud[]>([]);

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
              Solicitudes de registro
            </h1>

            <p>
              Revisá solicitudes pendientes y aprobá
              únicamente usuarios autorizados.
            </p>

          </div>

          <div className={styles.counter}>
            {solicitudes.length}
          </div>

        </header>

        <section>

          {solicitudes.length === 0 ? (

            <div className={styles.empty}>

              <h2>
                No hay solicitudes pendientes
              </h2>

              <p>
                Cuando un usuario se registre
                aparecerá acá.
              </p>

            </div>

          ) : (

            <div className={styles.grid}>

              {solicitudes.map((usuario) => (

                <article
                  key={usuario.id_usuario}
                  className={cards.card}
                >

                  <div className={styles.user}>

                    <div className={styles.avatar}>
                      {usuario.nombre[0]}
                    </div>

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

          )}

        </section>

      </div>

    </main>

  );

}