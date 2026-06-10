"use client";

import NavLinks from "./navLinks";

export default function SideBar() {

  const token =
    localStorage.getItem("token");

  let role:
    "admin"
    | "docente"
    | "estudiante"
    = "estudiante";

  if (token) {

  const payload =
    JSON.parse(
      atob(
        token.split(".")[1]
      )
    );

  console.log(payload);

  if (payload.rol === "Admin") {
    role = "admin";
  }

  else if (payload.rol === "Profesor") {
    role = "docente";
  }

  else if (payload.rol === "Alumno") {
    role = "estudiante";
  }
}

console.log("ROL SIDEBAR:", role);

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

      <NavLinks
        role={role}
      />

    </aside>

  );
}