"use client";
import RenderizarNotifiaciones from "@/app/components/renderizarNotificaciones";
import layout from "@/app/styles/layout.module.css";

export default function Notificaciones(){

    

    return(
        <div>
            <main className={layout.main}>
                    <RenderizarNotifiaciones/>
            </main>

        </div>
    )
}