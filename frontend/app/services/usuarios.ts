import { api } from "../api";
import { Usuario } from "../types/entidades";
/**
 * busca a todos los usuarios habilitados en el sistema
 * @returns {Promise<res>}  devuelve a todos los usuarios habilitados del sistema
 * @throw {Error} si es que no se pudo cargar los usuarios habilitados
 */
export async function getUsuariosHabilitados() {
  const res =await api("/usuarios/habilitados");
  if (!res.ok) {
    throw new Error("Error cargando usuarios");
  }
  return res.json();
}
/**
 * busca las solicitudes de los usuarios que estan pendientes para habilitar
 * @returns {Promise<res>} devuelve los usuarios que estan pendientes
 * @throw {Error} si es que no se pudo cargar a los usuarios pendientes
 */
export async function getUsuariosPendientes() {
  const res =await api("/usuarios/pendientes");
  if (!res.ok) {
    throw new Error("Error cargando solicitudes");
  }
  return res.json();
}

/**
 * se encarga de aprobar la solicitud del usario para pasar  a habilitado
 * @param {number} id el id del usuario que se va a habilitar
 * @throw {Error} si es que no se pudo cambiar el estado del usuario
 */
export async function aprobarUsuario(id:number) {
  const res =
    await api(`/usuarios/${id}/habilitar`,
      {
        method:"PATCH"
      }
    );
  if (!res.ok) {
    throw new Error("Error aprobando usuario");
  }
}
/**
 * se encarga de rechazar la solicitud del usuario a pasar a habilitado
 * @param {number} id el id del usuario cuya solicitud es rechazada
 * @throw {Error} si es que no se pudo rechazar correctamente la solicitud
 */
export async function rechazarUsuario(id:number) {
  const res =await api(`/usuarios/${id}/rechazar`,
      {
        method:"PATCH"
      }
    );
  if (!res.ok) {
    throw new Error("Error rechazando usuario");
  }
}
/**
 * se encarga de obtener a todos los usuarios que estan disponibles en el sistema
 * @param {Usuario} usuarios todos los usuarios del sistema
 * @param {number} usuariosInscriptos los usuarios que estan inscriptos a una carrea/materias
 * @returns {Usuario} devuelve a todos los usuarios disponibles
 */
export function obtenerUsuariosDisponibles(
  usuarios: Usuario[],
  usuariosInscriptos: number[]
) {
  return usuarios.filter(
    usuario =>
      !usuariosInscriptos.includes(usuario.id_usuario)
  );
}