"use client";

import Link from "next/link";
import SideBar from "../components/sideBar";
import dashboard from "@/app/styles/dashboard.module.css";
import layout from "@/app/styles/layout.module.css";
import cards from "@/app/styles/cards.module.css";

export default function DashboardAdmin() {
  return (
    <div className={layout.layout}>

      <SideBar />

      <main className={layout.main}>

        <div className={layout.content}>

          <header className={dashboard.header}>

            <h1>
              Panel de administración
            </h1>

            <p>
              Gestioná eventos, aulas, usuarios y la
              organización académica desde un único lugar.
            </p>

          </header>

          {/* RESUMEN */}

          <section>

            <h2 className={dashboard.sectionTitle}>
              Resumen rápido
            </h2>

            <div className={dashboard.summaryGrid}>

              <div className={cards.metric}>
                <p>Eventos hoy</p>
                <h3>12</h3>
              </div>

              <div className={cards.metric}>
                <p>Solicitudes pendientes</p>
                <h3>8</h3>
              </div>

              <div className={cards.metric}>
                <p>Aulas ocupadas</p>
                <h3>19</h3>
              </div>

            </div>

          </section>

          {/* ACCESOS RÁPIDOS */}

          <section>

            <h2 className={dashboard.sectionTitle}>
              Accesos rápidos
            </h2>

            <div className={dashboard.quickGrid}>

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
                  className={cards.quickCard}
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
        </div>
      </main>
    </div>
  );
}