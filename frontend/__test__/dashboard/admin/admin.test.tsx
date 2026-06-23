import { render, screen, waitFor } from "@testing-library/react";
import { getEventos } from "@/app/services/eventos";
import { getUsuariosPendientes } from "@/app/services/usuarios";
import DashboardAdmin from "@/app/dashboard/admin/page";

jest.mock(
  "@/app/services/eventos",
  () => ({
    getEventos: jest.fn(),
  })
);
jest.mock(
  "@/app/services/usuarios",
  () => ({
    getUsuariosPendientes: jest.fn(),
  })
);
jest.mock(
  "next/link",
  () => {
    return function MockLink({
      children,
      href,
      className,
    }: {
      children: React.ReactNode;
      href: string;
      className?: string;
    }) {
      return (
        <a
          href={href}
          className={className}
        >
          {children}
        </a>
      );
    };
  }
);
const mockGetEventos =getEventos as jest.Mock;
const mockGetUsuariosPendientes =getUsuariosPendientes as jest.Mock;

describe(
  "DashboardAdmin",
  () => {

    beforeEach(() => {
      jest.clearAllMocks();
      jest
        .useFakeTimers()
        .setSystemTime(
          new Date(
            "2026-06-22T10:00:00Z"
          )
        );
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it(
      "debería mostrar las métricas correctamente",
      async () => {
        mockGetUsuariosPendientes.mockResolvedValue([
          {
            id_usuario: 1,
          },
          {
            id_usuario: 2,
          },
        ]);
        mockGetEventos.mockResolvedValue([
          {
            id_evento: 1,
            fecha: "2026-06-22",
            aula: {
              id_aula: 1,
            },
          },
          {
            id_evento: 2,
            fecha: "2026-06-22",
            aula: {
              id_aula: 2,
            },
          },
          {
            id_evento: 3,
            fecha: "2026-06-22",
            aula: {
              id_aula: 1,
            },
          },
          {
            id_evento: 4,
            fecha: "2026-06-25",
            aula: {
              id_aula: 3,
            },
          },
        ]);
        render(
          <DashboardAdmin />
        );
        expect(
          screen.getByText(
            "Panel de administración"
          )
        ).toBeInTheDocument();
        await waitFor(() => {
          const metricas =screen.getAllByRole("heading",
            {level: 3,});
            expect(metricas[0]).toHaveTextContent("3");
            expect(metricas[1]).toHaveTextContent("2");
            expect(metricas[2]).toHaveTextContent("2");
          });
          expect(screen.getByText("Eventos hoy")).toBeInTheDocument();
          expect(
          screen.getByText("Solicitudes pendientes")).toBeInTheDocument();
          expect(screen.getByText("Aulas ocupadas")).toBeInTheDocument();
      }
    );

    it(
      "debería renderizar accesos rápidos",
      async () => {
        mockGetEventos.mockResolvedValue([]);
        mockGetUsuariosPendientes.mockResolvedValue(
          []
        );
        render(
          <DashboardAdmin />
        );
        expect(
          await screen.findByText(
            "Crear evento"
          )
        ).toBeInTheDocument();
        expect(
          screen.getByText(
            "Académico"
          )
        ).toBeInTheDocument();
        expect(
          screen.getByRole(
            "link",
            {
              name:
                /crear evento/i,
            }
          )
        ).toHaveAttribute(
          "href",
          "/dashboard/admin/eventos/nuevo"
        );
        expect(
          screen.getByRole(
            "link",
            {
              name:
                /académico/i,
            }
          )
        ).toHaveAttribute(
          "href",
          "/dashboard/admin/academico"
        );
      }
    );

    it(
      "debería mostrar ceros si no hay datos",
      async () => {
        mockGetEventos.mockResolvedValue(
          []
        );
        mockGetUsuariosPendientes.mockResolvedValue(
          []
        );
        render(
          <DashboardAdmin />
        );
        await waitFor(() => {
          const metricas =screen.getAllByText("0");
          expect(metricas).toHaveLength(3);
        });
      }
    );
  }
);