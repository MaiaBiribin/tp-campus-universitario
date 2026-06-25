import { render, screen } from "@testing-library/react";
import Avisos from "@/app/dashboard/docente/avisos/nuevo/page";

// MOCKEAMOS EL COMPONENTE INTERNO DEL FORMULARIO
jest.mock("@/app/components/crearAviso", () => {
  return function MockCrearAviso() {
    return <div data-testid="mock-crear-aviso">Creación de Aviso</div>;
  };
});

describe("Página Nuevo Aviso", () => {
  it("debería renderizar el contenedor principal, los títulos y el formulario de creación", () => {
    render(<Avisos />);

    
    const contenedorMain = screen.getByRole("main");
    expect(contenedorMain).toBeInTheDocument();

    
    const titulo = screen.getByRole("heading", { level: 1, name: "Crear aviso" });
    expect(titulo).toBeInTheDocument();

    
    const descripcion = screen.getByText(/Informá a los estudiantes sobre cambios/i);
    expect(descripcion).toBeInTheDocument();

    
    const formulario = screen.getByTestId("mock-crear-aviso");
    expect(formulario).toBeInTheDocument();
    expect(screen.getByText("Creación de Aviso")).toBeInTheDocument();
  });
});