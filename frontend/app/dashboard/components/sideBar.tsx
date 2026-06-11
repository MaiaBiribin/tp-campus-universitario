"use client";

import NavLinks from "./navLinks";
import { usePathname } from "next/navigation";
import styles from "@/app/styles/dashboard.module.css";

export default function SideBar() {

  const pathname =
    usePathname();

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

    </aside>
  );
}