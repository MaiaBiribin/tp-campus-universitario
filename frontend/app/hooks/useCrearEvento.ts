"use client";

import { useEffect, useState } from "react";
import {getCarreras,} from "@/app/services/carreras";
import {getAulas,} from "@/app/services/aulas";
import {getMateriasPorCarrera,} from "@/app/services/materias";
import {crearEvento,} from "@/app/services/eventos";
import {Aula,Carrera,Materia,CrearEventoDTO} from "@/app/types/entidades";
import {getCantidadInscriptos} from "@/app/services/inscripciones";

/**
 * Hook para gestionar la creación de eventos.
 * Maneja el estado del formulario, carga datos auxiliares
 * (carreras, materias y aulas), valida campos y crea eventos.
 * @returns {UseCrearEventoReturn} estados, setters y acciones del formulario.
 */
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
  const [cantidadAlumnos,setCantidadAlumnos]=useState(0);

  useEffect(() => {
    /**
   * Carga los datos iniciales necesarios para crear un evento.
   * Obtiene carreras y aulas en paralelo y actualiza sus estados.
   * @async
   * @returns {Promise<void>}
   */
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

  /**
 * Cambia la carrera seleccionada y carga las materias asociadas.
 * @async
 * @param {string} id de la carrera seleccionada.
 * @returns {Promise<void>}
 */
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

  async function cambiarMateria(id:string){
    setIdMateria(id);
    if(!id){
      setCantidadAlumnos(0);
      return;
    }
    const cantidad =await getCantidadInscriptos(Number(id));
    setCantidadAlumnos(cantidad);
  }

  /**
 * Valida el formulario y crea un nuevo evento.
 * @async
 * @returns {Promise<boolean>} 
 * True si la creación fue exitosa, false si falla una validación o petición.
 */
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

    catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Error al crear evento");
      }
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
    cambiarMateria,
    cantidadAlumnos,
    setIdAula,
    setIdTipoEvento,
    cambiarCarrera,
    submit,
    error,
    exito
  };

}