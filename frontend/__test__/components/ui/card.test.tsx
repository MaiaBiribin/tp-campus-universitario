import { render, screen } from "@testing-library/react";
import Card from "@/app/components/ui/card";

describe("Card", () => {
  it("debe renderizar children correctamente", () => {
    render(
      <Card>
        <p>Contenido</p>
      </Card>
    );

    expect(screen.getByText("Contenido")).toBeInTheDocument();
  });

  it("debe renderizar el contenedor card", () => {
    render(<Card>Test</Card>);

    expect(screen.getByTestId("card")).toBeInTheDocument();
  });

  it("debe agregar className adicional si se pasa", () => {
    render(<Card className="extra-class">Hola</Card>);

    const container = screen.getByTestId("card");

    expect(container).toHaveClass("extra-class");
  });

  it("debe renderizar sin romper si no se pasa className", () => {
    render(<Card>Sin clase</Card>);

    expect(screen.getByText("Sin clase")).toBeInTheDocument();
  });
});