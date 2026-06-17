import { api } from "../api";
import { Usuario } from "../types/entidades";

export async function getUsuariosHabilitados() {
  const res =await api("/usuarios/habilitados");
  if (!res.ok) {
    throw new Error("Error cargando usuarios");
  }
  return res.json();
}
export async function getUsuariosPendientes() {
  const res =await api("/usuarios/pendientes");
  if (!res.ok) {
    throw new Error("Error cargando solicitudes");
  }
  return res.json();
}

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

export function obtenerUsuariosDisponibles(
  usuarios: Usuario[],
  usuariosInscriptos: number[]
) {
  return usuarios.filter(
    usuario =>
      !usuariosInscriptos.includes(usuario.id_usuario)
  );
}