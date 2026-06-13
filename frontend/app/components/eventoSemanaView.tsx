"use client";

import { useEffect, useState } from "react";
import RenderizarEventosSemana from "@/app/components/renderizarEventosSemana";
import { getEventosSemana } from "@/app/services/eventos";
import { Evento } from "@/app/types/entidades";

type Props = {
  titulo: string;
  descripcion?: string;
};

export default function EventosSemanaView({
  titulo,
  descripcion
}: Props) {

  const [eventos, setEventos] =useState<Evento[]>([]);
  const [cargando, setCargando] =useState(true);

  useEffect(() => {
    async function cargar() {
      try {
        const data =
          await getEventosSemana();
        setEventos(data);
      } catch (error) {
        console.error(error);
      } finally {
        setCargando(false);
      }
    }
    cargar();
  }, []);

  return (
    <main>
      <header>
        <h1>
          {titulo}
        </h1>
        {descripcion && (
          <p>
            {descripcion}
          </p>
        )}
      </header>
      {
        cargando ? (
          <p>
            Cargando...
          </p>
        ) : (
          <RenderizarEventosSemana
            eventos={eventos}
          />
        )
      }
    </main>
  );
}