import { api } from "../api";
import { Inscripcion } from "../types/entidades";

export async function getInscripcionesPorMateria(
  idMateria: number
) {

  const res =
    await api(
      `/inscripciones/materia/${idMateria}`
    );

  if (!res.ok) {
    throw new Error(
      "Error cargando inscripciones"
    );
  }

  return res.json();
}

export async function inscribirUsuarios(
  idMateria: number,
  usuarios: number[]
) {

  const res =
    await api(
      "/inscripciones",
      {
        method: "POST",

        body: JSON.stringify({
          id_materia: idMateria,
          usuarios,
        }),
      }
    );

  if (!res.ok) {
    throw new Error(
      "Error al inscribir usuarios"
    );
  }

  return res.json();
}

export function obtenerIdsUsuariosInscriptos(
  inscripciones: Inscripcion[]
): number[] {

  return inscripciones.map(
    inscripcion =>
      inscripcion.usuario.id_usuario
  );

}