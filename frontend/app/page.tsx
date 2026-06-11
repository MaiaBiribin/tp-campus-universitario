"use client";

import Link from "next/link";

import home from "./home.module.css"
import cards from "./styles/cards.module.css";
import buttons from "./styles/buttons.module.css";

export default function Home() {
  return (
    <div className={home.page}>
      <main className={home.main}>

        <header className={home.topBar}>
          <h1 className={home.title}>
            Bienvenido a <span>AulaSync</span>
          </h1>

          <div className={`${cards.card} ${home.infoBox}`}>
            <p>
              Los usuarios deben ser aprobados por un administrador
              antes de ingresar al sistema.
            </p>
          </div>
        </header>

        <section className={home.hero}>
          <h2 className={home.heroTitle}>
            <span>AulaSync</span>
          </h2>

          <p className={home.heroText}>
            Organizando aulas, optimizando tiempos
          </p>

          <div className={home.divider}></div>
        </section>

        <footer className={home.footer}>
          <div className={home.features}>

            <div className={cards.card}>
              <h3>Gestión de eventos</h3>
              <p>
                Organizá y asigná eventos académicos
              </p>
            </div>

            <div className={cards.card}>
              <h3>Aulas disponibles</h3>
              <p>
                Asignación inteligente sin conflictos horarios
              </p>
            </div>

            <div className={cards.card}>
              <h3>Notificaciones</h3>
              <p>
                Enterate de cambios y avisos importantes
              </p>
            </div>

            <div className={cards.card}>
              <h3>Para todos</h3>
              <p>
                Estudiantes, docentes y administradores
              </p>
            </div>

          </div>

          <div className={home.loginButton}>
            <Link
              href="/login"
              className={buttons.primary}
            >
              Ingresar
            </Link>
          </div>
        </footer>

      </main>
    </div>
  );
}