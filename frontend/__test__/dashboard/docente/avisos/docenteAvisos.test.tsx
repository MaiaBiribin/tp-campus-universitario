import Avisos from "@/app/dashboard/docente/avisos/page";
import { getByRole, render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Aviso } from "@/app/types/entidades";
import { getAvisos,eliminarAviso } from "@/app/services/avisos";
import { wait } from "@testing-library/user-event/dist/cjs/utils/index.js";

jest.mock("@/app/services/avisos",()=>({
    getAvisos:jest.fn(),
    eliminarAviso:jest.fn(),
}));

describe("pagina de avisos del docente",()=>{
  const mockAvisos: Aviso[]=[
         {
          id_aviso:21,
            mensaje:"clase cancelada",
            fecha_creacion:"2026-06-27",
            usuarioCreador:{
                id_usuario:453,
                nombre:"pedrito",
                apellido:"juarez",
                mail:"PedritoJuarez@gmail.com",
                dni:"38750145",
                estado:"habilitado",
                rol:{id_rol:15,nombre:"docente"}
            },
            evento:{
             id_evento:1,
              titulo:"Clase presencial programacion",
             fecha:"2026-06-27",
             horaInicio:"19:30",
             horaFin:"22:00",
             estado:"habilitado",
              aula:{id_aula:5,nombre:"Aula 201",capacidad:25,piso:2,ubicacion:"al fondo"},
             materia:{id_materia:3,nombre:"Programacion 3",carrera:{id_carrera:5,nombre:"tecnicatura en sistemas"}},
               tipoEvento:{id_tipo_evento:2,nombre:"Clase presencial"},
            },
           }
  ];
  
  
    
   beforeEach(()=>{
    jest.clearAllMocks()
   })


   it("que pueda renderizar el mensaje de carga y los avisos que creo el docente",async()=>{
          (getAvisos as jest.Mock).mockResolvedValue(mockAvisos);

          render(<Avisos/>);

          expect(screen.getByText("Cargando avisos...")).toBeInTheDocument()

          await waitFor(()=>{
            expect(screen.queryByText("Cargando avisos...")).not.toBeInTheDocument();
           expect(screen.getByText("clase cancelada")).toBeInTheDocument();
           expect(screen.getByText("Clase presencial programacion")).toBeInTheDocument();
          })
   })

   it("deberia mostrar que no haya avisos si el docente aun no creo ninguno",async()=>{
      (getAvisos as jest.Mock).mockResolvedValue([]);

      render(<Avisos/>);

      await waitFor(()=>{
      expect(screen.getByRole("heading", { level: 2, name: "No hay avisos" })).toBeInTheDocument();
      expect(screen.getByText("Creá un aviso relacionado a tus eventos.")).toBeInTheDocument();
      })
   })

   it("deberia poder eliminar correctamente el evento al hacer click",async()=>{
          const usuario=userEvent.setup();

         (getAvisos as jest.Mock).mockResolvedValue(mockAvisos);
         (eliminarAviso as jest.Mock).mockResolvedValue(true);
          
         render(<Avisos/>);
         const mockEliminar=await screen.findByRole("button",{name:"Eliminar"});
         await usuario.click(mockEliminar);

         expect(eliminarAviso).toHaveBeenCalledWith(21);

         await waitFor(()=>{
            expect(screen.getByText("Aviso eliminado correctamente.")).toBeInTheDocument();
           expect(screen.queryByText("clase cancelada")).not.toBeInTheDocument();
         })

   })
})