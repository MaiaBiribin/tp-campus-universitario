import { api } from "../api";

export async function getAulas() {
  const res =
    await api("/aulas");
  if (!res.ok) {
    throw new Error("Error cargando aulas");
  }
  return res.json();
}