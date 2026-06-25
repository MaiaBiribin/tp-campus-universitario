"use client";

import dashboard from "@/app/styles/dashboard.module.css";
import ProximoEvento from "@/app/components/proximoEvento";
import AvisosRecientes from "@/app/components/avisosRecientes";

/**
 * Dashboard principal del estudiante.
 * Muestra información resumida del usuario:
 * - Próximo evento académico
 * - Avisos recientes del sistema
 * @returns {JSX.Element} Vista del panel de estudiante.
 */
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
        <h2 className={dashboard.sectionTitle}>Avisos recientes</h2>
        <AvisosRecientes />
        </section>
    </>
  );
}