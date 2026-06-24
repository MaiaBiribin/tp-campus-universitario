import { useEffect, useState } from "react";
import {Carrera,Materia,Usuario,} from "../types/entidades";
import { getCarreras } from "../services/carreras";
import { getMateriasPorCarrera } from "../services/materias";
import {
  getInscripcionesPorMateria,
  inscribirUsuarios as inscribirUsuariosService,
  obtenerIdsUsuariosInscriptos,
} from "../services/inscripciones";
import {
  getUsuariosHabilitados,
} from "../services/usuarios";

export function useAsignacionAcademica() {

  const [carreras,setCarreras]=useState<Carrera[]>([]);
  const [usuariosInscriptos,setUsuariosInscriptos]=useState<number[]>([]);
  const [materias,setMaterias]=useState<Materia[]>([]);
  const [materiaSeleccionada,setMateriaSeleccionada]=useState<Materia|null>(null);
  const [usuarios,setUsuarios]=useState<Usuario[]>([]);
  const [usuariosSeleccionados,setUsuariosSeleccionados]=useState<number[]>([]);
  const [carreraSeleccionada,setCarreraSeleccionada]=useState<number>();
  const [cargando,setCargando]=useState(true);
  const [error,setError]=useState("");
  const [exito,setExito]=useState("");

  useEffect(()=>{

    async function cargar(){
      setError("");
      try{
        const data=await getCarreras();

        setCarreras(data);

        const usuariosData=await getUsuariosHabilitados();
        setUsuarios(usuariosData);
        if(data.length>0){
          setCarreraSeleccionada(data[0].id_carrera);

          const materiasData=await getMateriasPorCarrera(data[0].id_carrera);
          setMaterias(materiasData);
        }
      }catch{
        setError("No se pudieron cargar las carreras.");
      }
      finally{
        setCargando(false);
      }
    }
    cargar();
  },[]);

  async function cambiarCarrera(id:number){
    setError("");
    setCarreraSeleccionada(id);
    try{
      const data=await getMateriasPorCarrera(id);setMaterias(data);
    }
    catch{setError("No se pudieron cargar las materias.");
    }
  }

  async function cargarUsuariosInscriptos(idMateria:number){
    setError("");
    try{
      const data=await getInscripcionesPorMateria(idMateria);
      setUsuariosInscriptos(obtenerIdsUsuariosInscriptos(data));
    }
    catch{
      setError("No se pudieron cargar las inscripciones.");
    }
  }

  function toggleUsuario(id:number){

    setUsuariosSeleccionados(
      prev=>
      prev.includes(id)
      ?
      prev.filter(
        u=>u!==id
      )
      :
      [
        ...prev,
        id
      ]
    );
  }
  async function inscribirUsuarios(idMateria:number){
  setError("");
  setExito("");
  if(usuariosSeleccionados.length===0){
    setError("Seleccioná usuarios");
    return;
  }
  try{
    await inscribirUsuariosService(idMateria,usuariosSeleccionados);
    setUsuariosInscriptos(
      prev => [
        ...prev,
        ...usuariosSeleccionados
      ]
    );
    setExito(`${usuariosSeleccionados.length} usuario(s) inscripto(s) correctamente`);
    setUsuariosSeleccionados([]);
  }
  catch{
    setError("No se pudo completar la inscripción.");
  }
}
  return {
    carreras,
    usuariosInscriptos,
    materias,
    materiaSeleccionada,
    setMateriaSeleccionada,
    usuarios,
    usuariosSeleccionados,
    carreraSeleccionada,
    cargando,
    error,
    exito,
    cambiarCarrera,
    cargarUsuariosInscriptos,
    toggleUsuario,
    inscribirUsuarios,

  };

}