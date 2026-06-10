"use client";

import NavLinks from "./navLinks";
import { usePathname } from "next/navigation";

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

    <aside
      className="
      w-[260px]
      bg-[#0d1527]
      border-r
      border-[#27324d]
      p-8"
    >

      <h1
        className="
        text-3xl
        font-black
        mb-10"
      >
        Aula
        <span
          className="
          text-[#8b5cf6]"
        >
          Sync
        </span>
      </h1>

      <NavLinks role={role} />

    </aside>

  );
}