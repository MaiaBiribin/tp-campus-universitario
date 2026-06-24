import Button from "@/app/components/ui/button";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Button", () => {
  it("debe renderizar correctamente con children", () => {
    render(<Button>Guardar</Button>);
    expect(screen.getByRole("button", { name: "Guardar" })).toBeInTheDocument();
  });

  it("debe usar type submit por defecto", () => {
    render(<Button>Enviar</Button>);
    const button = screen.getByRole("button", { name: "Enviar" });
    expect(button).toHaveAttribute("type", "submit");
  });

  it("debe permitir cambiar el type a button", () => {
    render(
      <Button type="button">
        Click
      </Button>
    );

    const button = screen.getByRole("button", { name: "Click" });

    expect(button).toHaveAttribute("type", "button");
  });

  it("debe aplicar variant primary por defecto", () => {
    render(<Button>OK</Button>);

    const button = screen.getByRole("button", { name: "OK" });

    expect(button.className).toContain("primary");
  });

  it("debe aplicar variant danger", () => {
    render(<Button variant="danger">Eliminar</Button>);

    const button = screen.getByRole("button", { name: "Eliminar" });
    expect(button.className).toContain("danger");
  });

  it("debe ejecutar onClick cuando se hace click", () => {
    const handleClick = jest.fn();

    render(
      <Button onClick={handleClick}>
        Click
      </Button>
    );

    const button = screen.getByRole("button", { name: "Click" });

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("no debe romper si no tiene onClick", () => {
    render(<Button>Sin click</Button>);

    const button = screen.getByRole("button", { name: "Sin click" });
    expect(() => fireEvent.click(button)).not.toThrow();
  });
});