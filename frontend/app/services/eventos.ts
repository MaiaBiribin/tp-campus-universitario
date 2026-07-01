import { api } from "../api";
import { CrearEventoDTO, Evento } from "../types/entidades";

/**
 * Obtiene los eventos futuros ordenados por fecha.
 * @returns {Promise<Evento[]>} Lista de eventos próximos
 * @throws {Error} Si falla la carga de eventos.
 */
export async function getEventos(): Promise<Evento[]> {
  const res = await api("/eventos");
  if (!res.ok) {
    throw new Error("Error cargando eventos");
  }
  const data: Evento[] = await res.json();
  const ahora = new Date();
  return data
    .filter((ev) => {

      const inicio = new Date(
        `${ev.fecha}T${ev.horaInicio}`
      );

      const fin = new Date(
        `${ev.fecha}T${ev.horaFin}`
      );
      return fin >= ahora;
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

/**
 * Obtiene un evento específico por su identificador.
 * @param {number} id del evento.
 * @returns {Promise<Evento>} Evento encontrado.
 * @throws {Error} Si no se puede obtener el evento.
 */
export async function getEventoPorId(id: number): Promise<Evento> {
  const res = await api(`/eventos/${id}`);
  if (!res.ok) {
    throw new Error("Error al obtener evento");
  }
  return res.json();
}

/**
 * Crea un nuevo evento académico.
 * @param {CrearEventoDTO} datos del evento a crear.
 * @returns {Promise<Evento>} Evento creado.
 * @throws {Error} Si falla la creación.
 */
export async function crearEvento(evento:CrearEventoDTO): Promise<Evento> {
  const res =await api("/eventos",
      {
        method: "POST",
        body: JSON.stringify(
          evento
        )
      }
    );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error creando evento");
  }
  return res.json();
}

/**
 * Elimina un evento existente
 * @param {number} id del evento.
 * @returns {Promise<void>}
 * @throws {Error} Si falla la eliminación.
 */
export async function eliminarEvento(id: number): Promise<void> {
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

/**
 * Obtiene los eventos programados durante los próximos 7 días
 * @returns {Promise<Evento[]>} Eventos dentro del rango semanal.
 * @throws {Error} Si falla la carga de eventos.
 */
export async function getEventosSemana(): Promise<Evento[]> {
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
      const fin =new Date(`${ev.fecha}T${ev.horaFin}`);
      return (fin >= ahora &&fechaHora <= limite);
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