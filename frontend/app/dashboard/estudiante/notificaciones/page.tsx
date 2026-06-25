"use client";

import RenderizarNotifiaciones from "@/app/components/renderizarNotificaciones";
import layout from "@/app/styles/layout.module.css";
import dashboard from "@/app/styles/dashboard.module.css";
/**
 * pestaña donde los estudiantes pueden ver las notificaciones que tengan
 * muestra las notificaciones sobre algun evento que esten inscriptos.
 * @returns {JSX.Element} vista de las notificaciones.
 */
export default function Notificaciones() {

  return (
    <main className={layout.main}>
      <div className={layout.content}>
        <header className={dashboard.header}>
          <div>
            <h1>
              Notificaciones
            </h1>
          </div>
        </header>
        <RenderizarNotifiaciones />
      </div>
    </main>
  );
}