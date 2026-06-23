import { Evento } from "@/app/types/entidades";
import { getEventos } from "@/app/services/eventos";
import InfoAula from "@/app/components/infoAula";
import { render,screen, waitFor,within} from "@testing-library/react"
import { Content } from "next/font/google";
import * as eventosService from "@/app/services/eventos";

 jest.mock("@/services/eventos",()=>({
        getEventos:jest.fn()
    }))

describe("componentes,infoAulas",()=>{
     const aulaId=5
     const nombreAula="202"

      beforeEach(()=>{
        jest.clearAllMocks()
      })

    it("debería mostrar el estado de 'Cargando...' inicialmente", () => {
    
    (getEventos as jest.Mock).mockReturnValue(new Promise(() => {}));

    render(<InfoAula aulaId={aulaId} nombre={nombreAula} />);

    expect(screen.getByText("Cargando...")).toBeInTheDocument();
  });


  it("que se muestre el evento que concida con la fecha actual",async()=>{
     const fechaActual= new Date("2026-07-22T14:12:00")
     jest.useFakeTimers().setSystemTime(fechaActual)

     const mockEvento:Evento={
          id_evento:4,
          titulo: "parcial de metodologia",
          fecha: "2026-08-04",
          horaInicio: "19:00",
          horaFin: "21:00",
          estado: "Ocupado",
          aula:{ id_aula:9,nombre:"202",capacidad:10,piso:2,ubicacion:"al fondo"} ,
          materia:{id_materia:2,nombre:"metodologia 1",carrera:{id_carrera:24,nombre:"tecnicatura en sistemas"}},
          tipoEvento:{id_tipo_evento:21,nombre:"Parcial"},
     } as unknown as Evento

     (getEventos as jest.Mock).mockResolvedValue([mockEvento]);
     
     render(<InfoAula aulaId={9} nombre="202" />)
        
     await waitFor(()=>{
      expect(screen.getByRole("heading",{level:3,name:/202/i})).toBeInTheDocument()
  
     });

      
     jest.useRealTimers()

     
     
  })

  it("que se muestre el siguiente evento",async()=>{
     const fechaProxima=new Date();
     fechaProxima.setDate(fechaProxima.getDate()+ 1)
     const fechaProximaString=fechaProxima.toISOString().split("T")[0]


      const mockEvento:Evento={
          id_evento:7,
          titulo: "Clase de Base de datos",
          fecha: fechaProximaString,
          horaInicio: "18:30",
          horaFin: "21:00",
          estado: "Habilitado",
          aula:{ id_aula:10,nombre:"203",capacidad:12,piso:2,ubicacion:"al fondo"} ,
          materia:{id_materia:2,nombre:"Base de datos 1",carrera:{id_carrera:24,nombre:"tecnicatura en sistemas"}},
          tipoEvento:{id_tipo_evento:22,nombre:"Teorico"},
     } as unknown as Evento

     
     jest.spyOn(eventosService, "getEventos").mockResolvedValue([mockEvento])
     
     render(<InfoAula aulaId={7} nombre="203"/>)

     await waitFor(() => {
    
     const headingAula = screen.getByRole("heading", { level: 3, name: /203/i });
     const tarjeta = within(headingAula.closest("div")?.parentElement!);

    
     expect(tarjeta.getByText((content) => content.includes("Aula libre actualmente"))).toBeInTheDocument();
     expect(tarjeta.getByRole("heading", { level: 4, name: /Próximo evento/i })).toBeInTheDocument();
     expect(tarjeta.getByText(/Clase de Base de Datos/i)).toBeInTheDocument();
     expect(tarjeta.getByText((content) => content.includes("18:00"))).toBeInTheDocument();
  });
  })

})
