import { api } from "./api";

export async function getCarreras() {
  const res = await api("/carreras");

  if (!res.ok) {
    throw new Error("Error cargando carreras");
  }

  return res.json();
}

export async function getMateriasPorCarrera(id: number) {
  const res = await api(`/materias/carrera/${id}`);

  if (!res.ok) {
    throw new Error("Error cargando materias");
  }

  return res.json();
}