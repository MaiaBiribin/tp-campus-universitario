"use client";

import Link from "next/link";
import dashboard from "@/app/styles/dashboard.module.css";
import cards from "@/app/styles/cards.module.css";
import { getEventos } from "@/app/services/eventos";
import { getUsuariosPendientes } from "@/app/services/usuarios";
import { useEffect, useState } from "react";
import { Evento } from "@/app/types/entidades";
import forms from "@/app/styles/forms.module.css";

/**
 * Panel principal de administración.
 * Muestra un resumen de eventos del día, solicitudes pendientes y aulas ocupadas.
 * Consume datos desde servicios de eventos y usuarios.
 * @returns {JSX.Element} dashboard administrativo renderizado.
 */
export default function DashboardAdmin() {
  const [eventosHoy, setEventosHoy] = useState(0);
  const [solicitudes, setSolicitudes] = useState(0);
  const [aulasOcupadas, setAulasOcupadas] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  
  useEffect(() => {
  async function cargarDashboard() {
    try {
      setCargando(true);
      setError("");
      const pendientes = await getUsuariosPendientes();
      setSolicitudes(pendientes.length);
      const eventos = await getEventos();
      const hoy = new Date().toISOString().split("T")[0];
      const eventosDeHoy = eventos.filter((evento: Evento) => evento.fecha === hoy);
      setEventosHoy(eventosDeHoy.length);
      const aulas = new Set(eventosDeHoy.map((evento: Evento) => evento.aula?.id_aula));
      setAulasOcupadas(aulas.size);
    }
    catch {
      setError("No se pudo cargar la información del panel.");
    }finally {setCargando(false);

    }

  }

  cargarDashboard();
}, []);

if (cargando) {
  return (
    <p className={forms.helper}>Cargando panel...</p>);
}
if (error) {
  return (
    <p className={forms.error}>{error}</p>
  );
}  
return (
    <>
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
            <p>
              Eventos hoy
            </p>
            <h3>{eventosHoy}</h3>
          </div>
          <div className={cards.metric}>
            <p>
              Solicitudes pendientes
            </p>
            <h3>{solicitudes}</h3>
          </div>
          <div className={cards.metric}>
            <p>
              Aulas ocupadas
            </p>
            <h3>{aulasOcupadas}</h3>
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
  {
    titulo: "Crear evento",
    desc: "Crear clases, parciales o finales",
    ruta: "/dashboard/admin/eventos/nuevo",
  },
  {
    titulo: "Académico",
    desc: "Gestionar carreras y materias",
    ruta: "/dashboard/admin/academico",
  },
].map((item) => (
  <Link
    key={item.ruta}
    href={item.ruta}
    className={cards.quickCard}
  >
    <h3>
      {item.titulo}
    </h3>
    <p>
      {item.desc}
    </p>
  </Link>
))}
        </div>
      </section>
    </>
  );
}