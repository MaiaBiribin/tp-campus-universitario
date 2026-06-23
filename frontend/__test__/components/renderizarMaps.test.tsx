import RenderizarMapas from "@/app/components/renderizarMaps";
import InfoAula from "@/app/components/infoAula";
import { render,screen, waitFor} from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { getEventos } from "@/app/services/eventos";



jest.mock("@/services/eventos",()=>({
   getEventos:jest.fn()
}));

describe("componente renderizar mapas",()=>{
    beforeAll(()=>{
        jest.clearAllMocks()
    })
    
    it("que renderice la planta que tiene por defecto, siendo la planta baja",()=>{
         render(<RenderizarMapas/>)

         const imagenMapa=screen.getByRole("img");
         expect(imagenMapa).toHaveAttribute("src","/mapaPB.png");
         expect(imagenMapa).toHaveAttribute("useMap","#plantaBaja");

         const areaPrueba=screen.getByAltText("Aula 101")
         expect(areaPrueba).toBeInTheDocument()
         expect(areaPrueba).toHaveAttribute("coords","51,58,198,52,198,198,141,198,141,201,51,200");
         
     })

     it("deberia de cambiar correctamente al aula selecionada",async()=>{
         const usuario=userEvent.setup()
         render(<RenderizarMapas/>)

         const botonP1=screen.getByRole("button",{name:"P1"});
         await usuario.click(botonP1)

          const imagenMapa=screen.getByRole("img");
         expect(imagenMapa).toHaveAttribute("src","/mapaP1.png");
         expect(imagenMapa).toHaveAttribute("useMap","#primerPiso");

         expect(screen.queryByAltText("Aula 101")).not.toBeInTheDocument()
         expect(screen.getByAltText("Aula 201")).toBeInTheDocument()

     })

     it("deberia poder mostrarse el aula y sus caracteristicas a la hora de hacer click en ella",async()=>{
         const usuario=userEvent.setup();
         
         (getEventos as jest.Mock).mockResolvedValue([]);

         render(<RenderizarMapas/>);

         const areaPrueba=screen.getByAltText("Aula 102");
         await usuario.click(areaPrueba);

         await waitFor(()=>{
             expect(screen.getByRole("heading",{level:3,name:/102/i})).toBeInTheDocument()
             expect(screen.getByText(/no hay eventos programados/i)).toBeInTheDocument()
         })
     })
})