"use client";
import Link from "next/link";
import dashboard from "@/app/styles/dashboard.module.css";
import cards from "@/app/styles/cards.module.css";

export default function DashboardEstudiante() {
  return (

    <>

      <header className={dashboard.header}>

        <h1>
          Hola 👋
        </h1>

        <p>
          Consultá tus clases, aulas asignadas,
          cambios de horario y encontrá rápidamente
          dónde tenés que estar.
        </p>

      </header>



      {/* PRÓXIMO EVENTO */}

      <section>

        <h2 className={dashboard.sectionTitle}>
          Próximo evento
        </h2>


        <div className={dashboard.eventGrid}>


          <div className={dashboard.mainEvent}>


            <div>


              <p className={dashboard.label}>
                Clase de hoy
              </p>


              <h3>
                Programación 3
              </h3>


              <div className={dashboard.info}>

                <p>
                  🕒 18:00 — 22:00
                </p>

                <p>
                  🏫 Aula 1
                </p>

                <p>
                  👨‍🏫 Ale
                </p>

              </div>


            </div>



            <Link
              href="/dashboard/estudiante/eventos/1"
              className={cards.whiteButton}
            >

              Ver detalles

            </Link>



          </div>


        </div>


      </section>


      {/* AVISOS */}

      <section>


        <h2 className={dashboard.sectionTitle}>
          Avisos recientes
        </h2>



        <div className={dashboard.card}>


          <div className={dashboard.notice}>

            <h3>
              Cambio de aula
            </h3>

            <p>
              Programación pasó al aula 2
            </p>

          </div>



          <div className={dashboard.notice}>

            <h3>
              Recordatorio
            </h3>

            <p>
              Parcial el viernes 19
            </p>

          </div>



          <div className={dashboard.notice}>

            <h3>
              Nuevo aviso docente
            </h3>

            <p>
              Llego tarde
            </p>

          </div>


        </div>


      </section>


    </>

  );

}