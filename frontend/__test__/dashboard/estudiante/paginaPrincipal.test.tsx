import ProximoEvento from "@/app/components/proximoEvento";
import DashboardEstudiante from "@/app/dashboard/estudiante/page";
import { render, screen} from "@testing-library/react";

jest.mock("@/app/components/proximoEvento",()=>{
    return function MockProximoEvento({rutaBase,label}:{rutaBase:string,label:string}){
        return <div data-testid="mock-proximo-evento">
             <span>Ruta:{rutaBase}</span>
             <span>Label{label}</span>
        </div>
    };
});

jest.mock("@/app/components/avisosRecientes",()=>{
    return function MockAvisosRecientes(){
        return <div data-testid="mock-avisos-recientes">Avisos Recientes</div>
    }
})

describe("Dashboard estudiante",()=>{
    it("deberia poder renderizarse con exito el encabezado de la pagina",()=>{
       render(<DashboardEstudiante/>)

       expect(screen.getByRole("heading",{level:1,name:/Hola 👋/i})).toBeInTheDocument();
       expect(screen.getByText(/Consultá tus clases, aulas asignadas/i)).toBeInTheDocument()

    });


    it("deberia mostrar el proximo evento que tiene asignado",()=>{

        render(<DashboardEstudiante/>)

        
        expect(screen.getByRole("heading",{level:2,name:/Próximo evento/i})).toBeInTheDocument()
       const ProximoEvento=screen.getByTestId("mock-proximo-evento");
       expect(ProximoEvento).toBeInTheDocument();
       expect(screen.getByText("Ruta:/dashboard/eventos")).toBeInTheDocument()
       expect(screen.getByText("Próximo evento")).toBeInTheDocument()

    });

    it("deberia mostrar los avisos recientes de los eventos que tiene el estudiante",()=>{
        render(<DashboardEstudiante/>)

        expect(screen.getByRole("heading",{level:2,name:/Avisos recientes/i})).toBeInTheDocument()
        const avisosMock=screen.getByTestId("mock-avisos-recientes");
        expect(avisosMock).toBeInTheDocument();
    });
});