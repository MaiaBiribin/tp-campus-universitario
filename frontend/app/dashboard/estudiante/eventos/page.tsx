"use client"
import Link from "next/link";
import styles from "./page.module.css";
import SideBar from "../components/sideBar";
import RenderizarEventos from "../../components/renderizarEventosSemana";

export default function Eventos(){
    return(
       <div className={styles.layout}>
       <SideBar />
         <main className={styles.main}>
            <div>
              <header>
                <h1>Eventos de la semana:</h1>
              </header>

              <div>
                <RenderizarEventos/>
              </div>

              <Link href={"/estudiante"} /> <button> Volver al inico</button>
            </div>
         </main>
       </div>
    )
        
    
}