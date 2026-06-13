"use client";

import { useState } from "react";
import { Notificacion } from "../types/entidades";

type Notificar=[
    notificaciones:Notificacion
]

export default function renderizarNotifiaciones(){
    const [Notificaciones,setNotificaciones]= useState<Notificar[] | null>()
    
    async function TraerNotificaciones() {
    
   }
   
   
    return(
    <div>

    </div>
   )
}