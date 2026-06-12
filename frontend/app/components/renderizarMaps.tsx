"use client"
 import Image from "next/image"
import { useState } from "react"

 enum Mapas {
   PB="PB",
   P1="P1",
   P2="P2",
}


export default function RenderizarMapas(){
    const [mapa,setMapa]=useState<Mapas>(Mapas.PB)

    
 


    return( 
        <div>
          <div>
            <header>
             <h1>
                Mapa general del lugar:
             </h1>

             <div>
                <button onClick={()=>setMapa(Mapas.PB)}>PB</button>
                <button onClick={()=>setMapa(Mapas.P1)}>P1</button>
                <button onClick={()=>setMapa(Mapas.P2)}>P2</button>
             </div>

            </header>
        </div>

    {
      mapa === Mapas.PB &&

       <div>
         <p>Mapa de Planta Baja:</p>
         <Image src={"/plantaBaja.png"} alt="imagen" useMap="#map" width="400"/>
          <map name="mapaPlantaBaja">
           

          </map>
       </div>
    }

    { mapa ===Mapas.P1 &&
       <div>
         <p>Mapa del primer Piso:</p>
         <Image src={"/primerPiso.png"} alt="imagen" useMap="#map" width="400"/>
           <map name="mapPrimerPiso">

           </map>
       </div>
     }
     { mapa ===Mapas.P2 &&
      <div>
        <p>Mapa del segundo Piso;</p>
         <Image src={"/segundoPiso.png"} alt="imagen" useMap="#map" width="400"></Image>
      </div>
    }

     </div>
    )
}