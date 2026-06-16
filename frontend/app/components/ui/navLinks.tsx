"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/app/styles/dashboard.module.css";
import { useEffect,useState } from "react";
import { CantidadNotificacionesSinLeer } from "@/app/services/notificaciones";

type Role =
  | "admin"
  | "docente"
  | "estudiante";

type Props = {
  role: Role;
};

const linksByRole = {

  admin: [
    {
      name: "Inicio",
      href: "/dashboard/admin",
    },
    {
      name: "Solicitudes",
      href: "/dashboard/admin/solicitudes",
    },
    {
      name: "Eventos",
      href: "/dashboard/admin/eventos",
    },
    {
      name: "Mapa aulas",
      href: "/dashboard/mapa",
    },
    {
      name: "Académico",
      href: "/dashboard/admin/academico",
    },
    {
      name: "Usuarios",
      href: "/dashboard/admin/usuarios",
    },
  ],

  docente: [
    {
      name: "Inicio",
      href: "/dashboard/docente",
    },
    {
      name: "Mis eventos",
      href: "/dashboard/eventos",
    },
    {
      name: "Mapa aulas",
      href: "/dashboard/mapa",
    },
    {
      name: "Avisos",
      href: "/dashboard/docente/avisos",
    },

  ],

  estudiante: [
    {
      name: "Inicio",
      href: "/dashboard/estudiante",
    },
    {
      name: "Mis eventos",
      href: "/dashboard/eventos",
    },
    {
      name: "Mapa aulas",
      href: "/dashboard/mapa",
    },
    {
    name: "Notificaciones",
    href: "/dashboard/estudiante/notificaciones",
  },
  ],
};

export default function NavLinks({
  role,
}: Props) {

  const pathname = usePathname();
  const [pendientes,setPendientes] = useState(0);

  useEffect(()=>{

    async function cargarPendientes(){
      try{
        const cantidad = await CantidadNotificacionesSinLeer();
        setPendientes(cantidad);
      }catch(error){
        console.error(
          "Error cargando notificaciones",
          error
        );
      }
    }
    if(role === "estudiante"){
      cargarPendientes();
    }
  },[role]);


  const links = linksByRole[role].map((link)=>{
    if(
      link.href === "/dashboard/estudiante/notificaciones"
    ){
      return {
        ...link,
        name:
          pendientes > 0
          ? `Notificaciones (${pendientes})`
          : "Notificaciones"
      };
    }
    return link;
  });


  return (
    <nav className={styles.nav}>
      {links.map((link)=>(
        <Link
          key={link.href}
          href={link.href}
          className={
            `${styles.link}
            ${
              pathname === link.href
              ? styles.active
              : ""
            }`
          }
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}