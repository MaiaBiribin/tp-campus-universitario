import { api } from "./api";
//carreras y materias
export async function getCarreras() {
  const res =
    await api("/carreras");

  if (!res.ok) {
    console.log(await res.text());
    throw new Error("Error cargando carreras");
  }
  return res.json();
}

export async function getMateriasPorCarrera(
  id: number
) {

  const res =
    await api(`/materias/carrera/${id}`);

  if (!res.ok) {
    console.log(
      await res.text()
    );
    throw new Error("Error cargando materias");
  }
  return res.json();
}

// aulas
export async function getAulas() {
  const res =
    await api("/aulas");
  if (!res.ok) {
    throw new Error("Error cargando aulas");
  }
  return res.json();
}