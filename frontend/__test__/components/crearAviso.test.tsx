import CrearAviso from "@/app/components/crearAviso";
import { getEventos } from "@/app/services/eventos";
import { crearAviso } from "@/app/services/avisos";
import {render,screen,waitFor,} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("@/app/services/eventos", () => ({
  getEventos: jest.fn(),
}));
jest.mock("@/app/services/avisos", () => ({
  crearAviso: jest.fn(),
}));

const eventosMock = [
  {
    id_evento: 1,
    titulo: "Parcial Programacion",
    fecha: "2099-06-20",
    horaInicio: "10:00",
  },
  {
    id_evento: 2,
    titulo: "Evento pasado",
    fecha: "2020-01-01",
    horaInicio: "10:00",
  },
];

describe("CrearAviso",()=>{
beforeEach(()=>{
  jest.clearAllMocks();
});


test("muestra cargando mientras carga eventos",()=>{
(getEventos as jest.Mock)
.mockReturnValue(
  new Promise(()=>{})
);
render(
  <CrearAviso/>
);
expect(screen.getByText("Cargando eventos...")).toBeInTheDocument();
});

test("muestra solamente eventos futuros",async()=>{
(getEventos as jest.Mock).mockResolvedValue(eventosMock);
render(
  <CrearAviso/>
);
await waitFor(()=>{
 expect(screen.getByText("Parcial Programacion - 2099-06-20 - 10:00")).toBeInTheDocument()
});
expect(screen.queryByText("Evento pasado - 2020-01-01 - 10:00")).not.toBeInTheDocument();
});

it("muestra error si falla cargar eventos",async()=>{
(getEventos as jest.Mock).mockRejectedValue(new Error("fallo"));
render(
  <CrearAviso/>
);
await waitFor(()=>{
expect(
 screen.getByText("No se pudieron cargar los eventos.")).toBeInTheDocument();
});
});

test("no permite crear aviso sin seleccionar evento",async()=>{
(getEventos as jest.Mock).mockResolvedValue([]);
render(
 <CrearAviso/>
);
await waitFor(()=>{
 expect(
  screen.getByText("Seleccionar evento")
 )
.toBeInTheDocument();
});
const user =userEvent.setup();
await user.click(
 screen.getByRole("button",
 {
  name:"Crear aviso"
 })
);
expect(
 screen.getAllByText(
  "Seleccioná un evento."
 ).length
)
.toBeGreaterThan(0);
expect(crearAviso)
.not
.toHaveBeenCalled();
});
test("no permite crear aviso sin mensaje",async()=>{
(getEventos as jest.Mock)
.mockResolvedValue([
 {
  id_evento:5,
  titulo:"Clase",
  fecha:"2099-01-01",
  horaInicio:"10:00"
 }
]);
render(
 <CrearAviso/>
);
await waitFor(()=>{
 expect(screen.getByText(/Clase/)).toBeInTheDocument();
});

const user =userEvent.setup();
await user.selectOptions(
 screen.getByRole("combobox"),
 "5"
);
await user.click(
 screen.getByRole("button",
 {
  name:"Crear aviso"
 })
);
expect(
 screen.getAllByText(
  "Escribí un mensaje."
 ).length
)
.toBeGreaterThan(0);
expect(crearAviso)
.not
.toHaveBeenCalled();
});
test("crea aviso correctamente",async()=>{
(getEventos as jest.Mock)
.mockResolvedValue([
 {
  id_evento:10,
  titulo:"Examen",
  fecha:"2099-05-10",
  horaInicio:"12:00"
 }
]);
(crearAviso as jest.Mock).mockResolvedValue({ok:true});
render(
 <CrearAviso/>
);

const user =userEvent.setup();
await waitFor(()=>{
 expect(screen.getByText(/Examen/)).toBeInTheDocument();
});
await user.selectOptions(screen.getByRole("combobox"),"10");
await user.type(
 screen.getByPlaceholderText(
  "Escribí el aviso..."
 ),
 "Mañana hay clase"
);
await user.click(
 screen.getByRole("button",
 {
  name:"Crear aviso"
 })
);
await waitFor(()=>{
expect(crearAviso).toHaveBeenCalledWith("Mañana hay clase",10);
expect(screen.getAllByText("Aviso creado correctamente.").length).toBeGreaterThan(0);
});
});

test("muestra error si falla crear aviso",async()=>{

(getEventos as jest.Mock)
.mockResolvedValue([
 {
  id_evento:8,
  titulo:"Final",
  fecha:"2099-05-10",
  horaInicio:"15:00"
 }
]);
(crearAviso as jest.Mock).mockRejectedValue(new Error("fallo"));
render(
 <CrearAviso/>
);
const user =userEvent.setup();
await waitFor(()=>{
 expect(screen.getByText(/Final/)).toBeInTheDocument();
});

await user.selectOptions(screen.getByRole("combobox"),"8");
await user.type(screen.getByPlaceholderText("Escribí el aviso..."),"Aviso importante");
await user.click(
 screen.getByRole("button",
 {
  name:"Crear aviso"
 })
);
await waitFor(()=>{
expect(screen.getAllByText("No se pudo crear el aviso.").length).toBeGreaterThan(0);
});
});
});