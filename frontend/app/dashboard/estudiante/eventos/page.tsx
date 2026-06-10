"use client"
import Link from "next/link";
import styles from "./page.module.css";
import SideBar from "../components/sideBar";

export default function Eventos(){
    return(
       <div className={styles.layout}>
       <SideBar />
         <main className={styles.main}>
            <div>
              <header>
                <h1>Pestaña de eventos</h1>
              </header>
            </div>
         </main>
       </div>
    )
        
    
}