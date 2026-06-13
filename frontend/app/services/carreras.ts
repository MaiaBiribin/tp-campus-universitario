import { api } from "../api";export async function getCarreras() {
  const res =
    await api("/carreras");

  if (!res.ok) {
    console.log(await res.text());
    throw new Error("Error cargando carreras");
  }
  return res.json();
}