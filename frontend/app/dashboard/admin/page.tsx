<<<<<<< HEAD
"use client"
import Link from "next/link"
=======
"use client";

import Link from "next/link";
import styles from "./page.module.css";

export default function DashboardAdmin() {
  return (
    <div className={styles.layout}>

      <aside className={styles.sidebar}>

        <h1 className={styles.logo}>
          Aula
          <span>Sync</span>
        </h1>

        <nav className={styles.nav}>

          {[
            ["Inicio", "/dashboard/admin"],
            ["Solicitudes", "/dashboard/admin/solicitudes"],
            ["Gestión de eventos", "/dashboard/admin/eventos"],
            ["Mapa y aulas", "/dashboard/admin/aulas"],
            ["Académico", "/dashboard/admin/academico"],
            ["Usuarios", "/dashboard/admin/usuarios"],
          ].map(([texto, ruta], index) => (

            <Link
              key={ruta}
              href={ruta}
              className={`${styles.link} ${
                index === 0 ? styles.active : ""
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
              Panel de administración
            </h1>

            <p>
              Gestioná eventos, aulas, usuarios y la organización
              académica desde un único lugar.
            </p>

          </header>

          <section>

            <h2 className={styles.sectionTitle}>
              Resumen rápido
            </h2>

            <div className={styles.summaryGrid}>

              <div className={styles.metric}>
                <p>Eventos hoy</p>
                <h3>12</h3>
              </div>

              <div className={styles.metric}>
                <p>Solicitudes pendientes</p>
                <h3>8</h3>
              </div>

              <div className={styles.metric}>
                <p>Aulas ocupadas</p>
                <h3>19</h3>
              </div>

            </div>

          </section>

          <section>

            <h2 className={styles.sectionTitle}>
              Accesos rápidos
            </h2>

            <div className={styles.quickGrid}>

              {[
                [
                  "Crear evento",
                  "Crear clases, parciales o finales",
                  "/dashboard/admin/eventos/nuevo",
                ],

                [
                  "Asignar aula",
                  "Buscar disponibilidad automáticamente",
                  "/dashboard/admin/eventos/asignar",
                ],

                [
                  "Solicitudes",
                  "Revisar registros pendientes",
                  "/dashboard/admin/solicitudes",
                ],

>>>>>>> master

              ].map(([titulo, desc, ruta]) => (

                <Link
                  key={ruta}
                  href={ruta}
                  className={styles.quickCard}
                >

                  <h3>{titulo}</h3>

                  <p>{desc}</p>

                </Link>

              ))}

            </div>

          </section>

          <section>

            <h2 className={styles.sectionTitle}>
              Actividad reciente
            </h2>

            <div className={styles.card}>

              <div className={styles.notice}>
                <h3>Evento creado</h3>
                <p>Programación 3 — Aula 205</p>
              </div>

              <div className={styles.notice}>
                <h3>Nuevo registro</h3>
                <p>Hay usuarios esperando aprobación</p>
              </div>

              <div className={styles.notice}>
                <h3>Actualización académica</h3>
                <p>Se modificó una asignación docente</p>
              </div>

            </div>

          </section>

        </div>

<<<<<<< HEAD
  return(
    <div>
      <main>
        <header>
          <h1>Bienvenido:</h1>
        </header>

        <div>
            <Link href={"app/dashboard/admin/eventos"}
            className="
            flex
            items-center
            justify-center
            min-w-[220px]
            h-14
            bg-gradient-to-r
            from-violet-600
            to-indigo-600
            rounded-xl
            font-semibold
            text-lg
            text-white
            shadow-lg
            hover:scale-105
            "
            > +agregar evento </Link>
        </div>

=======
>>>>>>> master
      </main>

    </div>
  );
}