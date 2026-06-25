"use client";

import layout from "@/app/styles/layout.module.css";
import RenderizarMapas from "@/app/components/renderizarMaps";
/**
 * la pagina donde los usuarios pueden ver los varios mapas del edificio
 * los usuarios pueden clickear las distintas aulas para ver el estado de esa aula
 * @returns {JSX.Element} vista de los mapas
 */
export default function MapaPage() {
  return (
    <main className={layout.main}>
      <RenderizarMapas />
    </main>
  );
}