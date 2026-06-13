"use client";

import Link from "next/link";
import home from "./home.module.css";
import Card from "./components/ui/card";
import Button from "./components/ui/button";

export default function Home() {
const features=[
  {titulo:"Gestión de eventos",texto:"Organizá y asigná eventos académicos"},
  {titulo:"Aulas disponibles",texto:"Asignación inteligente sin conflictos horarios"},
  {titulo:"Notificaciones",texto:"Enterate de cambios y avisos importantes"},
  {titulo:"Para todos",texto:"Estudiantes, docentes y administradores"},];
  
  return (
  <div className={home.page}>
    <main className={home.main}>
      <header className={home.topBar}>
        <h1 className={home.title}>
          Bienvenido a <span>AulaSync</span>
          </h1>
      <Card className={home.infoBox}>
        <p>
          Los usuarios deben ser aprobados por
          un administrador antes de ingresar al sistema.
          </p>
      </Card>
      </header>
      <section className={home.hero}>
        <h2 className={home.heroTitle}>
          <span>AulaSync</span>
        </h2>
        <p className={home.heroText}>
          Organizando aulas, optimizando tiempos
          </p>
        <div className={home.divider} />
        </section>
        <footer className={home.footer}>
          <div className={home.features}>
            {features.map((feature)=>(
              <Card
              key={feature.titulo}
              >
                <h3>
                  {feature.titulo}
                </h3>
                <p>
                  {feature.texto}
                </p>
              </Card>
            ))}
          </div>
          <div className={home.loginButton}>
            <Link
            href="/login"
            >
              <Button>
                Ingresar
              </Button>
            </Link>
          </div>
        </footer>
        </main>
        </div>
      );
    }