"use client";

import NavLinks from "./navLinks";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import styles from "@/app/styles/dashboard.module.css";

export default function SideBar() {

  const pathname =
    usePathname();
  
  const router = useRouter();
  function cerrarSesion() {
    localStorage.removeItem("token");
    document.cookie =
      "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/login");
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
        Aula
        <span>Sync</span>
      </h1>
      <NavLinks role={role} />
      <button
        onClick={cerrarSesion}
        className={styles.logout}
      >
        Cerrar sesión
      </button>

    </aside>
  );
}