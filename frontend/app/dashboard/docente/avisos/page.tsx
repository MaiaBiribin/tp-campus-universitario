"use client";

import CrearAviso from "@/app/components/crearAviso";

import layout from "@/app/styles/layout.module.css";
import dashboard from "@/app/styles/dashboard.module.css";


export default function Avisos(){


return (
<main className={layout.main}>
    <div className={layout.content}>
        <header className={dashboard.header}>
            <h1>Crear aviso</h1>
            <p>Informá a los alumnos sobre tus eventos.</p>
        </header>
        <CrearAviso />
    </div>
</main>
);
}