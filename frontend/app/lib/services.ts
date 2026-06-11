
import { api } from "./api";

export async function getCarreras() {

  const res =
    await api("/carreras");

  if (!res.ok) {

    console.log(
      await res.text()
    );

    throw new Error(
      "Error cargando carreras"
    );

  }

  return res.json();

}

export async function getMateriasPorCarrera(
  id: number
) {

  const res =
    await api(
      `/materias/carrera/${id}`
    );

  if (!res.ok) {

    console.log(
      await res.text()
    );

    throw new Error(
      "Error cargando materias"
    );

  }

  return res.json();
<<<<<<< HEAD
}


export async function getUsuarioId(id:number){
  const res= await api(`/usuarios/${id}`);

  if(!res.ok){
    throw new Error("Error al buscar el usario")
  }

  return res.json()
=======

>>>>>>> 19be06787cb75d4dcb589bfe16482ccd6610eab8
}