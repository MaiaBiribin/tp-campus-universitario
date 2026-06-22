"use client";

import layout from "@/app/styles/layout.module.css";
import dashboard from "@/app/styles/dashboard.module.css";
import styles from "./page.module.css";
import Card from "@/app/components/ui/card";
import Button from "@/app/components/ui/button";
import {obtenerUsuariosDisponibles,} from "@/app/services/usuarios";import {useAsignacionAcademica,} from "@/app/hooks/useAsignacionAcademica";

export default function AcademicoAdmin() {

  const {
    carreras,usuariosInscriptos,materias,materiaSeleccionada,setMateriaSeleccionada,usuarios,usuariosSeleccionados,
    cargando,error,exito,cambiarCarrera,cargarUsuariosInscriptos,toggleUsuario,inscribirUsuarios,} = useAsignacionAcademica();

  if (cargando) {
    return (
      <main className={layout.main}>
        <div className={layout.content}>
          <h1>
            Cargando...
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
              Asignación académica
            </h1>
            <p>
              Visualizá carreras y materias.
              Inscribí a los usuarios.
            </p>
          </div>
        </header>
        {error && (
          <p className={dashboard.error}>
            {error}
          </p>
        )}
        {exito && (
          <p className={dashboard.success}>
            {exito}
          </p>
        )}
        <section className={styles.grid}>
          <Card>
            <h2>
              Carreras
            </h2>
            <div className={styles.list}>
              {carreras.map(
                (carrera) => (
                  <Button
                    key={carrera.id_carrera}
                    onClick={() =>
                      cambiarCarrera(
                        carrera.id_carrera
                      )
                    }
                  >
                    {carrera.nombre}
                  </Button>
                )
              )}
            </div>
          </Card>
          <Card>
            <h2>
              Materias
            </h2>
            <div className={styles.list}>
              {materias.map(
                (materia) => (
                  <button
                    key={
                      materia.id_materia
                    }
                    className={
                      materiaSeleccionada?.id_materia ===
                      materia.id_materia
                        ? styles.active
                        : styles.item
                    }
                    onClick={() => {
                      setMateriaSeleccionada(
                        materia
                      );
                      cargarUsuariosInscriptos(
                        materia.id_materia
                      );
                    }}
                  >
                    {materia.nombre}
                  </button>
                )
              )}
            </div>
          </Card>
          <Card>
            <h2>
              {materiaSeleccionada
                ? `Inscribir en ${materiaSeleccionada.nombre}`
                : "Seleccioná una materia"}
            </h2>
            {materiaSeleccionada && (
              <>
                <div className={styles.usersList}>
                  {obtenerUsuariosDisponibles(
                    usuarios,
                    usuariosInscriptos
                  )
                    .map(
                      (usuario) => (
                        <label
                          key={
                            usuario.id_usuario
                          }
                          className={
                            styles.userRow
                          }
                        >
                          <input
                            type="checkbox"
                            checked={
                              usuariosSeleccionados.includes(
                                usuario.id_usuario
                              )
                            }
                            onChange={() =>
                              toggleUsuario(
                                usuario.id_usuario
                              )
                            }
                          />
                          {usuario.nombre}
                          {" "}
                          {usuario.apellido}
                          {" · DNI "}
                          {usuario.dni}
                        </label>
                      )
                    )}
                </div>
                <div className={styles.actions}>
                  <Button
                    onClick={() =>
                      inscribirUsuarios(
                        materiaSeleccionada.id_materia
                      )
                    }
                  >
                    Inscribir seleccionados
                  </Button>
                </div>
              </>
          )}
          </Card>
        </section>
      </div>
    </main>
  );
}