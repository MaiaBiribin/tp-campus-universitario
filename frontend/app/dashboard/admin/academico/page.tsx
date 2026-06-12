"use client";

import { useEffect, useState } from "react";
import {Carrera,Materia,Usuario,} from "../../../types/entidades";
import {getCarreras,getMateriasPorCarrera,} from "../../../services/services";
import layout from "@/app/styles/layout.module.css";
import dashboard from "@/app/styles/dashboard.module.css";
import styles from "./page.module.css";
import Card from "@/app/components/card";
import Button from "@/app/components/button";
import { api } from "../../../api";

export default function AcademicoAdmin() {

  const [carreras, setCarreras] =useState<Carrera[]>([]);
  const [materias, setMaterias] =
    useState<Materia[]>([]);
  const [materiaSeleccionada, setMateriaSeleccionada] =useState<Materia | null>(null);
  const [usuarios, setUsuarios] =useState<Usuario[]>([]);
  const [usuariosSeleccionados,setUsuariosSeleccionados,] =useState<number[]>([]);
  const [carreraSeleccionada,setCarreraSeleccionada,] =useState<number>();
  const [cargando,setCargando,] =useState(true);
  useEffect(() => {

    async function cargar() {
      try {
        const data =await getCarreras();
        setCarreras(data);
        const usuariosRes =await api("/usuarios/habilitados");
        const usuariosData =await usuariosRes.json();
        setUsuarios(usuariosData);
        if (data.length > 0) {

          setCarreraSeleccionada(data[0].id_carrera);
          const materiasData = await getMateriasPorCarrera(data[0].id_carrera);
          setMaterias(materiasData);
        }
      }
      catch (error) {
        console.error(error);
      }

      finally {
        setCargando(false);
      }
    }
    cargar();
  }, []);
  async function cambiarCarrera(
    id: number
  ) {
    setCarreraSeleccionada(id);
    try {
      const data =await getMateriasPorCarrera(id);
      setMaterias(data);
    }
    catch (error) {console.error(error);}
  }

  function toggleUsuario(id: number) {
    setUsuariosSeleccionados(
      (prev) =>
        prev.includes(id)
          ? prev.filter(
              (u) =>
                u !== id
            )
          : [
              ...prev,
              id,
            ]
    );
  }
  async function inscribirUsuarios(
  idMateria: number
) {

  console.log("Materia seleccionada:", materiaSeleccionada);
  console.log("ID materia recibido:", idMateria);
  console.log("Usuarios:", usuariosSeleccionados);

  if (usuariosSeleccionados.length === 0) {
    alert("Seleccioná usuarios");
    return;
  }
  try {
    await api(
  "/inscripciones",
  {
    method: "POST",

    body: JSON.stringify({
      id_materia: idMateria,
      usuarios: usuariosSeleccionados,
    } as {
      id_materia: number;
      usuarios: number[];
    }),
  }
);
    alert("Usuarios inscriptos");
    setUsuariosSeleccionados([]);
  }

  catch(error){

    console.error(error);
    alert("No se pudo inscribir");

  }
}
  if (cargando) {
    return (
      <main
        className={
          layout.main
        }
      >
        <div
          className={
            layout.content
          }
        >
          <h1>
            Cargando...
          </h1>
        </div>
      </main>
    );

  }

  return (
    <main
      className={
        layout.main
      }
    >
      <div
        className={
          layout.content
        }
      >
        <header
          className={
            dashboard.header
          }
        >
          <div>
            <h1>
              Información académica
            </h1>
            <p>
              Visualizá carreras
              y materias.
            </p>
          </div>
        </header>

        <section className={styles.grid}>

</section>

        <section
          className={
            styles.grid
          }
        >
          <Card>
            <h2>
              Carreras
            </h2>
            <div
              className={
                styles.list
              }
            >
              {
                carreras.map(
                  (
                    carrera
                  ) => (
                    <Button
                      key={carrera.id_carrera}
                      onClick={() =>cambiarCarrera(carrera.id_carrera)}
                    >
                      {
                        carrera.nombre
                      }
                    </Button>
                  )
                )
              }
            </div>
          </Card>
          <Card>
            <h2>
              Materias
            </h2>

  <div className={styles.list}>
    {
      materias.map((materia) => (
        <button
          key={materia.id_materia}
          className={
            materiaSeleccionada?.id_materia === materia.id_materia
              ? styles.active
              : styles.item
          }
          onClick={() =>setMateriaSeleccionada(materia)}
        >
          {materia.nombre}
        </button>
      ))
    }
  </div>
</Card>
<Card>
  <h2>
    {
      materiaSeleccionada
        ? `Inscribir en ${materiaSeleccionada.nombre}`
        : "Seleccioná una materia"
    }
  </h2>

  {
    materiaSeleccionada && (
      <>
        <div className={styles.usersList}>
          {
            usuarios.map((usuario) => (
              <label
                key={usuario.id_usuario}
                className={styles.userRow}
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
            ))
          }

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
    )
  }

</Card>
        </section>
      </div>
    </main>
  );
}