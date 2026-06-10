"use client";
import { useState,useEffect } from "react";
import evento from "@/app/lib/entidades";
import aula from "@/app/lib/entidades"
import materia from "@/app/lib/entidades"
import carrera from "@/app/lib/entidades"

export default function CreacionEventos(){
    const [carreras,setCarreras]=useState<carrera[]>([])
    const [materias,setMaterias]=useState<materia[]>([])
    const [aulas,setAulas]=useState<aula[]>([])

    const [titulo,setTitulo]=useState("")
    const [fecha,setFecha]=useState("")
    const [carreraSelecionada,setCarreraSelecionada]=useState("")
    const [materiaSelecionda,setMateriaSelecionada]=useState("")
    const [aulaSelecionada,setAulaSelecionada]=useState("")

 useEffect(() => {
        async function cargarDatosIniciales() {
            try {
                const [resCarreras, resAulas] = await Promise.all([
                    fetch("http://localhost:4000/carreras"),
                    fetch("http://localhost:4000/aulas")
                ]);
                setCarreras(await resCarreras.json());
                setAulas(await resAulas.json());
            } catch (error) {
                console.error("Error al cargar datos iniciales:", error);
            }
        }
        cargarDatosIniciales();
    }, []);

 async function ManejarCambioDeCarrera(idCarrera:string) {
     setCarreraSelecionada(idCarrera)
     setMateriaSelecionada("")

     if(!idCarrera){
        setMaterias([])
        return
     }

     try{
        const respuesta= await fetch("http://localhost:4000/materias")
        const datos:materia[]=await respuesta.json()
        setMaterias(datos)
     }catch(error){
       console.error("error al buscar las materias",error)
     }

 }

  

    async function CrearEvento(evento: React.FormEvent<HTMLFormElement>) {
           evento.preventDefault()
        const NuevoEvento={
            titulo:titulo,
            fecha:fecha,
            materiaId:materiaSelecionda,
            aulaId:aulaSelecionada,

        }

        try{
          const respuesta= await fetch("",{
             method:"POST",
             headers:{"Content-Type": "application/json"},
             body:JSON.stringify(NuevoEvento)
          })

          if(respuesta.ok){
            
            alert("El evento se a creado,pronto se avisara a los alumnos y profesores")

            setTitulo("");
            setFecha("");
            setCarreraSelecionada("");
            setMateriaSelecionada("");
            setAulaSelecionada("");
            setMaterias([]);
            window.location.href="/dashboard/admin"
          }else{
            alert("Hubo un error al crear el evento")
          }

        }catch(error){
            console.log("error al intentar crear un evento:",error)
        }
    }


 

    return(
       <div>
        <main>
            <header>
                <h1>Que tipo de evento le gustaria crear?</h1>
            </header>

            <form onSubmit={CrearEvento}>
               <div>
                 <label htmlFor="Titulo">Titulo Del evento</label>
                 <input 
                 type="text" 
                  value={titulo}
                  onChange={(evento)=> setTitulo(evento.target.value)}
                  required
                 />
               </div>

               <div>
                <label htmlFor="fecha">Fecha del evento</label>
                <input 
                type="datetime-local"
                value={fecha} 
                onChange={(evento)=>setFecha(evento.target.value)} 
                />
               </div>

              <div>
                <label>Carrera: </label>
                     <select 
                            value={carreraSelecionada} 
                            onChange={(evento) => ManejarCambioDeCarrera(evento.target.value)}
                            required
                        >
                            <option value="">Seleccione una carrera...</option>
                            {carreras.map((carreras) => (
                                <option key={carreras.id} value={carreras.id}>{carreras.nombre}</option>
                            ))}
                        </select>
                    </div>
          
                  <div>
                        <label>Materia: </label>
                        <select 
                            value={materiaSelecionda} 
                            onChange={(evento) => setMateriaSelecionada(evento.target.value)}
                            disabled={!carreraSelecionada}
                            required
                        >
                            <option value="">Seleccione una materia...</option>
                            {materias.map((materias) => (
                                <option key={materias.id} value={materias.id}>{materias.nombre}</option>
                            ))}
                        </select>
                    </div>

                 <div>
                    <label>Aula:</label>
                     <select
                       value={aulaSelecionada}
                       onChange={(evento)=> setAulaSelecionada(evento.target.value)}
                       required
                     > 
                        <option value="">Seleccione un aula</option>
                        {aulas.map((Aulas)=>(
                            <option key={Aulas.id} value={Aulas.piso}>{Aulas.nombre}</option>
                        ))}
                     </select>
                 </div>

                 
                 <button type="submit">Crear evento</button>
            </form>
        </main>
       </div>


    )


}