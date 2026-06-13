"use client";

import { useState } from "react";
import Button from "./ui/button";
import InfoAula from "./infoAula";


enum Mapas {
  PB = "PB",
  P1 = "P1",
  P2 = "P2",
}
interface AreaMapa {
  coords: string;
  alt: string;
  aulaId: number;
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
      {
        coords:"51,58,198,52,198,198,141,198,141,201,51,200",
        alt: "Aula 101",
        aulaId: 13
      },
      {
        coords:"198,52,341,42,341,208,241,208,241,199,198,199",
        alt: "Aula 102",
        aulaId: 14
      },
      {
        coords:"512,47,714,36,714,199,518,214,518,166,512,166",
        alt: "Aula 103",
        aulaId: 15
      },
      {
        coords:"715,36,824,30,824,210,754,210,754,199,715,199",
        alt: "Aula 104",
        aulaId: 16
      },
      {
        coords:"46,312,194,312,194,408,168,408,168,441,134,441,134,476,46,476",
        alt: "Aula 105",
        aulaId: 17
      },
      {
        coords:"462,319,579,319,589,479,442,479,442,319",
        alt: "Aula 106",
        aulaId: 18
      },
      {
        coords:"649,268,755,293,755,479,595,479,577,320,623,320,634,268",
        alt: "Aula 107",
        aulaId: 19
      },
      {
        coords:"755,293,889,313,889,479,756,479",
        alt: "Aula 108",
        aulaId: 20
      },
    ],
  },
  [Mapas.P1]: {
    titulo: "Primer Piso",
    src: "/mapaP1.png",
    nombreMapa: "primerPiso",
    areas: [
      {
        coords:"86,49,231,49,231,261,202,261,202,248,86,248",
        alt: "Aula 201",
        aulaId: 21
      },
      {
        coords:"232,49,394,39,394,261,266,261,266,248,232,248",
        alt: "Aula 202",
        aulaId: 22
      },
      {
        coords:
        "589,39,789,33,789,248,674,270,605,264,605,248,589,248",
        alt: "Aula 203",
        aulaId: 23
      },
      {
        coords:
        "790,33,935,33,935,270,815,270,815,248,790,248",
        alt: "Aula 204",
        aulaId: 24
      },
      {
        coords:
        "877,324,1037,350,1037,558,877,558",
        alt: "Aula 205",
        aulaId: 25
      },
      {
        coords:
        "710,290,876,323,876,558,710,558",
        alt: "Aula 206",
        aulaId: 26
      },
      {
        coords:
        "565,308,709,349,709,558,492,558,492,366,550,366",
        alt: "Aula 207",
        aulaId: 27
      },
      {
        coords:
        "37,337,257,301,257,432,230,432,230,471,209,471,209,558,37,558",
        alt: "Aula 208",
        aulaId: 28
      },
    ],
  },

  [Mapas.P2]: {
    titulo: "Segundo Piso",
    src: "/mapaP2.png",
    nombreMapa: "segundoPiso",

    areas: [
      {
        coords:"143,33,418,33,418,249,331,249,331,229,294,229,294,249,219,249,219,229,143,229",
        alt: "Aula 301",
        aulaId: 29
      },
      {
        coords:
        "587,34,904,33,904,261,640,261,640,249,587,249",
        alt: "Aula 302",
        aulaId: 30
      },
      {
        coords:
        "777,383,995,431,995,560,742,560,742,383",
        alt: "Aula 303",
        aulaId: 31
      },
      {
        coords:
        "546,360,742,406,742,560,539,560",
        alt: "Aula 304",
        aulaId: 32
      },
      {
        coords:
        "80,338,284,299,284,544,80,544",
        alt: "Aula 305",
        aulaId: 33
      },
    ],
  },
};



export default function RenderizarMapas() {

  const [mapaSeleccionado,setMapaSeleccionado] =useState<Mapas>(Mapas.PB);
  const [aulaSeleccionada,setAulaSeleccionada] =useState<number | null>(null);
  const edificio =ConfigurarMapas[mapaSeleccionado];

  return (
    <div>
      <header className="dashboardHeader">
        <div
          style={{
            display:"flex",
            gap:8
          }}
        >
          {Object.values(Mapas).map((tipo)=>(
            <Button
              key={tipo}
              type="button"
              variant={
                mapaSeleccionado === tipo
                ? "primary"
                : "danger"
              }
              onClick={()=>{
                setMapaSeleccionado(tipo);
                setAulaSeleccionada(null);
              }}
            >
              {tipo}
            </Button>
          ))}
        </div>
      </header>
      <section>
        <h3>{edificio.titulo}</h3>
        <img
        id="mapaImagen"
        src={edificio.src}
        alt={edificio.titulo}
        useMap={`#${edificio.nombreMapa}`}
        style={{
          width:"100%",
          height:"auto"
          }}
          />

        <map name={edificio.nombreMapa}>
          {edificio.areas.map((area,i)=>(
            <area
            key={i}
            shape="poly"
            tabIndex={0}
            coords={area.coords}
            alt={area.alt}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setAulaSeleccionada(area.aulaId);
              }}
              />
          ))}
        </map>
        {
          aulaSeleccionada && (
            <InfoAula
              aulaId={aulaSeleccionada}
            />
          )
        }
      </section>
    </div>
  );
}