<<<<<<< HEAD
"use client";
import { useState,useEffect } from "react";
import usario from "./entidades";
import { start } from "node:repl";

export default function renderizarHome(){
    
 async function RenderizarEventosDia(){

 }

  async function RenderzarEventosSemana() {
    
  }

}
     
=======
import { api } from "./api";

export async function getCarreras() {
  const res = await api("/carreras");

  if (!res.ok) {
    throw new Error("Error cargando carreras");
  }

  return res.json();
}

export async function getMateriasPorCarrera(id: number) {
  const res = await api(`/materias/carrera/${id}`);

  if (!res.ok) {
    throw new Error("Error cargando materias");
  }

  return res.json();
}
>>>>>>> 21b814dffbd64ee84a2a8ff0fe34d0a131b3a0a9
