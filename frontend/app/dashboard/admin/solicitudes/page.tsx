"use client";
import { api } from "../../../lib/api";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

type Solicitud = {
  id: number;
  nombre: string;
  apellido: string;
  mail: string;
  dni: string;
};

export default function SolicitudesAdmin() {

  const [solicitudes, setSolicitudes] =
    useState<Solicitud[]>([]);

  const [cargando, setCargando] =
    useState(true);

  useEffect(() => {
  async function cargarSolicitudes() {
    try {
      const res = await fetch("http://localhost:4000/XXXX"); // me falta endpoint
      const data = await res.json();
      setSolicitudes(data);
    } finally {
      setCargando(false);
    }
  }

  cargarSolicitudes();
}, []);

  function aprobar(id: number) {

    alert("Solicitud aprobada");

    setSolicitudes(
      solicitudes.filter(
        (u) => u.id !== id
      )
    );

  }

  function rechazar(id: number) {

    alert("Solicitud rechazada");

    setSolicitudes(
      solicitudes.filter(
        (u) => u.id !== id
      )
    );

  }

  if (cargando) {

    return (

      <main className={styles.page}>

        <div className={styles.content}>

          <h1>
            Cargando solicitudes...
          </h1>

        </div>

      </main>

    );

  }

  return (
    <main className={styles.page}>

      <div className={styles.content}>

        <header className={styles.header}>

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
                  key={usuario.id}
                  className={styles.card}
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
                      <span>DNI</span>
                      <strong>{usuario.dni}</strong>
                    </div>

                    <div>
                      <span>Estado</span>
                      <strong>Pendiente</strong>
                    </div>

                  </div>

                  <div className={styles.actions}>

                    <button
                      className={styles.approve}
                      onClick={() =>
                        aprobar(usuario.id)
                      }
                    >
                      Aprobar
                    </button>

                    <button
                      className={styles.reject}
                      onClick={() =>
                        rechazar(usuario.id)
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