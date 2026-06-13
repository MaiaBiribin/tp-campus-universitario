"use client";

import Image from "next/image";
import { useState } from "react";
import Button from "./ui/button";

enum Mapas {
  PB = "PB",
  P1 = "P1",
  P2 = "P2",
}

interface AreaMapa {
  coords: string;
  alt: string;
  href: string;
}

interface DatosMapa {
  titulo: string;
  src: string;
  nombreMapa: string;
  areas: AreaMapa[];
}

const ConfigurarMapas: Record<Mapas, DatosMapa> = {
  [Mapas.PB]: {
    titulo: "Planta Baja",
    src: "/mapaPB.png",
    nombreMapa: "plantaBaja",
    areas: [
      { coords: "78,80,217,315", alt: "Aula 101", href: "/aulas/101" },
      { coords: "218,70,371,338", alt: "Aula 102", href: "/aulas/102" },
    ],
  },

  [Mapas.P1]: {
    titulo: "Primer Piso",
    src: "/mapaP1.png",
    nombreMapa: "primerPiso",
    areas: [
      { coords: "31,35,87,130", alt: "Aula 201", href: "/aulas/201" },
    ],
  },

  [Mapas.P2]: {
    titulo: "Segundo Piso",
    src: "/mapaP2.png",
    nombreMapa: "segundoPiso",
    areas: [
      { coords: "53,35,157,137", alt: "Aula 301", href: "/aulas/301" },
    ],
  },
};

export default function RenderizarMapas() {
  const [mapaSeleccionado, setMapaSeleccionado] = useState<Mapas>(Mapas.PB);

  const edificio = ConfigurarMapas[mapaSeleccionado];

  return (
  <div>
    <header className="dashboardHeader">
      <div style={{ display: "flex", gap: 8 }}>
        {Object.values(Mapas).map((tipo) => (
          <Button
            key={tipo}
            type="button"
            variant={mapaSeleccionado === tipo ? "primary" : "danger"}
            onClick={() => setMapaSeleccionado(tipo as Mapas)}
          >
            {tipo}
          </Button>
        ))}
      </div>
    </header>

    <section>
      <h3>{edificio.titulo}</h3>

      <Image
        src={edificio.src}
        alt={edificio.titulo}
        width={800}
        height={500}
        useMap={`#${edificio.nombreMapa}`}
      />

      <map name={edificio.nombreMapa}>
        {edificio.areas.map((area, i) => (
          <area
            key={i}
            shape="rect"
            coords={area.coords}
            alt={area.alt}
            href={area.href}
          />
        ))}
      </map>
    </section>
  </div>
);
}