import { render, screen} from "@testing-library/react";
import EventosPage from "@/app/dashboard/eventos/page";

jest.mock("@/app/components/eventoSemanaView",()=>{
   return function MockEventoSemanaView({titulo,descripcion}:{titulo:string,descripcion:string}){
       return <div data-testId="mock-eventos-view" >
           <h1>{titulo}</h1>
           <p>{descripcion}</p>
       </div>
   }
});

describe("pagina de eventos",()=>{
      it("que se pueda renderizar la pagina correctamente",()=>{
         render(<EventosPage/>)

         const contenedorMock= screen.getByTestId("mock-eventos-view");
         expect(contenedorMock).toBeInTheDocument()

         const mockTitulo=screen.getByRole("heading",{level:1,name:/Eventos de la semana/i});
         expect(mockTitulo).toBeInTheDocument();

         const mockDescripcion=screen.getByText("Visualizá tus próximas clases y actividades");
         expect(mockDescripcion).toBeInTheDocument();

      })

})