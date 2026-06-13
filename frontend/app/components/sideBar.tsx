"use client";

import NavLinks from "./navLinks";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { logout } from "../services/auth";
import styles from "@/app/styles/dashboard.module.css";

export default function SideBar() {

  const pathname =
    usePathname();
  
  const router = useRouter();
  function cerrarSesion() {
    logout();
    router.replace("/login");
  }

  let role:
    "admin"
    | "docente"
    | "estudiante";

  if (
    pathname.startsWith(
      "/dashboard/admin"
    )
  ) {
    role = "admin";
  }

  else if (
    pathname.startsWith(
      "/dashboard/docente"
    )
  ) {
    role = "docente";
  }

  else {
    role = "estudiante";
  }

  return (
    <aside className={styles.sidebar}>
      <h1 className={styles.logo}>
        Aula<span>Sync</span>
        </h1>
      <NavLinks role={role} />
      <div className={styles.logoutContainer}>
        <button
        onClick={cerrarSesion}
        className={styles.logout}
        >
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}