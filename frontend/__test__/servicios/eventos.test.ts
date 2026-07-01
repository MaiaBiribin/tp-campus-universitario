import { getEventos
    ,getEventoPorId, 
  crearEvento, 
  eliminarEvento, 
  getEventosSemana } from "@/app/services/eventos";
import { api } from "@/app/api";
import { Evento } from "@/app/types/entidades";

jest.mock("@/api",()=>({
    api:jest.fn(),
}))

describe("servicios para conseguir eventos de varias maneras",()=>{
    const fecha_mock="2026-06-15T10:00:00";

    beforeEach(()=>{
        jest.clearAllMocks()

        jest.useFakeTimers().setSystemTime(new Date(fecha_mock))
    })

    afterEach(()=>{
        jest.useRealTimers();
    });

  

    it("deberia poder conseguir todos los eventos",async()=>{
         const listaEventos:Evento[]=[{ id: 1, titulo: "Examen", fecha: "2026-07-14", horaInicio: "09:00",
          horaFin: "10:00"},{ id: 2, titulo: "defensa tp", fecha: "2026-07-01", horaInicio: "15:00",
            horaFin: "16:00"}] as unknown as Evento[]
       
        (api as jest.Mock).mockResolvedValue({
            ok:true,
            json: async()=> listaEventos
        })

        const respuesta = await getEventos()

        expect(api).toHaveBeenCalledWith("/eventos")
        expect(respuesta).toHaveLength(2)
    })

    it("debería lanzar un error si el backend responde !ok", async () => {
      (api as jest.Mock).mockResolvedValue({ ok: false });
      await expect(getEventos()).rejects.toThrow("Error cargando eventos");
    });


    it("deberia conseguir el evento por el id buscado",async()=>{
         const MockEvento ={id:20, titulo:"Examen"};

         (api as jest.Mock).mockResolvedValue({
            ok:true,
            json: async()=> MockEvento
         })

         const respuesta= await getEventoPorId(20)

         expect(api).toHaveBeenCalledTimes(1)
         expect(api).toHaveBeenCalledWith(`/eventos/20`)

         expect(respuesta).toEqual(MockEvento)
    })

    it("deberia poder crear un nuevo evento",async()=>{
        const nuevoEvento:Evento={
              id_evento: 25,
              titulo: "Parcial de matematica",
              fecha: "2026-06-30",
              horaInicio: "19:30",
              horaFin: "20:30",
              estado: "Programado",
              aula:{id_aula:25,nombre:"aula 25",capacidad:10,piso:2,ubicacion:"al fondo"},
              materia:{id_materia:4,nombre:"Matematica",
                carrera:{
                    id_carrera:2,
                    nombre:"Super matematico"
                }},
              tipoEvento:{id_tipo_evento:400,nombre:"Examen"},

        };

        (api as jest.Mock).mockResolvedValue({
            ok:true,
            json:async()=> nuevoEvento
        })

        const respuesta= await crearEvento(nuevoEvento)

        expect(api).toHaveBeenCalledWith("/eventos", {
        method: "POST",
        body: JSON.stringify(nuevoEvento),
      });

      expect(respuesta).toEqual(nuevoEvento);
      expect(respuesta.materia.nombre).toBe("Matematica");
      expect(respuesta.materia.carrera.nombre).toBe("Super matematico");

    })

    it("que se pueda borrar correctamente un evento",async()=>{
       (api as jest.Mock).mockResolvedValue({ok:true});

       await eliminarEvento(45);

      expect(api).toHaveBeenCalledWith("/eventos/45", {
        method: "DELETE",
      });
    })

    it("debería lanzar error si falla la eliminación", async () => {
      (api as jest.Mock).mockResolvedValue({ ok: false });
      await expect(eliminarEvento(45)).rejects.toThrow("Error eliminando evento");
    });
  
   it("deberia poder traer los eventos de la semana",async()=>{
        const listaEventosSemana:Evento[]=[{ id: 4, titulo: "Clase virtual", fecha: "2026-06-20", 
          horaInicio: "09:00",horaFin: "10:00"},{ id: 6, titulo: "Recuperatorio", fecha: "2026-06-21", 
            horaInicio: "15:00",horaFin: "16:00"}] as unknown as Evento[]
   
        (api as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => listaEventosSemana,
      });

      const resultado = await getEventosSemana();
      expect(resultado).toHaveLength(2);

   })


})