import { render, screen } from "@testing-library/react";
import NavLinks from "@/app/components/ui/navLinks";
import { CantidadNotificacionesSinLeer } from "@/app/services/notificaciones";
import { usePathname } from "next/navigation";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

jest.mock("@/app/services/notificaciones", () => ({
  CantidadNotificacionesSinLeer: jest.fn(),
}));

describe("NavLinks", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debe renderizar links de admin", () => {
    (usePathname as jest.Mock).mockReturnValue("/dashboard/admin");

    render(<NavLinks role="admin" />);

    expect(screen.getByText("Inicio")).toBeInTheDocument();
    expect(screen.getByText("Solicitudes")).toBeInTheDocument();
    expect(screen.getByText("Eventos")).toBeInTheDocument();
  });

  it("debe marcar el link activo", () => {
    (usePathname as jest.Mock).mockReturnValue("/dashboard/admin");

    render(<NavLinks role="admin" />);

    const link = screen.getByText("Inicio");

    expect(link.className).toContain("active");
  });

  it("debe mostrar contador de notificaciones para estudiante", async () => {
    (usePathname as jest.Mock).mockReturnValue("/dashboard/estudiante");

    (CantidadNotificacionesSinLeer as jest.Mock).mockResolvedValue(5);

    render(<NavLinks role="estudiante" />);

    expect(
      await screen.findByText("Notificaciones (5)")
    ).toBeInTheDocument();
  });

  it("debe mostrar notificaciones sin contador si es 0", async () => {
    (usePathname as jest.Mock).mockReturnValue("/dashboard/estudiante");

    (CantidadNotificacionesSinLeer as jest.Mock).mockResolvedValue(0);

    render(<NavLinks role="estudiante" />);

    expect(
      await screen.findByText("Notificaciones")
    ).toBeInTheDocument();
  });

it("debe mostrar mensaje de error si falla la carga de notificaciones", async () => {
  (usePathname as jest.Mock).mockReturnValue("/dashboard/estudiante");
  (CantidadNotificacionesSinLeer as jest.Mock).mockRejectedValue(
    new Error("error")
  );
  render(<NavLinks role="estudiante" />);
  expect(await screen.findByText("No se pudieron cargar las notificaciones.")).toBeInTheDocument();
});
});