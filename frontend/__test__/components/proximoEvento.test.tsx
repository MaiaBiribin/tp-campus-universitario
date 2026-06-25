import { render, screen, waitFor } from "@testing-library/react";
import ProximoEvento from "@/app/components/proximoEvento";
import { getEventos } from "@/app/services/eventos";

jest.mock("@/app/services/eventos",()=>({
  getEventos:jest.fn()
}));

describe("Componente ProximoEvento",()=>{
  beforeEach(()=>{
  jest.clearAllMocks();

  jest.useFakeTimers()
    .setSystemTime(
      new Date("2026-06-20T10:00:00")
    );
});
  afterEach(()=>{
  jest.useRealTimers();
});

  it("muestra evento proximo correctamente",async()=>{
  const eventosMock=[
    {
      id_evento:1,
      titulo:"Evento futuro",
      fecha:"2026-06-25",
      horaInicio:"12:00",
      horaFin:"14:00",
      aula:{
        nombre:"Aula 101"
      }
    },
    {
      id_evento:2,
      titulo:"Evento lejano",
      fecha:"2026-07-01",
      horaInicio:"15:00",
      horaFin:"17:00",
      aula:{
        nombre:"Aula 202"
      }
    }
  ];
  (getEventos as jest.Mock).mockResolvedValue(eventosMock);
  render(
    <ProximoEvento
      rutaBase="/eventos"
      label="Próximo evento"
    />
  );
  await waitFor(()=>{
    expect(
      screen.getByText("Evento futuro")
    ).toBeInTheDocument();
  });
  expect(
    screen.getByText("Próximo evento")
  ).toBeInTheDocument();
  expect(
    screen.getByText((content)=>content.includes("2026-06-25"))
  ).toBeInTheDocument();
  expect(
    screen.getByText((content)=>content.includes("12:00") && content.includes("14:00"))
  ).toBeInTheDocument();
  expect(
    screen.getByText((content)=>content.includes("Aula 101"))
  ).toBeInTheDocument();
  expect(getEventos).toHaveBeenCalledTimes(1);
});

  it("elige el evento mas cercano cuando hay varios",async()=>{
    const eventosMock=[
      {
        id_evento:10,
        titulo:"Evento lejano",
        fecha:"2026-07-10",
        horaInicio:"10:00",
        horaFin:"12:00"
      },
      {
        id_evento:20,
        titulo:"Evento cercano",
        fecha:"2026-06-21",
        horaInicio:"09:00",
        horaFin:"11:00"
      }
    ];
    (getEventos as jest.Mock).mockResolvedValue(eventosMock);
    render(
      <ProximoEvento
        rutaBase="/evento"
        label="Calendario"
      />
    );

    await waitFor(()=>{
      expect(screen.getByText("Evento cercano")).toBeInTheDocument();
    });
    expect(screen.queryByText("Evento lejano")).not.toBeInTheDocument();
});
  it("muestra mensaje cuando no existen eventos futuros",async()=>{

    (getEventos as jest.Mock).mockResolvedValue([
        {
          id_evento:1,
          titulo:"Evento pasado",
          fecha:"2026-06-01",
          horaInicio:"10:00",
          horaFin:"12:00"
        }

      ]);

    render(
      <ProximoEvento
        rutaBase="/eventos"
        label="Próximo"
      />
    );
    await waitFor(()=>{
      expect(screen.getByText("No hay eventos próximos.")).toBeInTheDocument();});
  });

  it("muestra mensaje si la lista viene vacía",async()=>{

    (getEventos as jest.Mock).mockResolvedValue([]);
    render(
      <ProximoEvento
        rutaBase="/eventos"
        label="Eventos"
      />
    );

    await waitFor(()=>{
      expect(screen.getByText("No hay eventos próximos.")).toBeInTheDocument();
    });
  });

  it("crea correctamente el link al detalle del evento",async()=>{

    (getEventos as jest.Mock).mockResolvedValue([
        {
          id_evento:55,
          titulo:"Clase especial",
          fecha:"2026-06-22",
          horaInicio:"18:00",
          horaFin:"20:00",
          aula:{
            nombre:"Aula 5"
          }
        }
      ]);

    render(
      <ProximoEvento
        rutaBase="/eventos"
        label="Evento"
      />
    );

    await waitFor(()=>{
      expect(
        screen.getByRole(
          "link",
          {
            name:"Ver evento"
          }
        )
      ).toHaveAttribute(
        "href",
        "/eventos/55"
      );
    });
  });

  it("muestra mensaje de error cuando falla el servicio",async()=>{

  (getEventos as jest.Mock).mockRejectedValue(
      new Error("fallo")
    );
  render(
    <ProximoEvento
      rutaBase="/eventos"
      label="Evento"
    />
  );
  await waitFor(()=>{
    expect(
      screen.getByText(
        "No se pudo cargar el próximo evento."
      )
    ).toBeInTheDocument();
  });
  expect(getEventos).toHaveBeenCalledTimes(1);
});
it("muestra estado de carga mientras obtiene eventos",()=>{

  (getEventos as jest.Mock)
    .mockReturnValue(
      new Promise(()=>{})
    );
  render(
    <ProximoEvento
      rutaBase="/eventos"
      label="Evento"
    />
  );
  expect(screen.getByText("Cargando evento...")).toBeInTheDocument();
});
});