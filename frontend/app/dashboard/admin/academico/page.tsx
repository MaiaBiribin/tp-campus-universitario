"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Carrera,
  Materia,
} from "../../../lib/entidades";

import {
  getCarreras,
  getMateriasPorCarrera,
} from "../../../lib/services";

import layout from "@/app/styles/layout.module.css";
import dashboard from "@/app/styles/dashboard.module.css";
import cards from "@/app/styles/cards.module.css";

import styles from "./page.module.css";

export default function AcademicoAdmin() {

  const [
    carreras,
    setCarreras,
  ] =
    useState<Carrera[]>([]);

  const [
    materias,
    setMaterias,
  ] =
    useState<Materia[]>([]);

  const [
    carreraSeleccionada,
    setCarreraSeleccionada,
  ] =
    useState<number>();

  const [
    cargando,
    setCargando,
  ] =
    useState(true);

  useEffect(() => {

    async function cargar() {

      try {

        const data =
          await getCarreras();

        setCarreras(data);

        if (
          data.length > 0
        ) {

          setCarreraSeleccionada(
            data[0].id_carrera
          );

          const materiasData =
            await getMateriasPorCarrera(
              data[0].id_carrera
            );

          setMaterias(
            materiasData
          );

        }

      }

      catch (
        error
      ) {

        console.error(
          error
        );

      }

      finally {

        setCargando(
          false
        );

      }

    }

    cargar();

  }, []);

  async function cambiarCarrera(
    id: number
  ) {

    setCarreraSeleccionada(
      id
    );

    try {

      const data =
        await getMateriasPorCarrera(id);

      setMaterias(data);

    }

    catch (
      error
    ) {

      console.error(
        error
      );

    }

  }

  if (
    cargando
  ) {

    return (
      <main
        className={layout.main}
      >
        <div
          className={layout.content}
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
      className={layout.main}
    >

      <div
        className={layout.content}
      >

        <header
          className={dashboard.header}
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

        <section
          className={
            dashboard.summaryGrid
          }
        >

          <div
            className={
              cards.metric
            }
          >

            <p>
              Carreras
            </p>

            <h2>
              {
                carreras.length
              }
            </h2>

          </div>

          <div
            className={
              cards.metric
            }
          >

            <p>
              Materias
            </p>

            <h2>
              {
                materias.length
              }
            </h2>

          </div>

        </section>

        <section
          className={
            styles.grid
          }
        >

          <div
            className={
              cards.card
            }
          >

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

                    <button
                      key={
                        carrera.id_carrera
                      }

                      onClick={() =>
                        cambiarCarrera(
                          carrera.id_carrera
                        )
                      }

                      className={`${styles.item}
                      ${
                        carreraSeleccionada ===
                        carrera.id_carrera
                          ? styles.active
                          : ""
                      }`}
                    >

                      {
                        carrera.nombre
                      }

                    </button>

                  )
                )
              }

            </div>

          </div>

          <div
            className={
              cards.card
            }
          >

            <h2>
              Materias
            </h2>

            <div
              className={
                styles.list
              }
            >

              {
                materias.map(
                  (
                    materia
                  ) => (

                    <div
                      key={
                        materia.id_materia
                      }

                      className={
                        styles.subject
                      }
                    >

                      <h3>
                        {
                          materia.nombre
                        }
                      </h3>

                      <p>

                        Cuatrimestre{" "}

                        {
                          materia.cuatrimestre
                        }

                      </p>

                    </div>

                  )
                )
              }

            </div>

          </div>

        </section>

      </div>

    </main>

  );

}