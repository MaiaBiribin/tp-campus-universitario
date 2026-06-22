import { Evento } from "@/app/types/entidades";
import { getEventos } from "@/app/services/eventos";
import InfoAula from "@/app/components/infoAula";
import { render,screen, waitFor } from "@testing-library/react"

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
     const fechaActual= new Date("2026-06-22T14:00:00")
     jest.useFakeTimers().setSystemTime(fechaActual)

     const mockEvento:Evento={
          id_evento:4,
          titulo: "Parcial de metodologia",
          fecha: "2026-06-22",
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
      expect(screen.getByText( /Aula ocupada/i)).toBeInTheDocument()
      expect(screen.getByText("Parcial de metodologia")).toBeInTheDocument()
      expect(screen.getByText("2026-06-22")).toBeInTheDocument()
      expect(screen.getByText("19:00-21:00")).toBeInTheDocument()
     })

      
     jest.useRealTimers()

     
  })


})
