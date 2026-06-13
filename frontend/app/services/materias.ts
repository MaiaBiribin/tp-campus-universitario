import { api } from "../api";

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