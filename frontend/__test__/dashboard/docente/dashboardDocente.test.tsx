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
});