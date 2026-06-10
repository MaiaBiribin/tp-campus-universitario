"use client";

import Link from "next/link";
import styles from "./page.module.css";
import SideBar from "../components/sideBar";

export default function DashboardDocente() {
  return (
    <div className={styles.layout}>
      <SideBar />
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
 
         {/* le dejo comentado por aca para no romper el codigo pero se tendria que usar el <eventodia> para usar la funcion*/}
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