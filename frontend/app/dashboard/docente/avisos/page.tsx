"use client";

import { useEffect,useState } from "react";
import layout from "@/app/styles/layout.module.css";
import dashboard from "@/app/styles/dashboard.module.css";
import buttons from "@/app/styles/buttons.module.css";
import table from "@/app/styles/table.module.css";
import forms from "@/app/styles/forms.module.css";
import { Aviso } from "@/app/types/entidades";
import { getAvisos,eliminarAviso} from "@/app/services/avisos";

export default function Avisos(){

const [avisos,setAvisos]=useState<Aviso[]>([]);
const [cargando,setCargando]=useState(true);
const [error,setError]=useState("");
const [exito,setExito]=useState("");
const [eliminando,setEliminando]=useState<number | null>(null);
useEffect(()=>{
  async function cargar(){
    try{
      const data = await getAvisos();
      setAvisos(data);
    }catch{
      setError("No se pudieron cargar los avisos.");

    }finally{
      setCargando(false);
    }
  }
  cargar();
},[]);
function crearAviso(){
    window.location.href ="/dashboard/docente/avisos/nuevo";
}
async function borrar(id:number){
  setError("");
  setExito("");
  setEliminando(id);
  try{
    await eliminarAviso(id);
    setAvisos(prev =>
      prev.filter(
        aviso =>
          aviso.id_aviso !== id
      )
    );
    setExito("Aviso eliminado correctamente.");
  }catch{
    setError("No se pudo eliminar el aviso.");
  }finally{
    setEliminando(null);
  }
}

return (
  <main className={layout.main}>
    <div className={layout.content}>
        
      <header className={dashboard.header}>
        <div>
          <h1>Mis avisos</h1>
          <p>Gestioná comunicaciones para tus estudiantes.</p>
        </div>
        <button
          className={buttons.primary}
          onClick={crearAviso}
        >
          Crear aviso
        </button>
      </header>
      {error && (<p className={forms.error}>{error}</p>)}
      {exito && (<p className={forms.helper}>{exito}</p>)}
      {
        cargando ?
        <p className={forms.helper}>Cargando avisos...</p>
        :
        avisos.length===0 ?
        <div className={table.empty}>
          <h2>No hay avisos</h2>
          <p>Creá un aviso relacionado a tus eventos.</p>
        </div>
        :
        <div className={table.tableContainer}>
          <table className={table.table}>
            <thead>
              <tr>
                <th>
                  Mensaje
                </th>
                <th>
                  Evento
                </th>
                <th>
                  Fecha
                </th>
                <th>
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {
                avisos.map(aviso=>(
                  <tr key={aviso.id_aviso}>
                    <td>
                      {aviso.mensaje}
                    </td>
                    <td>
                      {aviso.evento?.titulo}
                    </td>
                    <td>
                      {
                        new Date(
                          aviso.fecha_creacion
                        )
                        .toLocaleDateString()
                      }
                    </td>
                    <td>
                      <button
                        className={buttons.danger}
                        onClick={()=>
                          borrar(aviso.id_aviso)
                        }
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      }
    </div>
  </main>
);
}