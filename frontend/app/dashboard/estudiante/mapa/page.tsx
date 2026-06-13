"use client";

import Link from "next/link";
import layout from "@/app/styles/layout.module.css";


import RenderizarMapas from "@/app/components/renderizarMaps";

export default function zonaMapa(){
 return (
    <main className={layout.main}>
       <RenderizarMapas/>
       <div>
         <Link href={"/estudiantes"}><button>Volver a pagina principal de la cuenta</button></Link>
       </div>
     </main>
 
    )
}