"use client";

import Link from "next/link";
import styles from "./page.module.css";

import RenderizarMapas from "@/app/components/renderizarMaps";
import SideBar from "@/app/components/ui/sideBar";

export default function zonaMapa(){
 return(
    <div className={styles.layout}>
    <SideBar/>
     <main className={styles.main}>
        <div className={styles.content}>
     
       <RenderizarMapas/>

        </div>

        <div>
         <Link href={"/admin"}><button>Volver a pagina principal de la cuenta</button></Link>
       </div>
     </main>
    </div>
 
    )
}