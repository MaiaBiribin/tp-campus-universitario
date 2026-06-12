"use client";

import Link from "next/link";
import styles from "./page.module.css";
import SideBar from "../components/sideBar";
import Image from "next/image";

export default function zonaMapa(){
 return(
    <div className={styles.layout}>
    <SideBar/>
     <main className={styles.main}>
        <div className={styles.content}>
            
            <header className={styles.header}>
             <h1>
                Mapa general del lugar:
             </h1>
            </header>
       
             
                    <div>
                      <p>Mapa de Planta Baja:</p>
                      <Image src={"/mapaPB.png"} alt="imagen" useMap="#map" width="400"/>
                       <map name="mapaPlantaBaja">
                      
             
                       </map>
                    </div>
             
                    <div>
                      <p>Mapa del primer Piso:</p>
                      <Image src={"/mapaP1.png"} alt="imagen" useMap="#map" width="400"/>
                        <map name="mapPrimerPiso">
             
                        </map>
                    </div>
      

        </div>

        <div>
         <Link href={"/estudiantes"}><button>Volver a pagina principal de la cuenta</button></Link>
       </div>
     </main>
    </div>
 
    )
}