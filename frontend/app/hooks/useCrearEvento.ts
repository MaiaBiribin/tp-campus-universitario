"use client";

import { useEffect, useState } from "react";
import {Aula,Carrera,Materia,} from "@/app/types/entidades";
import {getCarreras,} from "@/app/services/carreras";
import {getAulas,} from "@/app/services/aulas";
import {getMateriasPorCarrera,} from "@/app/services/materias";
import {crearEvento,} from "@/app/services/eventos";

export function useCrearEvento() {
  const [fecha, setFecha] =useState("");
  const [horaInicio,setHoraInicio] =useState("");
  const [horaFin,setHoraFin] =useState("");
  const [idCarrera,setIdCarrera] =useState("");
  const [idMateria,setIdMateria] =useState("");
  const [idAula,setIdAula] =useState("");
  const [idTipoEvento,setIdTipoEvento] =useState("");
  const [carreras,setCarreras] =useState<Carrera[]>([]);
  const [materias,setMaterias] =useState<Materia[]>([]);
  const [aulas,setAulas] =useState<Aula[]>([]);
  const [error,setError] =useState("");
  const [exito,setExito] =useState("");

  useEffect(() => {

    async function cargar() {

      try {
        const [carreras,aulas] =await Promise.all([getCarreras(),getAulas()]);
        setCarreras(carreras);
        setAulas(aulas);

      }

      catch {
        setError("No se pudieron cargar los datos");
      }
    }
    cargar();
  }, []);

  async function cambiarCarrera(carreraId: string) {

    setIdCarrera(carreraId);
    setIdMateria("");

    if (!carreraId) {
      setMaterias([]);
      return;
    }

    try {
      const data =await getMateriasPorCarrera(Number(carreraId));
      setMaterias(data);
    }

    catch {
      setError("No se pudieron cargar materias");
    }
  }

  async function submit() {
    setError("");
    setExito("");
    if (
      horaInicio >=
      horaFin
    ) {
      setError("La hora de inicio debe ser menor");
      return false;
    }
    const materia =
      materias.find(
        m =>
          m.id_materia ===
          Number(idMateria)
      );
    if (!materia) {
      setError("Seleccioná una materia");
      return false;
    }

    try {
      await crearEvento({
        titulo:
          materia.nombre,
        fecha,
        horaInicio,
        horaFin,
        aula: {
          id_aula:
            Number(idAula)
        },
        tipoEvento: {
          id_tipo_evento:
            Number(idTipoEvento)
        },
        materia: {
          id_materia:
            Number(idMateria)
        }
      });

      setExito("Evento creado correctamente");
      return true;
    }

    catch {
      setError("Error al crear evento");
      return false;
    }
  }

  return {
    fecha,
    setFecha,
    horaInicio,
    setHoraInicio,
    horaFin,
    setHoraFin,
    carreras,
    materias,
    aulas,
    idCarrera,
    idMateria,
    idAula,
    idTipoEvento,
    setIdMateria,
    setIdAula,
    setIdTipoEvento,
    cambiarCarrera,
    submit,
    error,
    exito
  };

}