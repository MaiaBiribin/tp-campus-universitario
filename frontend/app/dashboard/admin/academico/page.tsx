"use client";

import {useEffect, useState,} from "react";
import styles from "./page.module.css";
import {Carrera, Materia,} from "../../../lib/entidades";
import { getCarreras, getMateriasPorCarrera,} from "../../../lib/services";
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
            data[0].id
          );

          const materiasData =
            await getMateriasPorCarrera(
              data[0].id
            );

          setMaterias(
            materiasData
          );

        }

      }

      catch (
        error
      ) {
        console.error(error);
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
        await getMateriasPorCarrera(
          id
        );

      setMaterias(
        data
      );

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
        className={
          styles.main
        }
      >

        Cargando...

      </main>
    );

  }

  return (

    <main
      className={
        styles.main
      }
    >

      <div
        className={
          styles.content
        }
      >

        <header
          className={
            styles.header
          }
        >

          <div>

            <h1>
              Gestión académica
            </h1>

            <p>
              Administrá carreras
              y materias.
            </p>

          </div>

          <div
            className={
              styles.buttons
            }
          >

            <button>
              Nueva carrera
            </button>

            <button>
              Nueva materia
            </button>

          </div>

        </header>

        <section
          className={
            styles.summary
          }
        >

          <div
            className={
              styles.metric
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
              styles.metric
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
              styles.card
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

              {carreras.map(
                (
                  carrera
                ) => (

                  <button
                    key={
                      carrera.id
                    }

                    onClick={() =>
                      cambiarCarrera(
                        carrera.id
                      )
                    }

                    className={`${styles.item}
                    ${
                      carreraSeleccionada ===
                      carrera.id
                        ? styles.active
                        : ""
                    }`}
                  >

                    {
                      carrera.nombre
                    }

                  </button>

                )
              )}

            </div>

          </div>

          <div
            className={
              styles.card
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

              {materias.map(
                (
                  materia
                ) => (

                  <div
                    key={
                      materia.id
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
              )}

            </div>

          </div>

        </section>

      </div>

    </main>

  );

}