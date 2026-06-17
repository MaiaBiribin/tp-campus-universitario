"use client";

import NavLinks from "./navLinks";
import { useEffect, useState } from "react";
import { getRoleFromToken } from "@/app/lib/auth";
import { useRouter } from "next/navigation";
import { logout } from "../../services/auth";
import styles from "@/app/styles/dashboard.module.css";


export default function SideBar(){

const router = useRouter();

const [role,setRole]=useState<
"admin"|"docente"|"estudiante"|null
>(null);


useEffect(()=>{

const token =document.cookie.split("; ").find(x=>x.startsWith("token="))?.split("=")[1];

if(!token) return;

const rol =getRoleFromToken(token);

if(rol==="Admin")
setRole("admin");

if(rol==="Profesor")
setRole("docente");

if(rol==="Alumno")
setRole("estudiante");

},[]);


function cerrarSesion(){
 logout();
 router.replace("/login");
}

return(
<aside className={styles.sidebar}>
  <h1 className={styles.logo}>
    Aula<span>Sync</span>
    </h1>
  {role &&<NavLinks role={role}/>}
  <button
  onClick={cerrarSesion}
  className={styles.logout}
  >
    Cerrar sesión
  </button>
</aside>
)
}