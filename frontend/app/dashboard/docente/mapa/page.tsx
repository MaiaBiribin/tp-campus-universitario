"use client";

import Link from "next/link";
import styles from "./page.module.css";
import SideBar from "../components/sideBar";
import Image from "next/image";
import RenderizarMapas from "../../components/renderizarMaps";

export default function zonaMapa(){
 return(
    <div className={styles.layout}>
    <SideBar/>
     <main className={styles.main}>
        <div className={styles.content}>
            
      <RenderizarMapas/>  
         
      <div>
         <Link href={"/docente"}><button>Volver a pagina principal de la cuenta</button></Link>
       </div>


        </div>
     </main>
    </div>
 
    )
}