import { api } from "../api";
import { Aviso } from "../types/entidades";


export async function crearAviso(
  mensaje: string,
  id_evento: number
) {
  const res = await api("/avisos", {
    method: "POST",
    body: JSON.stringify({
      mensaje,
      id_evento,
    }),
  });
  if (!res.ok) {
    throw new Error("Error creando aviso");
  }
  return res.json();
}


export async function getAvisosPorEvento(
  id_evento:number
): Promise<Aviso[]> {
  const res = await api(
    `/avisos/evento/${id_evento}`
  );
  if (!res.ok) {
    throw new Error("Error cargando avisos");
  }
  return res.json();
}

export async function eliminarAviso(id:number){
  const res = await api(
    `/avisos/${id}`,
    {
      method:"DELETE",
    }
  );

  if(!res.ok){
    throw new Error(
      "Error eliminando aviso"
    );
  }

  return res.json();
}

export async function getAvisos(): Promise<Aviso[]> {
  const res = await api("/avisos");
  if(!res.ok){
    throw new Error(
      "Error cargando avisos"
    );
  }

  return res.json();
}