import { render, screen, waitFor } from "@testing-library/react";
import { getEventosSemana } from "@/app/services/eventos";
import EventosSemanaView from "@/app/components/eventoSemanaView";

jest.mock("@/app/services/eventos",()=>({
  getEventosSemana:jest.fn()
}));
jest.mock("@/app/components/renderizarEventosSemana",()=>({
  __esModule:true,
  default:({eventos}:any)=>(
    <div data-testid="render-eventos">
      {eventos.map((evento:any)=>(
        <p key={evento.id_evento}>
          {evento.titulo}
        </p>
      ))}
    </div>
  )
}));

describe("EventosSemanaView",()=>{
  beforeEach(()=>{jest.clearAllMocks();});


  it("muestra el titulo y descripcion correctamente",()=>{

    (getEventosSemana as jest.Mock).mockReturnValue(new Promise(()=>{}));
    render(
      <EventosSemanaView
        titulo="Eventos de la semana"
        descripcion="Estos son tus eventos próximos"
      />
    );
    expect(
      screen.getByRole("heading",{
        name:"Eventos de la semana"
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Estos son tus eventos próximos"
      )
    ).toBeInTheDocument();
  });

  it("muestra cargando mientras espera los eventos",()=>{
    (getEventosSemana as jest.Mock).mockReturnValue(new Promise(()=>{}));
    render(
      <EventosSemanaView
        titulo="Semana"
      />
    );
    expect(screen.getByText("Cargando...")).toBeInTheDocument();
  });

  it("carga eventos correctamente y los manda al componente hijo",async()=>{
    const eventosMock=[
      {
        id_evento:1,
        titulo:"Parcial de BD",
        fecha:"2026-06-20",
        horaInicio:"10:00"
      },
      {
        id_evento:2,
        titulo:"Clase Programacion",
        fecha:"2026-06-21",
        horaInicio:"18:00"
      }
    ];

    (getEventosSemana as jest.Mock).mockResolvedValue(eventosMock);

    render(
      <EventosSemanaView
        titulo="Eventos"
        descripcion="Semana actual"
      />
    );

    await waitFor(()=>{
      expect(screen.getByTestId("render-eventos")).toBeInTheDocument();
    });
    expect(
      screen.getByText(
        "Parcial de BD"
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Clase Programacion")).toBeInTheDocument();
    expect(getEventosSemana).toHaveBeenCalledTimes(1);
  });

  it("manda un array vacío si no hay eventos",async()=>{
    (getEventosSemana as jest.Mock).mockResolvedValue([]);
    render(
      <EventosSemanaView
        titulo="Sin eventos"
      />
    );
    await waitFor(()=>{
      expect(screen.getByTestId("render-eventos")).toBeInTheDocument();
    });
    expect(screen.queryByText("Cargando...")).not.toBeInTheDocument();
  });

  it("muestra mensaje de error cuando falla la carga",async()=>{

  (getEventosSemana as jest.Mock).mockRejectedValue(new Error("fallo"));

  render(<EventosSemanaView
    titulo="Eventos"
    />
  );

  await waitFor(()=>{
    expect(screen.getByText("No se pudieron cargar los eventos de la semana.")
    )
    .toBeInTheDocument();
  });


  expect(getEventosSemana).toHaveBeenCalledTimes(1);});

  it("no muestra descripcion cuando no viene",()=>{

    (getEventosSemana as jest.Mock).mockReturnValue(new Promise(()=>{}));
    render(
      <EventosSemanaView
        titulo="Prueba"
      />
    );

    expect(screen.getByRole("heading",{name:"Prueba"})).toBeInTheDocument();
    expect(screen.queryByText("Estos son tus eventos próximos")).not.toBeInTheDocument();
  });

  it("no renderiza eventos si ocurre un error",async()=>{
  (getEventosSemana as jest.Mock).mockRejectedValue(new Error());

  render(
    <EventosSemanaView
      titulo="Eventos"
    />
  );

  await waitFor(()=>{
    expect(screen.queryByTestId("render-eventos")).not.toBeInTheDocument();

  });});
});