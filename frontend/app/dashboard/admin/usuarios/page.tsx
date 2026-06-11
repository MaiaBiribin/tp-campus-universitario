"use client";

import { useEffect, useState } from "react";
import { api } from "../../../lib/api";
import layout from "@/app/styles/layout.module.css";
import dashboard from "@/app/styles/dashboard.module.css";
import table from "@/app/styles/table.module.css";

type Usuario = {
  id_usuario: number;
  nombre: string;
  apellido: string;
  mail: string;
  dni: string;

  rol: {
    id_rol: number;
    nombre: string;
  };
};

export default function UsuariosAdmin() {

  const [usuarios, setUsuarios] =
    useState<Usuario[]>([]);

  const [cargando, setCargando] =
    useState(true);

  useEffect(() => {

    async function cargarUsuarios() {

      try {

        const res =
          await api("/usuarios/habilitados");

        const data =
          await res.json();

        setUsuarios(data);

      }

      catch (error) {
        console.error(error);}

      finally {
        setCargando(false); }

    }
    cargarUsuarios();
  }, []);

  if (cargando) {
    return (
      <main className={layout.main}>
        <div className={layout.content}>
          <h1>
            Cargando usuarios...
          </h1>
        </div>
      </main>

    );

  }

  return (
    <main className={layout.main}>
      <div className={layout.content}>
        <header className={dashboard.header}>
          <div>

            <h1>
              Usuarios habilitados
            </h1>

            <p>
              Listado de usuarios activos del sistema.
            </p>

          </div>

          <div className={table.badge}>
            {usuarios.length}
          </div>

        </header>
        {usuarios.length === 0 ? (
          <div className={table.empty}>

            <h2>
              No hay usuarios habilitados
            </h2>

          </div>

        ) : (

          <div className={table.tableContainer}>
            <div className={table.tableWrapper}>
              <table className={table.table}>

                <thead>

                  <tr>

                    <th>
                      ID
                    </th>

                    <th>
                      Nombre
                    </th>

                    <th>
                      Apellido
                    </th>

                    <th>
                      Mail
                    </th>

                    <th>
                      DNI
                    </th>

                    <th>
                      Rol
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {usuarios.map((usuario) => (

                    <tr
                      key={usuario.id_usuario}
                    >

                      <td>
                        {usuario.id_usuario}
                      </td>

                      <td>
                        {usuario.nombre}
                      </td>

                      <td>
                        {usuario.apellido}
                      </td>

                      <td>
                        {usuario.mail}
                      </td>

                      <td>
                        {usuario.dni}
                      </td>

                      <td>

                        <span
                          className={`${table.badge} ${table.success}`}
                        >

                          {usuario.rol.nombre}

                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        )}

      </div>

    </main>

  );

}