"use client";


import dashboard from "@/app/styles/dashboard.module.css";
import ProximoEvento from "@/app/components/proximoEvento";

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

          <ProximoEvento
          rutaBase="/dashboard/eventos"
          label="Próximo evento"
          />

        </div>

      </section>



      {/* AVISOS */}

      <section>

        <h2 className={dashboard.sectionTitle}>
          Avisos recientes
        </h2>

        <div className={dashboard.card}>

          <div className={dashboard.notice}>
            <h3>Cambio de aula</h3>
            <p>Programación pasó al aula 2</p>
          </div>

          <div className={dashboard.notice}>
            <h3>Recordatorio</h3>
            <p>Parcial el viernes 19</p>
          </div>

          <div className={dashboard.notice}>
            <h3>Nuevo aviso docente</h3>
            <p>Llego tarde</p>
          </div>

        </div>

      </section>

    </>

  );
}