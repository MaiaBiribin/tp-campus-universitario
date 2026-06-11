"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/app/styles/dashboard.module.css";

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
      name: "Mapa y aulas",
      href: "/dashboard/admin/aulas",
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
      name: "Agenda",
      href: "/dashboard/docente/agenda",
    },

    {
      name: "Eventos",
      href: "/dashboard/docente/eventos",
    },

    {
      name: "Mapa aulas",
      href: "/dashboard/docente/mapa",
    },

  ],

  estudiante: [

    {
      name: "Inicio",
      href: "/dashboard/estudiante",
    },

    {
      name: "Mis eventos",
      href: "/dashboard/estudiante/eventos",
    },

    {
      name: "Mapa aulas",
      href: "/dashboard/estudiante/mapa",
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

  const pathname =
    usePathname();

  const links =
    linksByRole[role];

  return (

    <nav className={styles.nav}>

      {links.map((link) => (

        <Link
          key={link.href}
          href={link.href}
          className={`${styles.link}
          ${
            pathname === link.href
              ? styles.active
              : ""
          }`}
        >

          {link.name}

        </Link>

      ))}

    </nav>

  );
}