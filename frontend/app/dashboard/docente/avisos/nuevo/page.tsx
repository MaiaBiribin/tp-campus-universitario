"use client";

import CrearAviso from "@/app/components/crearAviso";
import layout from "@/app/styles/layout.module.css";
import dashboard from "@/app/styles/dashboard.module.css";

/**
 * Página de creación de avisos.
 * Renderiza la interfaz para registrar un nuevo aviso docente.
 * @returns {JSX.Element} Vista de creación de avisos.
 */
export default function Avisos(){
    return (
    <main className={layout.main}>
    <div className={layout.content}>
        <header className={dashboard.header}>
            <h1>Crear aviso</h1>
            <p>Informá a los estudiantes sobre cambios,retrasos o cancelaciones.</p>
        </header>
        <CrearAviso />
    </div>
    </main>
    );
}