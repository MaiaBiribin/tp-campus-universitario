import EditarAviso from "@/app/components/editarAviso";
import layout from "@/app/styles/layout.module.css";
import dashboard from "@/app/styles/dashboard.module.css";
import { use } from "react";

/**
 * Página de edición de aviso.
 * Extrae el ID desde los parámetros de ruta y renderiza el formulario de edición.
 * @param {{ params: Promise<{ id: string }> }} props
 * @returns {JSX.Element} Vista de edición o mensaje de error si el ID es inválido.
 * @throws {Error} Puede fallar si el parámetro `id` no es un número válido.
 */
export default function Page(props: {params: Promise<{ id: string }>}) {
  const { id } = use(props.params);
  const idAviso = parseInt(id, 10);

  if (!Number.isFinite(idAviso)) {
    return <p>ID inválido</p>;
  }

  return (
    <main className={layout.main}>
      <div className={layout.content}>
        <header className={dashboard.header}>
          <h1>Editar aviso</h1>
          <p>Modificá el mensaje del aviso.</p>
        </header>

        <EditarAviso idAviso={idAviso} />
      </div>
    </main>
  );
}