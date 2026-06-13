import { api } from "../api";
import { Evento } from "../types/entidades";

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

export async function getEventosSemana() {
  const res = await api("/eventos");
  if (!res.ok) {
    throw new Error("Error cargando eventos");
  }
  const data: Evento[] =
    await res.json();
  const ahora = new Date();
  const limite = new Date();
  limite.setDate(
    ahora.getDate() + 7
  );
  return data
    .filter((ev) => {
      const fechaHora =
        new Date(
          `${ev.fecha}T${ev.horaInicio}`
        );
      return (
        fechaHora >= ahora &&
        fechaHora <= limite
      );
    })
    .sort((a,b)=>{

      const fechaA =
        new Date(
          `${a.fecha}T${a.horaInicio}`
        ).getTime();

      const fechaB =
        new Date(
          `${b.fecha}T${b.horaInicio}`
        ).getTime();
      return fechaA - fechaB;
    });
}