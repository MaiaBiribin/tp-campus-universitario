import { render, screen, waitFor } from "@testing-library/react";
import { getEventoPorId } from "@/app/services/eventos";
import EventoDetalle from "@/app/components/eventoDetalle";

jest.mock("@/app/services/eventos",()=>({
  getEventoPorId:jest.fn()
}));

describe("Componente EventoDetalle",()=>{

  beforeEach(()=>{
    jest.clearAllMocks();
    jest.spyOn(console,"error")
      .mockImplementation(()=>{});
  });

  afterEach(()=>{
    jest.restoreAllMocks();
  });

  it("muestra cargando mientras busca el evento",()=>{

    (getEventoPorId as jest.Mock).mockReturnValue(new Promise(()=>{}));
    render(
      <EventoDetalle id={1}/>
    );
    expect(
      screen.getByText(
        "Cargando evento..."
      )
    ).toBeInTheDocument();
  });

  it("muestra todos los datos del evento correctamente",async()=>{

    const eventoMock = {
      id_evento:1,
      titulo:"Parcial Programacion",
      fecha:"2026-06-30",
      horaInicio:"10:00",
      horaFin:"12:00",
      aula:{
        id_aula:5,
        nombre:"Aula 201"
      },
      materia:{
        id_materia:3,
        nombre:"Programacion 3"
      },
      tipoEvento:{
        id_tipo_evento:2,
        nombre:"Examen"
      }
    };

    (getEventoPorId as jest.Mock).mockResolvedValue(eventoMock);
    render(
      <EventoDetalle id={1}/>
    );

    await waitFor(()=>{
      expect(screen.getByRole("heading",{name:"Parcial Programacion"})).toBeInTheDocument();});
    expect(screen.getByText("Fecha: 2026-06-30")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Hora: 10:00 - 12:00"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Aula: Aula 201"
      )
    ).toBeInTheDocument();

    expect(screen.getByText("Materia: Programacion 3")).toBeInTheDocument();
    expect(screen.getByText("Tipo: Examen")).toBeInTheDocument();
    expect(getEventoPorId)
      .toHaveBeenCalledWith(1);
  });

  it("muestra mensaje si no existe evento",async()=>{

    (getEventoPorId as jest.Mock).mockResolvedValue(null);
    render(
      <EventoDetalle id={20}/>
    );

    await waitFor(()=>{
      expect(screen.getByText("No se encontró el evento.")).toBeInTheDocument();

    });
  });

  it("muestra mensaje de no encontrado si falla la carga",async()=>{

    (getEventoPorId as jest.Mock).mockRejectedValue(new Error("Error servidor"));
    render(
      <EventoDetalle id={10}/>
    );
    await waitFor(()=>{
      expect(screen.getByText("No se encontró el evento.")).toBeInTheDocument();
    });
    expect(console.error).toHaveBeenCalled();
  });

  it("pemite cambiar el id y vuelve a consultar el evento",async()=>{

    const evento1={
      id_evento:1,
      titulo:"Evento uno",
      fecha:"2026-07-01",
      horaInicio:"09:00",
      horaFin:"10:00"
    };
    const evento2={
      id_evento:2,
      titulo:"Evento dos",
      fecha:"2026-07-02",
      horaInicio:"11:00",
      horaFin:"12:00"
    };

    (getEventoPorId as jest.Mock).mockResolvedValueOnce(evento1).mockResolvedValueOnce(evento2);
    const {rerender}=render(
      <EventoDetalle id={1}/>
    );

    await waitFor(()=>{
      expect(
        screen.getByText(
          "Evento uno"
        )
      ).toBeInTheDocument();

    });
    rerender(
      <EventoDetalle id={2}/>
    );
    await waitFor(()=>{
      expect(screen.getByText("Evento dos")).toBeInTheDocument();});
    expect(getEventoPorId).toHaveBeenCalledTimes(2);
    expect(getEventoPorId).toHaveBeenNthCalledWith(1,1);
    expect(getEventoPorId).toHaveBeenNthCalledWith(2,2);
  });
});