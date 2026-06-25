"use client";

import { useEffect, useState } from "react";
import RenderizarEventosSemana from "@/app/components/renderizarEventosSemana";
import { getEventosSemana } from "@/app/services/eventos";
import { Evento } from "@/app/types/entidades";
import forms from "@/app/styles/forms.module.css";

type Props = {
  titulo: string;
  descripcion?: string;
};

/**
 * Vista contenedora de los eventos de la semana.
 * obtiene los eventos mediante el servicio correspondiente y gestiona los estados de carga, error y visualización.
 * @component
 * @param {Props} props propiedades del componente.
 * @param {string} props.titulo título mostrado en pantalla.
 * @param {string} [props.descripcion] Descripción opcional.
 * @returns {JSX.Element} Página con los eventos semanales.
 * @example
 * <EventosSemanaView
 *   titulo="Eventos de la semana"
 *   descripcion="Próximas actividades"
 * />
 */
export default function EventosSemanaView({
  titulo,
  descripcion
}: Props) {

  const [eventos, setEventos] =useState<Evento[]>([]);
  const [cargando, setCargando] =useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargar() {
      try {
        const data =
          await getEventosSemana();
        setEventos(data);
      } catch (error) {
        setError("No se pudieron cargar los eventos de la semana.");
      } finally {
        setCargando(false);
      }
    }
    cargar();
  }, []);

  if (error) {
  return (
    <main>
      <p className={forms.error}>{error}</p>
    </main>
  );
}

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