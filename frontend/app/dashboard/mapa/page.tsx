"use client";

import layout from "@/app/styles/layout.module.css";
import RenderizarMapas from "@/app/components/renderizarMaps";
/**
 * Renderiza la página de mapas del edificio.
 * @returns {JSX.Element} Vista con los mapas interactivos.
 */
export default function MapaPage() {
  return (
    <main className={layout.main}>
      <RenderizarMapas />
    </main>
  );
}