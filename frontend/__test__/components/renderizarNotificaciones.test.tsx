import RenderizarNotifiaciones from "@/app/components/renderizarNotificaciones";
import { render, screen, waitFor } from "@testing-library/react";
import { Notificacion } from "@/app/types/entidades";
import userEvent from "@testing-library/user-event";
import {TraerTodasNotificaciones,NotificacionLeida,NotificacionLeidas,} from "@/app/services/notificaciones";

jest.mock("@/app/services/notificaciones", () => ({
  TraerTodasNotificaciones: jest.fn(),
  NotificacionLeida: jest.fn(),
  NotificacionLeidas: jest.fn(),
}));

describe("componente renderizacion de notificaciones", () => {
  const mockNotificacion: Notificacion = {
    id_notificacion: 23,
    mensaje: "tenemos clase virtual",
    fecha_creacion: "2026-06-24",
    leida: false,
    evento: {
      id_evento: 21,
      titulo: "clase de ingles",
      fecha: "2026-06-23",
      horaInicio: "19:00",
      horaFin: "21:30",
      estado: "habilitado",
      aula: {
        id_aula: 9,
        nombre: "205",
        capacidad: 20,
        piso: 2,
        ubicacion: "al fondo"
      },
      materia: {
        id_materia: 10,
        nombre: "ingles",
        carrera: {
          id_carrera: 4,
          nombre: "tecnicatura en sistemas"
        }
      },
      tipoEvento: {
        id_tipo_evento: 40,
        nombre: "clase"
      }
    } as any
  };
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  })
  afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

  it("deberia poder renderizar la lista de notificaciones", async () => {
    (TraerTodasNotificaciones as jest.Mock).mockResolvedValue([mockNotificacion]);
    render(<RenderizarNotifiaciones/>);
    await waitFor(() => {
      expect(
        screen.getByRole(
          "button",
          {
            name:/Marcar todas como leídas/i
          }
        )
      ).toBeInTheDocument();
      expect(
        screen.getByRole(
          "heading",
          {
            level:3,
            name:/clase de ingles/i
          }
        )
      ).toBeInTheDocument();
    });
  });

  it("deberia marcar una notificacion como leida", async () => {
    const usuario = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
    (TraerTodasNotificaciones as jest.Mock).mockResolvedValue([mockNotificacion]);
    const mockLeidaNotificacion = {
      ...mockNotificacion,
      leida:true
    };
    (NotificacionLeida as jest.Mock).mockResolvedValue(mockLeidaNotificacion);
    render(<RenderizarNotifiaciones/>);
    const boton = await screen.findByRole(
      "button",
      {
        name:/Marcar leída/i
      }
    );
    await usuario.click(boton);
    expect(NotificacionLeida).toHaveBeenCalledWith(23);
    await waitFor(() => {
      expect(
        screen.queryByRole(
          "button",
          {
            name:/Marcar leída/i
          }
        )
      )
      .not
      .toBeInTheDocument();
    });
  });

  it("muestra mensaje de error si falla cargar notificaciones", async () => {

    (TraerTodasNotificaciones as jest.Mock).mockRejectedValue(new Error("fallo"));

    render(<RenderizarNotifiaciones/>);
    await waitFor(() => {
      expect(
        screen.getByText(/No se pudieron cargar las notificaciones/i)).toBeInTheDocument();
    });
  });
});