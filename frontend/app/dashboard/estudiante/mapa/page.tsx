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
        <div>
            <header>
             <h1>
                Mapa general del lugar:
             </h1>
            </header>
        </div>

       <div>
         <Image src={""} alt="imagen" useMap="#map" width="400"/>
          <map name="map">
         

          </map>
       </div>
     </main>
    </div>
 
    )
}