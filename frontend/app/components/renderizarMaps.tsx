"use client"
 import Image from "next/image"
import { useState } from "react"

 enum Mapas {
   PB="PB",
   P1="P1",
   P2="P2",
}

interface AreaMapa{
  cordenadas:string;
  alt:string
  href:string
}

interface DatosMapa{
  titulo:string
  src:string
  NombreMapa:string
  areas:AreaMapa[]
}

const ConfigurarMapas:Record<Mapas,DatosMapa>={
  [Mapas.PB]:{
     titulo:"Mapa de planta Baja",
     src:"/plantaBaja.png",
     NombreMapa:"plantaBaja",
     areas:[
      { cordenadas: "78,80,217,315", alt: "Aula 101", href: "/aulas/101" },
      { cordenadas: "218,70,371,338", alt: "Aula 102", href: "/aulas/102" },
      { cordenadas: "550,68,728,340", alt: "Aula 103", href: "/aulas/103" },
      { cordenadas: "731,52,875,348", alt: "Aula 104", href: "/aulas/104" },
      { cordenadas: "373,88,460,278", alt: "Baños Hombres", href: "/servicios/banos-hombres" },
      { cordenadas: "461,86,547,278", alt: "Baños Mujeres", href: "/servicios/banos-mujeres" },
      { cordenadas: "876,114,967,348", alt: "Escaleras", href: "/planta-alta" },
      { cordenadas: "41,316,169,503", alt: "Patio", href: "/patio" },
      { cordenadas: "39,505,206,757", alt: "Aula 105", href: "/aulas/105" },
      { cordenadas: "254,435,355,753", alt: "Recepción", href: "/administracion/recepcion" },
      { cordenadas: "357,510,479,753", alt: "Información / Administración", href: "/administracion/info" },
      { cordenadas: "481,513,631,765", alt: "Aula 106", href: "/aulas/106" },
      { cordenadas: "631,424,809,765", alt: "Aula 107", href: "/aulas/107" },
      { cordenadas: "812,467,969,765", alt: "Aula 108", href: "/aulas/108" },
     ],  
  },
  [Mapas.P1]:{
    titulo:"Mapa del primer piso",
    src:"/primerPiso.png",
    NombreMapa:"primerPiso",
    areas:[
     { cordenadas: "31,35,87,130", alt: "Aula 201", href: "/aulas/201" },
     { cordenadas: "87,31,148,137", alt: "Aula 202", href: "/aulas/202" },
     { cordenadas: "220,27,291,146", alt: "Aula 203", href: "/aulas/203" },
     { cordenadas: "292,21,349,151", alt: "Aula 204", href: "/aulas/204" },
     { cordenadas: "149,38,183,113", alt: "Baños Hombres", href: "/servicios/banos-hombres" },
     { cordenadas: "184,36,219,113", alt: "Baños Mujeres", href: "/servicios/banos-mujeres" },
     { cordenadas: "350,47,387,143", alt: "Escaleras", href: "/planta-baja" },
     { cordenadas: "14,171,96,319", alt: "Aula 208", href: "/aulas/208" },
     { cordenadas: "116,210,184,316", alt: "Información / Administración", href: "/administracion/info" },
     { cordenadas: "184,208,249,316", alt: "Aula 207", href: "/aulas/207" },
     { cordenadas: "249,203,328,316", alt: "Aula 206", href: "/aulas/206" },
     { cordenadas: "329,186,388,316", alt: "Aula 205", href: "/aulas/205" },
    ],
  },
  [Mapas.P2]:{
    titulo:"Mapa del segundo piso",
    src:"/segundoPiso.png",
    NombreMapa:"segundoPiso",
    areas:[
      { cordenadas: "53,35,157,137", alt: "Aula 301", href: "/aulas/301" },
      { cordenadas: "228,27,338,151", alt: "Aula 302", href: "/aulas/302" },
      { cordenadas: "158,38,191,113", alt: "Baños Hombres", href: "/servicios/banos-hombres" },
      { cordenadas: "192,36,226,113", alt: "Baños Mujeres", href: "/servicios/banos-mujeres" },
      { cordenadas: "339,47,376,143", alt: "Escaleras", href: "/planta-alta" },
      { cordenadas: "31,171,115,316", alt: "Aula 305", href: "/aulas/305" },
      { cordenadas: "116,197,177,307", alt: "SUM", href: "/sum" },
      { cordenadas: "203,191,279,316", alt: "Aula 304", href: "/aulas/304" },
      { cordenadas: "280,218,376,316", alt: "Aula 303", href: "/aulas/303" },
      { cordenadas: "116,310,200,344", alt: "Balcón", href: "/balcon" },
    ],
  }
}

export default function RenderizarMapas(){
    const [mapaSeleccionado,setMapaSeleccionado]=useState<Mapas>(Mapas.PB)

   const edificio=ConfigurarMapas[mapaSeleccionado]
    
 return(
    <div>
       <header>
        <h1>Mapa general del edificio:</h1>
        {Object.values(Mapas).map((tipo) => (
            <button 
              key={tipo} 
              onClick={() => setMapaSeleccionado(tipo)}
              style={{ fontWeight: mapaSeleccionado === tipo ? 'bold' : 'normal', margin: '0 5px' }}
            >
              {tipo}
            </button>
        ))}
       </header>
     
     <div>
       <p>{edificio.titulo}</p>
       <Image
        src={edificio.src}
        alt={edificio.titulo}
        width={400}
        height={240}
        useMap={`#${edificio.NombreMapa}`}
       /> 


        <map name={edificio.NombreMapa}>
          {edificio.areas.map((area, index) => (
            <area
              key={index}
              shape="rect"
              coords={area.cordenadas}
              alt={area.alt}
              title={area.alt}
              href={area.href}
             />
          ))}
          </map>
     </div>

    </div>
 )
}