"use client";

import layout from "@/app/styles/layout.module.css";
import dashboard from "@/app/styles/dashboard.module.css";
import styles from "./page.module.css";
import Card from "@/app/components/ui/card";
import Button from "@/app/components/ui/button";
import forms from "@/app/styles/forms.module.css";
import {obtenerUsuariosDisponibles,} from "@/app/services/usuarios";import {useAsignacionAcademica,} from "@/app/hooks/useAsignacionAcademica";

export default function AcademicoAdmin() {

  const {
    carreras,usuariosInscriptos,materias,materiaSeleccionada,setMateriaSeleccionada,usuarios,usuariosSeleccionados,
    cargando,error,exito,cambiarCarrera,cargarUsuariosInscriptos,toggleUsuario,inscribirUsuarios,} = useAsignacionAcademica();

  if (cargando) {
    return (
      <main className={layout.main}>
        <div className={layout.content}>
          <p className={forms.helper}>Cargando información académica...</p>
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
        {error && (<p className={forms.error}>{error}</p>)}
        {exito && (<p className={forms.helper}>{exito}</p>)}
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
                {usuariosInscriptos.length > 0 && (<div className={styles.usersList}>
                  <h3>Usuarios inscriptos</h3>
                  {usuarios.filter(usuario =>
                  usuariosInscriptos.includes(usuario.id_usuario)).map(usuario => (
                  <p
                  key={usuario.id_usuario}
                  className={styles.userRow}>
                    {usuario.nombre}
                    {" "}
                    {usuario.apellido}
                    {" · DNI "}
                    {usuario.dni}</p>
                    ))}</div>)}
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