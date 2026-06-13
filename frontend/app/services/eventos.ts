import { api } from "../api";

export async function getEventos() {
  const res =await api("/eventos");
  if (!res.ok) {
    throw new Error("Error cargando eventos");
  }
  return res.json();
}

export async function getEventoPorId(id: number) {
  const res = await api(`/eventos/${id}`);
  if (!res.ok) {
    throw new Error("Error al obtener evento");
  }
  return res.json();
}

export async function crearEvento(evento: unknown) {
  const res =await api("/eventos",
      {
        method: "POST",
        body: JSON.stringify(
          evento
        )
      }
    );

  if (!res.ok) {
    throw new Error("Error creando evento");
  }
  return res.json();
}

export async function eliminarEvento(id: number) {
  const res =
    await api(`/eventos/${id}`,
      {
        method: "DELETE"
      }
    );
  if (!res.ok) {
    throw new Error("Error eliminando evento");
  }
}