import { api } from "../api";
import { Evento } from "../types/entidades";
/**
 * busca desde el back todos los eventos que hay
 * @returns {Promise<res>} devuevle los eventos 
 * @throw {Error} si es que no se pudo cargar los eventos
 */
export async function getEventos() {
  const res = await api("/eventos");

  if (!res.ok) {
    throw new Error("Error cargando eventos");
  }

  const data: Evento[] = await res.json();
  const ahora = new Date();

  return data
    .filter((ev) => {
      const fechaHora = new Date(
        `${ev.fecha}T${ev.horaInicio}`
      );

      return fechaHora >= ahora;
    })
    .sort((a, b) => {

      const fechaA = new Date(
        `${a.fecha}T${a.horaInicio}`
      ).getTime();
      const fechaB = new Date(
        `${b.fecha}T${b.horaInicio}`
      ).getTime();

      return fechaA - fechaB;
    });
}
/**
 * busca el evento por su id
 * @param {number} id el id del evento buscado
 * @returns {Promise<res>} devuelve el evento buscado
 * @throw {Error} si es que no se pudo encontrar el evento
 */
export async function getEventoPorId(id: number) {
  const res = await api(`/eventos/${id}`);
  if (!res.ok) {
    throw new Error("Error al obtener evento");
  }
  return res.json();
}
/**
 * se encarga de crear eventos
 * @param {unknown}  evento el evento que se quiere crear 
 * @returns {Promise<res>} crea el evento y se carga al sistema
 * @throw {Error} si es que no se pudo crear el evento
 */
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
/**
 * elimina el evento del sistema buscado su id
 * @param {number} id el id del evento que se quierra borrar
 * @throw {Error} si es que no se pudo borrar el evento del sistema
 */
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
/**
 * filtra los eventos  que tenga un usuario en la semana
 * @returns {promises<res>} devuelve todos los eventos de la semana del usuario
 * @throw {Error} si es que no se pudo cargas los eventos de la semana
 */
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