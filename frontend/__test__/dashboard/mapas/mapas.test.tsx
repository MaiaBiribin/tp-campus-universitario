import { render, screen} from "@testing-library/react";
import RenderizarMapas from "@/app/components/renderizarMaps";
import MapaPage from "@/app/dashboard/mapa/page";

jest.mock("@/app/components/renderizarMaps",()=>{
    return function MockMapa() {
        return <div data-testid="mapa interactivo">Mapa interactivo</div>
    };
});


describe("Mapas",()=>{
       it("que se renderice la pagina correctamente",()=>{
          render(<MapaPage/>);
          
          const contenedorMain=screen.getByRole("main");
          expect(contenedorMain).toBeInTheDocument()

          const mapa=screen.getByTestId("mapa interactivo");
          expect(mapa).toBeInTheDocument()
       })



})