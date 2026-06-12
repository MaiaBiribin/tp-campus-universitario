"use client";

import { useEffect, useState } from "react";
import { api } from "../../../api";
import layout from "@/app/styles/layout.module.css";
import dashboard from "@/app/styles/dashboard.module.css";
import { Solicitud } from "../../../types/entidades";
import styles from "./page.module.css";
import Card from "@/app/components/card";
import Button from "@/app/components/button";


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

<<<<<<< HEAD
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
=======
return (
  <main
    className={
      layout.main
    }
  >
    <div
      className={
        layout.content
      }
    >
      <header
        className={
          dashboard.header
        }
      >
        <div>
          <h1>
            Solicitudes de registro
          </h1>
          <p>
            Revisá solicitudes pendientes
            y aprobá únicamente usuarios
            autorizados.
          </p>
        </div>
        <div
          className={
            styles.counter
          }
        >
          {solicitudes.length}
        </div>
      </header>
      <section>
        {
          solicitudes.length === 0 ? (
            <Card>

              <div
                className={
                  styles.empty
                }
              >
                <h2>
                  No hay solicitudes pendientes
                </h2>
                <p>
                  Cuando un usuario se registre
                  aparecerá acá.
                </p>
              </div>
            </Card>
          ) : (
            <div
              className={
                styles.grid
              }
            >
              {
                solicitudes.map(
                  (usuario) => (
                    <Card
                      key={
                        usuario.id_usuario
                      }
                    >
                      <div
                        className={
                          styles.user
                        }
>>>>>>> 18b1ac00f4e2f4978c853895bad1e2de3edff256
                      >
                        <div
                          className={
                            styles.avatar
                          }
                        >
                          {
                            usuario.nombre[0]
                          }
                        </div>
                        <div>
                          <h2>
                            {
                              usuario.nombre
                            }{" "}
                            {
                              usuario.apellido
                            }
                          </h2>
                          <p>
                            {
                              usuario.mail
                            }
                          </p>
                        </div>
                      </div>
                      <div
                        className={
                          styles.data
                        }
                      >
                        <div>
                          <span>
                            DNI
                          </span>

                          <strong>
                            {
                              usuario.dni
                            }

                          </strong>

                        </div>

                        <div>

                          <span>

                            Estado

                          </span>

                          <strong
                            className={
                              styles.pending
                            }
                          >

                            Pendiente

                          </strong>

                        </div>

                      </div>

                      <div
                        className={
                          styles.actions
                        }
                      >

                        <Button
                          onClick={
                            () =>
                              aprobar(
                                usuario.id_usuario
                              )
                          }
                        >

                          Aprobar

                        </Button>

                        <Button
                          variant="danger"

                          onClick={
                            () =>
                              rechazar(
                                usuario.id_usuario
                              )
                          }
                        >

                          Rechazar

                        </Button>

                      </div>

                    </Card>

                  )
                )
              }

            </div>

<<<<<<< HEAD
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

}*/
=======
          )
        }
      </section>
    </div>
  </main>
);
}
>>>>>>> 18b1ac00f4e2f4978c853895bad1e2de3edff256
