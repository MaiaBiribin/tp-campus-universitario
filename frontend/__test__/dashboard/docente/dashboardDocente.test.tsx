import { render, screen, waitFor} from "@testing-library/react";
import DashboardDocente from "@/app/dashboard/docente/page";
import { getEventos } from "@/app/services/eventos";
import { getAvisosPorEvento } from "@/app/services/avisos";
import { Evento } from "@/app/types/entidades";

jest.mock("@/app/services/eventos",()=>({
   getEventos:jest.fn()
}));

jest.mock("@/app/services/avisos",()=>({
    getAvisosPorEvento:jest.fn()
}));

jest.mock("@/app/components/proximoEvento",()=>{
     return function MockProximoEvento({rutaBase,label}:{rutaBase:string,label:string}){
        return <div data-testid="mock-proximo-evento">
             <span>Ruta:{rutaBase}</span>
             <span>Label{label}</span>
        </div>
    };
});

describe("Dashboard docente",()=>{

    beforeEach(()=>{
        jest.clearAllMocks()
    })

    it("que se renderice correctamente el encabezado de la pagina", async ()=>{
        (getEventos as jest.Mock).mockResolvedValue([]);
        (getAvisosPorEvento as jest.Mock).mockResolvedValue([]);
        render(<DashboardDocente/>);
        await waitFor(() => {
          expect(screen.getByRole("heading",{level:1,name:/Panel docente/i})).toBeInTheDocument();});
    });

    it("que se muestren correctamente los eventos actuales del docente.", async()=>{
        const dia = new Date().toISOString().split("T")[0];
        const mockEvento:Evento = {
            id_evento:1,
            titulo:"Parcial Programacion",
            fecha: dia,
            horaInicio:"19:30",
            horaFin:"22:00",
            estado:"habilitado",
            aula:{id_aula:5,nombre:"Aula 201",capacidad:25,piso:2,ubicacion:"al fondo"},
            materia:{id_materia:3,nombre:"Programacion 3",carrera:{id_carrera:5,nombre:"tecnicatura en sistemas"}},
            tipoEvento:{id_tipo_evento:2,nombre:"Examen"},} as Evento;
        (getEventos as jest.Mock).mockResolvedValue([mockEvento]);
        (getAvisosPorEvento as jest.Mock).mockResolvedValue([{id_aviso:1,mensaje:"Aviso prueba"}]);
        render(<DashboardDocente/>);
        await waitFor(()=>{
            expect(screen.getByRole("heading",{level:1,name:/Panel docente/i})).toBeInTheDocument();
            expect(
           screen.getByText("Clases hoy")).toBeInTheDocument();
           expect(screen.getByText("Avisos activos")).toBeInTheDocument();
        const metricas =screen.getAllByRole("heading",{level:3});
        expect(metricas).toHaveLength(2);
        expect(metricas[0]).toHaveTextContent("1");
        expect(metricas[1]).toHaveTextContent("1");});
        expect(screen.getByTestId("mock-proximo-evento")).toBeInTheDocument();
        expect(
            screen.getByText("Ruta:/dashboard/eventos")).toBeInTheDocument();
        expect(screen.getByText(/Clase asignada/i)).toBeInTheDocument();

});
});