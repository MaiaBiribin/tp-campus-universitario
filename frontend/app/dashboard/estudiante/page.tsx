"use client";

import Link from "next/link";
import styles from "./page.module.css";

export default function DashboardEstudiante() {
  return (
    <div className={styles.layout}>

      <aside className={styles.sidebar}>

        <h1 className={styles.logo}>
          Aula
          <span>Sync</span>
        </h1>

        <nav className={styles.nav}>

          {[
            ["Inicio", "/dashboard/estudiante"],
            ["Mis eventos", "/dashboard/estudiante/eventos"],
            ["Mapa de aulas", "/dashboard/estudiante/mapa"],
            ["Notificaciones", "/dashboard/estudiante/notificaciones"],
          ].map(([texto, ruta]) => (
            <Link
              key={ruta}
              href={ruta}
              className={styles.link}
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
              Hola 👋
            </h1>

            <p>
              Consultá tus clases, aulas asignadas,
              cambios de horario y encontrá rápidamente
              dónde tenés que estar.
            </p>
          </header>

          <section>

            <h2 className={styles.sectionTitle}>
              Eventos de hoy
            </h2>

            <div className={styles.eventGrid}>

              <div className={styles.mainEvent}>

                <div>

                  <p className={styles.label}>
                    Clase de hoy
                  </p>

                  <h3>
                    Programación 3
                  </h3>

                  <div className={styles.info}>
                    <p>🕒 18:00 — 22:00</p>
                    <p>🏫 Aula 1</p>
                    <p>👨‍🏫 Ale</p>
                  </div>

                </div>

                <Link href="/dashboard/estudiante/eventos/1">
                  <button className={styles.whiteButton}>
                    Ver detalles
                  </button>
                </Link>

              </div>

              <div className={styles.card}>

                <p className={styles.label}>
                  Próximo evento
                </p>

                <h3>
                  Base de Datos 2
                </h3>

                <div className={styles.info}>
                  <p>📅 Mañana</p>
                  <p>🕒 19:00</p>
                  <p>🏫 Aula 301</p>
                  <p>👨‍🏫 María González</p>
                </div>

              </div>

            </div>

          </section>

          <section>

            <h2 className={styles.sectionTitle}>
              Avisos recientes
            </h2>

            <div className={styles.card}>

              <div className={styles.notice}>
                <h3>Cambio de aula</h3>
                <p>Programación pasó al aula 2</p>
              </div>

              <div className={styles.notice}>
                <h3>Recordatorio</h3>
                <p>Parcial el viernes 19</p>
              </div>

              <div className={styles.notice}>
                <h3>Nuevo aviso docente</h3>
                <p>Llego tarde</p>
              </div>

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}