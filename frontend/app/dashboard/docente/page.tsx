"use client";

import Link from "next/link";
import SideBar from "../components/sideBar";

import layout from "@/app/styles/layout.module.css";
import dashboard from "@/app/styles/dashboard.module.css";
import cards from "@/app/styles/cards.module.css";

export default function DashboardDocente() {

  return (

    <div className={layout.layout}>

      <SideBar />

      <main className={layout.main}>

        <div className={layout.content}>

          <header className={dashboard.header}>

            <h1>
              Panel docente
            </h1>

            <p>
              Consultá tus clases, revisá aulas asignadas
              y mantené informados a tus estudiantes.
            </p>

          </header>
<<<<<<< HEAD
 
         {/* le dejo comentado por aca para no romper el codigo pero se tendria que usar el <eventodia> para usar la funcion*/}
=======

          {/* RESUMEN */}

>>>>>>> d6ae4c08225d350bd34887e14db44ab2637b5738
          <section>

            <h2 className={dashboard.sectionTitle}>
              Resumen del día
            </h2>
<<<<<<< HEAD
       
            <div className={styles.summaryGrid}>
          
              <div className={styles.metric}>
                <p>Clases hoy</p>
                <h3>3</h3>
=======

            <div className={dashboard.summaryGrid}>

              <div className={cards.metric}>

                <p>
                  Clases hoy
                </p>

                <h3>
                  3
                </h3>

>>>>>>> d6ae4c08225d350bd34887e14db44ab2637b5738
              </div>

              <div className={cards.metric}>

                <p>
                  Avisos activos
                </p>

                <h3>
                  1
                </h3>

              </div>

            </div>

          </section>

          {/* PRÓXIMO EVENTO */}

          <section>

            <h2 className={dashboard.sectionTitle}>
              Próximo evento
            </h2>

            <div className={dashboard.mainEvent}>

              <div>

                <p className={dashboard.label}>
                  Clase asignada
                </p>

                <h3>
                  Programación 3
                </h3>

                <div className={dashboard.info}>

                  <p>
                    📅 Hoy
                  </p>

                  <p>
                    🕒 18:00 - 22:00
                  </p>

                  <p>
                    🏫 Aula 205
                  </p>

                </div>

              </div>

              <Link
                href="/dashboard/docente/eventos/1"
                className={dashboard.whiteButton}
              >

                Ver evento

              </Link>

            </div>

          </section>

        </div>

      </main>

    </div>

  );

}