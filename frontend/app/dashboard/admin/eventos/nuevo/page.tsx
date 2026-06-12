"use client";
import {getCarreras,getMateriasPorCarrera,getAulas} from "../../../../services/services";
import {Carrera,Materia,Aula,} from "../../../../types/entidades";
import { useEffect, useState } from "react";
import layout from "@/app/styles/layout.module.css";
import forms from "@/app/styles/forms.module.css";
import Card from "@/app/components/card";
import Button from "@/app/components/button";
import dashboard from "@/app/styles/dashboard.module.css";
import { api } from "../../../../api";

export default function CrearEvento() {
  const [fecha, setFecha] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [carreras, setCarreras] =
    useState<Carrera[]>([]);
  const [materias, setMaterias] =
    useState<Materia[]>([]);
  const [aulas, setAulas] =
    useState<Aula[]>([]);
  const [idCarrera, setIdCarrera] =
    useState("");
  const [idMateria, setIdMateria] =
    useState("");
  const [idAula, setIdAula] =
    useState("");
  const [idTipoEvento, setIdTipoEvento] =
    useState("");

  useEffect(() => {
    async function cargar() {
      try {
        setCarreras(
          await getCarreras());
        setAulas(
          await getAulas());
        }
        catch (error) {console.error(error);}
      }
      cargar();}, []);

  async function cambiarCarrera(
  carreraId: string) {
    setIdCarrera(carreraId);
    setIdMateria("");
    if (!carreraId) {
      setMaterias([]);
      return;
    }
    try {
      const data = await getMateriasPorCarrera(Number(carreraId));
      setMaterias(data);
    }
    catch (error) {console.error(error);}
  }

  async function handleSubmit(
    e: React.FormEvent) {
      e.preventDefault();
      if (horaInicio >= horaFin) {
        alert(
          "La hora de inicio debe ser menor que la hora de fin");
          return;
        }
      const materiaSeleccionada = materias.find((m) => m.id_materia === Number(idMateria));
      try {
        const res =
        await api("/eventos", {
          method: "POST",
          body: JSON.stringify({
            titulo: materiaSeleccionada?.nombre,
            fecha,
            horaInicio,
            horaFin,
            aula: {
              id_aula: Number(idAula),},
            tipoEvento: {
              id_tipo_evento: Number(idTipoEvento),},
            materia: {
              id_materia: Number(idMateria),},
            }),
          });
        if (res.ok) {
          alert("Evento creado");
          window.location.href = "/dashboard/admin/eventos";
        } else {
          const error = await res.json().catch(() => null);
          alert(error?.message || "Error al crear evento");
        }
      } catch (error) {
        console.error(error);
        alert("Error de conexión con el servidor");
      }
    }

  return (
  <main className={layout.main}>
    <div className={layout.content}>
      <header className={dashboard.header}>
        <h1>
          Crear evento
        </h1>
        <p>
          Registrá una clase,
          parcial o final.
        </p>
      </header>
      <Card>
        <form
          onSubmit={handleSubmit}
          className={forms.form}
        >

          <div className={forms.row}>

            <div className={forms.field}>

              <label className={forms.label}>
                Carrera
              </label>

              <select
                className={forms.select}
                value={idCarrera}
                onChange={(e) =>
                  cambiarCarrera(
                    e.target.value
                  )
                }
              >

                <option value="">
                  Seleccionar carrera
                </option>

                {carreras.map(
                  (carrera) => (

                    <option
                      key={
                        carrera.id_carrera
                      }
                      value={
                        carrera.id_carrera
                      }
                    >

                      {carrera.nombre}

                    </option>

                  )
                )}

              </select>

            </div>

            <div className={forms.field}>

              <label className={forms.label}>
                Materia
              </label>

              <select
                className={forms.select}
                value={idMateria}
                onChange={(e) =>
                  setIdMateria(
                    e.target.value
                  )
                }
              >

                <option value="">
                  Seleccionar materia
                </option>

                {materias.map(
                  (materia) => (

                    <option
                      key={
                        materia.id_materia
                      }
                      value={
                        materia.id_materia
                      }
                    >

                      {materia.nombre}

                    </option>

                  )
                )}

              </select>

            </div>

          </div>

          <div className={forms.row}>

            <div className={forms.field}>

              <label className={forms.label}>
                Tipo de evento
              </label>

              <select
                className={forms.select}
                value={idTipoEvento}
                onChange={(e) =>
                  setIdTipoEvento(
                    e.target.value
                  )
                }
              >

                <option value="">
                  Seleccionar tipo
                </option>

                <option value="1">
                  Clase
                </option>

                <option value="2">
                  Parcial
                </option>

                <option value="3">
                  Final
                </option>

              </select>

            </div>

            <div className={forms.field}>

              <label className={forms.label}>
                Aula
              </label>

              <select
                className={forms.select}
                value={idAula}
                onChange={(e) =>
                  setIdAula(
                    e.target.value
                  )
                }
              >

                <option value="">
                  Seleccionar aula
                </option>

                {aulas.map(
                  (aula) => (

                    <option
                      key={
                        aula.id_aula
                      }
                      value={
                        aula.id_aula
                      }
                    >

                      {aula.nombre}

                    </option>

                  )
                )}

              </select>

            </div>

          </div>

          <div className={forms.row}>

            <div className={forms.field}>

              <label className={forms.label}>
                Fecha
              </label>

              <input
                type="date"
                className={forms.input}
                value={fecha}
                onChange={(e) =>
                  setFecha(
                    e.target.value
                  )
                }
              />

            </div>

          </div>

          <div className={forms.row}>

            <div className={forms.field}>

              <label className={forms.label}>
                Hora inicio
              </label>

              <input
                type="time"
                className={forms.input}
                value={horaInicio}
                onChange={(e) =>
                  setHoraInicio(
                    e.target.value
                  )
                }
              />

            </div>

            <div className={forms.field}>

              <label className={forms.label}>
                Hora fin
              </label>

              <input
                type="time"
                className={forms.input}
                value={horaFin}
                onChange={(e) =>
                  setHoraFin(
                    e.target.value
                  )
                }
              />

            </div>

          </div>

          <div className={forms.actions}>

            <Button
              type="submit"
            >

              Crear evento

            </Button>

          </div>

        </form>

      </Card>

    </div>

  </main>

);
}