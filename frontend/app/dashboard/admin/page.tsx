"use client";

import Link from "next/link";

import styles from "./page.module.css";
import SideBar from "../components/sideBar";

export default function DashboardAdmin() {
  return (

    <div className={styles.layout}>

      <SideBar />

      <main className={styles.main}>

        <div className={styles.content}>

          <header className={styles.header}>

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

            <div className={styles.quickGrid}>

              {[
                [
                  "Crear evento",
                  "Crear clases, parciales o finales",
                  "/dashboard/admin/eventos/nuevo",
                ],

                [
                  "Solicitudes",
                  "Revisar registros pendientes",
                  "/dashboard/admin/solicitudes",
                ],

                [
                  "Mapa de aulas",
                  "Visualizar distribución del edificio",
                  "/dashboard/admin/aulas",
                ],

              ].map(([titulo, desc, ruta]) => (

                <Link
                  key={ruta}
                  href={ruta}
                  className={styles.quickCard}
                >

                  <h3>
                    {titulo}
                  </h3>

                  <p>
                    {desc}
                  </p>

                </Link>

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

  );
}