import RenderizarMapas from "@/app/components/renderizarMaps";
import InfoAula from "@/app/components/infoAula";
import { render,screen, waitFor} from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { getEventos } from "@/app/services/eventos";
import { getAulas } from "@/app/services/aulas";



jest.mock("@/app/services/eventos",()=>({
    getEventos: jest.fn()
}));
jest.mock("@/app/services/aulas",()=>({
    getAulas: jest.fn()
}));

describe("componente renderizar mapas",()=>{
    beforeEach(()=>{
    jest.clearAllMocks();
    (getEventos as jest.Mock).mockResolvedValue([]);
    (getAulas as jest.Mock).mockResolvedValue([
        {
            id_aula:13,
            nombre:"101",
            capacidad:30,
            piso:1,
            ubicacion:"A"
        },
        {
            id_aula:14,
            nombre:"102",
            capacidad:40,
            piso:1,
            ubicacion:"B"
        },
        {
            id_aula:15,
            nombre:"103",
            capacidad:50,
            piso:1,
            ubicacion:"C"
        }
    ]);})
    
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
         render(<RenderizarMapas/>);
         const areaPrueba=screen.getByAltText("Aula 102");
         await usuario.click(areaPrueba);
         expect(await screen.findByRole("heading",{level:3,name:/102/i})).toBeInTheDocument();
         expect(await screen.findByText(/no hay eventos programados/i)).toBeInTheDocument();
        })
})