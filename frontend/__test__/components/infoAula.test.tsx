import { render, screen, within } from "@testing-library/react";
import InfoAula from "@/app/components/infoAula";
import { Evento } from "@/app/types/entidades";
import { getEventos } from "@/app/services/eventos";

jest.mock("@/app/services/eventos", () => ({getEventos: jest.fn(),}));

describe("InfoAula", () => {
beforeEach(() => {
  jest.clearAllMocks();
  jest.useRealTimers();
});

it("muestra cargando inicialmente", () => {

(getEventos as jest.Mock).mockReturnValue(new Promise(() => {}));
render(
  <InfoAula
    aulaId={5}
    nombre="202"
  />
);
expect(screen.getByText("Cargando información del aula...")).toBeInTheDocument();
});

it("muestra aula ocupada cuando hay evento actual", async()=>{

jest.useFakeTimers();
jest.setSystemTime(new Date("2026-07-22T20:00:00"));
const evento:Evento={
 id_evento:1,
 titulo:"Parcial Programacion",
 fecha:"2026-07-22",
 horaInicio:"19:00",
 horaFin:"21:00",
 estado:"Ocupado",
 aula:{
  id_aula:9,
  nombre:"202",
  capacidad:20,
  piso:2,
  ubicacion:"A"
 },
 materia:{
  id_materia:1,
  nombre:"Prog 3",
  carrera:{
   id_carrera:1,
   nombre:"TUP"
  }
 },
 tipoEvento:{
  id_tipo_evento:1,
  nombre:"Parcial"
 }
} as unknown as Evento;

(getEventos as jest.Mock)
.mockResolvedValue([
 evento
]);

render(
 <InfoAula
  aulaId={9}
  nombre="202"
 />
);

expect(
 await screen.findByText(
  "🔴 Aula ocupada"
 )
).toBeInTheDocument();

expect(
 screen.getByText("Parcial Programacion")
).toBeInTheDocument();

});

it("muestra próximo evento si el aula está libre", async()=>{
jest.useFakeTimers();
jest.setSystemTime(
 new Date("2026-07-22T10:00:00")
);

const evento:Evento={
 id_evento:7,
 titulo:"Clase de Base de datos",
 fecha:"2026-07-23",
 horaInicio:"18:30",
 horaFin:"21:00",
 estado:"Habilitado",
 aula:{
  id_aula:7,
  nombre:"203",
  capacidad:12,
  piso:2,
  ubicacion:"al fondo"
 },
 materia:{
  id_materia:2,
  nombre:"Base de datos 1",
  carrera:{
   id_carrera:24,
   nombre:"tecnicatura en sistemas"
  }
 },
 tipoEvento:{
  id_tipo_evento:22,
  nombre:"Teorico"
 }
} as unknown as Evento;

(getEventos as jest.Mock).mockResolvedValue([evento]);
render(
 <InfoAula
  aulaId={7}
  nombre="203"
 />
);
const aula =
 await screen.findByRole(
  "heading",
  {
   level:3,
   name:/Aula 203/i
  }
 );
const card =within(
  aula.closest("div")!
  .parentElement!
 );
expect(card.getByText(/Aula libre actualmente/)).toBeInTheDocument();
expect(
 card.getByRole(
  "heading",
  {
   level:4,
   name:"Próximo evento"
  }
 )
).toBeInTheDocument();
expect(card.getByText("Clase de Base de datos")
).toBeInTheDocument();
expect(
 card.getByText(
  (content) => content.includes("18:30")
 )
).toBeInTheDocument();
});

it("muestra sin eventos cuando no hay eventos", async()=>{

(getEventos as jest.Mock)
.mockResolvedValue([]);
render(
 <InfoAula
  aulaId={1}
  nombre="101"
 />
);
expect(await screen.findByText(/No hay eventos programados/)).toBeInTheDocument();

});
it("muestra mensaje de error si falla la carga de eventos", async()=>{

  (getEventos as jest.Mock)
    .mockRejectedValue(
      new Error("fallo")
    );
  render(
    <InfoAula
      aulaId={1}
      nombre="101"
    />
  );
  expect(
    await screen.findByText("No se pudieron cargar los eventos del aula.")).toBeInTheDocument();

});
});