"use client";

import { useState } from "react";
import { api } from "@/app/api";

type Props = {
  idEvento: number;
  onCreated?: () => void;
};

export default function CrearAviso({ idEvento, onCreated }: Props) {
  const [mensaje, setMensaje] = useState("");
  async function enviar() {
    if (!mensaje) return;

    await api("/avisos", {
      method: "POST",
      body: JSON.stringify({
        id_evento: idEvento,
        mensaje,
        tipo: "info",
      }),
    });

    setMensaje("");
    onCreated?.();
  }

  return (
    <div>
      <input
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
        placeholder="Ej: Llego tarde / Clase virtual"
      />

      <button onClick={enviar}>
        Publicar aviso
      </button>
    </div>
  );
}