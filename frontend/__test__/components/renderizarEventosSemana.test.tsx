import { render, screen } from "@testing-library/react";
import RenderizarEventosSemana from "@/app/components/renderizarEventosSemana";
import { Evento } from "@/app/types/entidades";

describe("Componente RenderizarEventosSemana",()=>{

  it("muestra mensaje cuando no hay eventos",()=>{
    render(
      <RenderizarEventosSemana
        eventos={[]}
      />
    );
    expect(screen.getByText("No tenés eventos esta semana." )).toBeInTheDocument();
  });

  it("renderiza correctamente la lista de eventos",()=>{
    const eventosMock: Evento[] = [
      {
        id_evento:1,
        titulo:"Parcial Programación",
        fecha:"2026-06-25",
        horaInicio:"10:00",
        horaFin:"12:00",
        aula:{
          nombre:"Aula 101"
        },
        materia:{
          nombre:"Programación 3"
        }
      },
      {
        id_evento:2,
        titulo:"Clase BD",
        fecha:"2026-06-26",
        horaInicio:"18:00",
        horaFin:"20:00",
        aula:{
          nombre:"Aula 202"
        },
        materia:{
          nombre:"Base de Datos"
        }
      }
    ] as unknown as Evento[];
    render(
      <RenderizarEventosSemana
        eventos={eventosMock}
      />
    );
    expect(screen.getByText("Parcial Programación")).toBeInTheDocument();
    expect(screen.getByText("Clase BD")).toBeInTheDocument();
    expect(screen.getByText( "📅 2026-06-25")).toBeInTheDocument();
    expect(
      screen.getByText(
        "🕒 10:00 - 12:00"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "🏫 Aula 101"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "📚 Programación 3"
      )
    ).toBeInTheDocument();
  });

  it("renderiza eventos aunque no tengan aula ni materia",()=>{
    const eventosMock = [
      {
        id_evento:5,
        titulo:"Reunión",
        fecha:"2026-06-30",
        horaInicio:"08:00",
        horaFin:"09:00"
      }
    ] as Evento[];

    render(
      <RenderizarEventosSemana
        eventos={eventosMock}
      />
    );
    expect(screen.getByText("Reunión")).toBeInTheDocument();
    expect(screen.getByText("📅 2026-06-30")).toBeInTheDocument();
    expect(screen.getByText("🕒 08:00 - 09:00")).toBeInTheDocument();
  });

  it("renderiza la cantidad correcta de eventos",()=>{
    const eventosMock=[
      {
        id_evento:1,
        titulo:"Evento 1",
        fecha:"2026-06-20",
        horaInicio:"09:00",
        horaFin:"10:00"
      },
      {
        id_evento:2,
        titulo:"Evento 2",
        fecha:"2026-06-21",
        horaInicio:"11:00",
        horaFin:"12:00"
      }
    ] as Evento[];
    const {container}=render(
      <RenderizarEventosSemana
        eventos={eventosMock}
      />
    );
    const cards = container.querySelectorAll("h3");
    expect(cards).toHaveLength(2);
  });
});