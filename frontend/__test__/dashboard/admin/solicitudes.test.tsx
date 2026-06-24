import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SolicitudesAdmin from "@/app/dashboard/admin/solicitudes/page";
import {getUsuariosPendientes,aprobarUsuario,rechazarUsuario} from "@/app/services/usuarios";

jest.mock("@/app/services/usuarios", () => ({
  getUsuariosPendientes: jest.fn(),
  aprobarUsuario: jest.fn(),
  rechazarUsuario: jest.fn(),
}));

describe("SolicitudesAdmin", () => {
  const solicitudMock = {
    id_usuario: 1,
    nombre: "Juan",
    apellido: "Perez",
    mail: "juan@gmail.com",
    dni: "12345678",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("muestra cargando mientras obtiene solicitudes", () => {
    (getUsuariosPendientes as jest.Mock).mockReturnValue(new Promise(() => {}));

    render(<SolicitudesAdmin/>);
    expect(screen.getByText("Cargando solicitudes...")).toBeInTheDocument();
  });

  it("muestra solicitudes pendientes correctamente", async () => {
    (getUsuariosPendientes as jest.Mock).mockResolvedValue([solicitudMock]);
    render(<SolicitudesAdmin/>);

    await waitFor(() => {
      expect(screen.getByText("Solicitudes de registro")).toBeInTheDocument();
      expect(screen.getByText("Juan Perez")).toBeInTheDocument();
      expect(screen.getByText("juan@gmail.com")).toBeInTheDocument();
    });
  });

  it("muestra mensaje cuando no hay solicitudes", async () => {
    (getUsuariosPendientes as jest.Mock).mockResolvedValue([]);
    render(<SolicitudesAdmin/>);

    await waitFor(() => {
      expect(screen.getByText("No hay solicitudes pendientes")).toBeInTheDocument();
    });
  });

  it("aprueba una solicitud correctamente", async () => {
    const user = userEvent.setup();
    (getUsuariosPendientes as jest.Mock).mockResolvedValue([solicitudMock]);
    (aprobarUsuario as jest.Mock).mockResolvedValue({});
    render(<SolicitudesAdmin/>);
    const boton = await screen.findByRole(
      "button",
      {
        name:"Aprobar"
      }
    );

    await user.click(boton);
    expect(aprobarUsuario).toHaveBeenCalledWith(1);
    await waitFor(() => {
      expect(screen.queryByText("Juan Perez")).not.toBeInTheDocument();
    });
  });

  it("rechaza una solicitud correctamente", async () => {

    const user = userEvent.setup();
    (getUsuariosPendientes as jest.Mock)
      .mockResolvedValue([
        solicitudMock
      ]);
    (rechazarUsuario as jest.Mock).mockResolvedValue({});
    render(<SolicitudesAdmin/>);
    const boton = await screen.findByRole(
      "button",
      {
        name:"Rechazar"
      }
    );
    await user.click(boton);
    expect(rechazarUsuario).toHaveBeenCalledWith(1);
    await waitFor(() => {
      expect(screen.queryByText("Juan Perez")).not.toBeInTheDocument();
    });
  });

  it("muestra error si falla cargar solicitudes", async () => {
    (getUsuariosPendientes as jest.Mock).mockRejectedValue(
        new Error("fallo")
      );
    render(<SolicitudesAdmin/>);
    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent("No se pudieron cargar las solicitudes.");
    });
  });

  it("muestra error si falla aprobar una solicitud", async () => {
    const user = userEvent.setup();
    (getUsuariosPendientes as jest.Mock).mockResolvedValue([solicitudMock]);
    (aprobarUsuario as jest.Mock).mockRejectedValue(new Error("fallo"));
    render(<SolicitudesAdmin/>);

    const boton = await screen.findByRole(
      "button",
      {
        name:"Aprobar"
      }
    );
    await user.click(boton);
    await waitFor(() => {
      expect(screen.getByRole("alert"
        )).toHaveTextContent("No se pudo aprobar la solicitud.");
    });
  });

  it("muestra error si falla rechazar una solicitud", async () => {
    const user = userEvent.setup();
    (getUsuariosPendientes as jest.Mock)
      .mockResolvedValue([
        solicitudMock
      ]);
    (rechazarUsuario as jest.Mock).mockRejectedValue(new Error("fallo"));
    render(<SolicitudesAdmin/>);
    const boton = await screen.findByRole(
      "button",
      {
        name:"Rechazar"
      }
    );
    await user.click(boton);
    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent("No se pudo rechazar la solicitud.");
    });
  });
});