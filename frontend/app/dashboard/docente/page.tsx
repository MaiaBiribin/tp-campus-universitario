"use client";

import Link from "next/link";
import styles from "./page.module.css";

export default function DashboardDocente() {
  return (
    <div className={styles.layout}>

      <aside className={styles.sidebar}>

        <h1 className={styles.logo}>
          Aula
          <span>Sync</span>
        </h1>

        <nav className={styles.nav}>

          {[
            ["Inicio", "/dashboard/docente"],
            ["Agenda", "/dashboard/docente/agenda"],
            ["Mapa de aulas", "/dashboard/docente/mapa"],
            ["Avisos", "/dashboard/docente/avisos"],
          ].map(([texto, ruta], index) => (

            <Link
              key={ruta}
              href={ruta}
              className={`${styles.link} ${
                index === 0
                  ? styles.active
                  : ""
              }`}
            >
              {texto}
            </Link>

          ))}

        </nav>

        <div className={styles.logoutContainer}>
          <Link href="/">
            <button className={styles.logout}>
              Cerrar sesión
            </button>
          </Link>
        </div>

      </aside>

      <main className={styles.main}>

        <div className={styles.content}>

          <header className={styles.header}>

            <h1>
              Panel docente
            </h1>

            <p>
              Consultá tus clases, revisá aulas asignadas
              y mantené informados a tus estudiantes.
            </p>

          </header>

          <section>

            <h2 className={styles.sectionTitle}>
              Resumen del día
            </h2>

            <div className={styles.summaryGrid}>

              <div className={styles.metric}>
                <p>Clases hoy</p>
                <h3>3</h3>
              </div>

              <div className={styles.metric}>
                <p>Avisos activos</p>
                <h3>1</h3>
              </div>

              <div className={styles.metric}>
                <p>Eventos esta semana</p>
                <h3>12</h3>
              </div>

            </div>

          </section>

          <section>

            <h2 className={styles.sectionTitle}>
              Próximo evento
            </h2>

            <div className={styles.mainEvent}>

              <div>

                <p className={styles.label}>
                  Clase asignada
                </p>

                <h3>
                  Programación 3
                </h3>

                <div className={styles.info}>

                  <p>
                    📅 Hoy
                  </p>

                  <p>
                    🕒 18:00 — 22:00
                  </p>

                  <p>
                    🏫 Aula 205
                  </p>

                </div>

              </div>

              <Link href="/dashboard/docente/eventos/1">

                <button className={styles.whiteButton}>
                  Ver evento
                </button>

              </Link>

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}