"use client";

import layout from "@/app/styles/layout.module.css";
import RenderizarMapas from "@/app/components/renderizarMaps";

export default function MapaPage() {
  return (
    <main className={layout.main}>
      <RenderizarMapas />
    </main>
  );
}