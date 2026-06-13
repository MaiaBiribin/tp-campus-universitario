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
      { coords: "31,28,87,126", alt: "Aula 101", href: "/aulas/101" },
     { coords: "88,27,149,135", alt: "Aula 102", href: "/aulas/102" },
     { coords: "220,25,291,136", alt: "Aula 103", href: "/aulas/103" },
     { coords: "292,18,349,139", alt: "Aula 104", href: "/aulas/104" },
     { coords: "150,35,183,111", alt: "Baños Hombres", href: "/servicios/banos-hombres" },
     { coords: "184,34,219,111", alt: "Baños Mujeres", href: "/servicios/banos-mujeres" },
     { coords: "350,45,387,139", alt: "Escaleras", href: "/planta-alta" },
     { coords: "16,126,67,201", alt: "Patio", href: "/patio" },
     { coords: "16,202,82,303", alt: "Aula 105", href: "/aulas/105" },
     { coords: "101,173,141,303", alt: "Recepción", href: "/administracion/recepcion" },
     { coords: "142,204,191,303", alt: "Información / Administración", href: "/administracion/info" },
     { coords: "192,205,252,307", alt: "Aula 106", href: "/aulas/106" },
     { coords: "253,169,324,307", alt: "Aula 107", href: "/aulas/107" },
     { coords: "325,187,388,307", alt: "Aula 108", href: "/aulas/108" },
     { coords: "69,283,113,315", alt: "Entrada Principal", href: "/entrada" }
    ],
  },

  [Mapas.P1]: {
    titulo: "Primer Piso",
    src: "/mapaP1.png",
    nombreMapa: "primerPiso",
    areas: [
        { coords: "31,35,87,130", alt: "Aula 201", href: "/aulas/201" },
        { coords: "87,31,148,137", alt: "Aula 202", href: "/aulas/202" },
        { coords: "220,27,291,146", alt: "Aula 203", href: "/aulas/203" },
        { coords: "292,21,349,151", alt: "Aula 204", href: "/aulas/204" },
        { coords: "149,38,183,113", alt: "Baños Hombres", href: "/servicios/banos-hombres" },
        { coords: "184,36,219,113", alt: "Baños Mujeres", href: "/servicios/banos-mujeres" },
        { coords: "350,47,387,143", alt: "Escaleras", href: "/planta-baja" },
        { coords: "14,171,96,319", alt: "Aula 208", href: "/aulas/208" },
        { coords: "116,210,184,316", alt: "Información / Administración", href: "/administracion/info" },
        { coords: "184,208,249,316", alt: "Aula 207", href: "/aulas/207" },
        { coords: "249,203,328,316", alt: "Aula 206", href: "/aulas/206" },
        { coords: "329,186,388,316", alt: "Aula 205", href: "/aulas/205" }
    ],
  },

  [Mapas.P2]: {
    titulo: "Segundo Piso",
    src: "/mapaP2.png",
    nombreMapa: "segundoPiso",
    areas: [
        { coords: "53,35,157,137", alt: "Aula 301", href: "/aulas/301" },
        { coords: "228,27,338,151", alt: "Aula 302", href: "/aulas/302" },
        { coords: "158,38,191,113", alt: "Baños Hombres", href: "/servicios/banos-hombres" },
        {coords: "192,36,226,113", alt: "Baños Mujeres", href: "/servicios/banos-mujeres" },
        { coords: "339,47,376,143", alt: "Escaleras", href: "/planta-alta" },
        { coords: "31,171,115,316", alt: "Aula 305", href: "/aulas/305" },
        { coords: "116,197,177,307", alt: "SUM", href: "/sum" },
        { coords: "203,191,279,316", alt: "Aula 304", href: "/aulas/304" },
        { coords: "280,218,376,316", alt: "Aula 303", href: "/aulas/303" },
        { coords: "116,310,200,344", alt: "Balcón", href: "/balcon" }
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
        width={400}
        height={240}
        useMap={`#${edificio.nombreMapa}`}
        style={{width:'400px',height:'240px'}}
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