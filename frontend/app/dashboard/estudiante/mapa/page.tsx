"use client";

import Link from "next/link";
import styles from "./page.module.css";
import SideBar from "../components/sideBar";

import RenderizarMapas from "../../components/renderizarMaps";

export default function zonaMapa(){
 return(
    <div className={styles.layout}>
    <SideBar/>
     <main className={styles.main}>
       <RenderizarMapas/>
       <div>
         <Link href={"/estudiantes"}><button>Volver a pagina principal de la cuenta</button></Link>
       </div>
     </main>
    </div>
 
    )
}