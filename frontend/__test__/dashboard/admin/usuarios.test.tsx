import { render, screen, waitFor } from "@testing-library/react";
import UsuariosAdmin from "@/app/dashboard/admin/usuarios/page";
import { getUsuariosHabilitados } from "@/app/services/usuarios";

jest.mock("@/app/services/usuarios", () => ({
  getUsuariosHabilitados: jest.fn(),
}));

describe("UsuariosAdmin", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("muestra cargando mientras obtiene usuarios", () => {
    (getUsuariosHabilitados as jest.Mock).mockReturnValue(new Promise(() => {}));
    render(<UsuariosAdmin />);
    expect(
      screen.getByText("Cargando usuarios...")
    ).toBeInTheDocument();
  });

  it("muestra los usuarios habilitados correctamente", async () => {
    const usuariosMock = [
      {
        id_usuario: 1,
        nombre: "Juan",
        apellido: "Perez",
        mail: "juan@gmail.com",
        dni: "12345678",
        rol: {
          nombre: "Administrador"
        }
      },
      {
        id_usuario: 2,
        nombre: "Ana",
        apellido: "Gomez",
        mail: "ana@gmail.com",
        dni: "87654321",
        rol: {
          nombre: "Alumno"
        }
      }
    ];
    (getUsuariosHabilitados as jest.Mock).mockResolvedValue(usuariosMock);
    render(
      <UsuariosAdmin />
    );
    await waitFor(() => {
      expect(screen.getByText("Usuarios habilitados")).toBeInTheDocument();
    });
    expect(screen.getByText("Juan")).toBeInTheDocument();

    expect(screen.getByText("Perez")).toBeInTheDocument();
    expect(
      screen.getByText("Administrador")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Ana")
    ).toBeInTheDocument();
    expect(screen.getByText("Alumno")).toBeInTheDocument();
    expect(getUsuariosHabilitados).toHaveBeenCalledTimes(1);
  });

  it("muestra mensaje cuando no hay usuarios habilitados", async () => {
    (getUsuariosHabilitados as jest.Mock).mockResolvedValue([]);

    render(<UsuariosAdmin />);
    await waitFor(() => {
      expect(screen.getByText("No hay usuarios habilitados")).toBeInTheDocument();
    });
  });

  it("muestra mensaje de error si falla la carga", async () => {
    (getUsuariosHabilitados as jest.Mock)
      .mockRejectedValue(
        new Error("fallo")
      );
    render(<UsuariosAdmin />);
    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent("No se pudieron cargar los usuarios habilitados.");
    });
  });
});