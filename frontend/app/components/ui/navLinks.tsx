"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/app/styles/dashboard.module.css";
import { useEffect,useState } from "react";
import { CantidadNotificacionesSinLeer } from "@/app/services/notificaciones";
import forms from "@/app/styles/forms.module.css";

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
/**
 * Renderiza los enlaces de navegación según el rol del usuario.
 * Para estudiantes, muestra la cantidad de notificaciones sin leer.
 * @param {Props} props - Propiedades del componente.
 * @param {"admin"|"docente"|"estudiante"} props.role - Rol del usuario autenticado.
 * @returns {JSX.Element} Menú de navegación.
 */
export default function NavLinks({
  role,
}: Props) {

  const pathname = usePathname();
  const [pendientes,setPendientes] = useState(0);
  const [error,setError] = useState("");
  const [cargando,setCargando] = useState(false);

  useEffect(()=>{
    /**
    * Obtiene la cantidad de notificaciones sin leer.
    * @async
    * @returns {Promise<void>}
    */
    async function cargarPendientes(){
      setCargando(true);
      setError("");
      try{
        const cantidad = await CantidadNotificacionesSinLeer();
        setPendientes(cantidad);
      }catch{
        setError("No se pudieron cargar las notificaciones.");
      }finally{
        setCargando(false);
      }
    }

  if(role === "estudiante"){
    cargarPendientes();
    const intervalo = setInterval(cargarPendientes,5000);
    return () => clearInterval(intervalo);
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
    <>

    {error && (
      <p className={forms.error}>
        {error}
      </p>
    )}
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
  </>
);
}