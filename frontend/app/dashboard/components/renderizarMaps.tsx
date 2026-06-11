"use client"
 import Image from "next/image"

export default function RenderizarMapas(){
    
 async function MostrarPlantaBaja(){

 }

    
 async function MostrarPrimerPiso(){
    
 }

    
 async function MostrarSegundoPiso(){
    
 }


    return( 
        <div>
          <div>
            <header>
             <h1>
                Mapa general del lugar:
             </h1>

             <div>
                <button>PB</button>
                <button>P1</button>
                <button>P2</button>
             </div>

            </header>
        </div>

       <div>
         <p>Mapa de Planta Baja:</p>
         <Image src={"/plantaBaja.png"} alt="imagen" useMap="#map" width="400"/>
          <map name="mapaPlantaBaja">
         

          </map>
       </div>

       <div>
         <p>Mapa del primer Piso:</p>
         <Image src={"/primerPiso.png"} alt="imagen" useMap="#map" width="400"/>
           <map name="mapPrimerPiso">

           </map>
       </div>

      <div>
        <p>Mapa del segundo Piso;</p>
         <Image src={"/segundoPiso.png"} alt="imagen" useMap="#map" width="400"></Image>
      </div>
  

     </div>
    )
}