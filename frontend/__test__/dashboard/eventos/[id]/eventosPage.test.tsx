import { render, screen} from "@testing-library/react";
import Page from "@/app/dashboard/eventos/[id]/page";

jest.mock("@/app/components/eventoDetalle",() => {
     return function mockEventoDetalle({id}:{id:number}){
         return(
            <div data-testid="mock-evento-detalle">
            detalle del evento:{id}
            </div>
         );
     };
});


describe("pestaña del evento con sus detalles espescificos",()=>{
    it("que se renderice bien la pagina",async()=>{
         const mockParams=Promise.resolve({id:"105"});

         const componenteRenderizado= await Page({params:mockParams})
         render(componenteRenderizado)
         const contenedorMock=screen.getByTestId("mock-evento-detalle")
         expect(contenedorMock).toBeInTheDocument()
         expect(contenedorMock).toHaveTextContent("detalle del evento:105")
    });


});