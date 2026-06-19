import { api } from "@/app/api";
import { getMateriasPorCarrera } from "@/app/services/materias";
import { mock } from "node:test";
import { text } from "stream/consumers";

jest.mock("@/api",()=>({
    api:jest.fn(),
}))

describe("service de conseguir las materias de una carrera en especifico",()=>{
      beforeEach(()=>{
        jest.clearAllMocks()

        jest.spyOn(console,"log").mockImplementation(()=>{})
      })

    it("que la funcion pueda traer la materias de la carrera especificada",async()=>{
        const MockMateria=[
            {id_materia:2,nombre:"Programacion 3",id_carrera:3},
            {id_materia:4,nombre:"Sistemas operativos",id_carrera:3}
        ];

        (api as jest.Mock).mockResolvedValue({
            ok:true,
            json: async ()=> MockMateria
        })

        const resultado = await getMateriasPorCarrera(3)

        expect(api).toHaveBeenCalledTimes(1)
        expect(api).toHaveBeenCalledWith(`/materias/carrera/3`)

        expect(resultado).toEqual(MockMateria)

    })

    it("que mande error al no encontrar la materia",async()=>{
      

        (api as jest.Mock).mockResolvedValue({
            ok:false,
            text:async()=> "Carrera no encontrada", 
        });

        await expect(getMateriasPorCarrera(3)).rejects.toThrow("Error cargando materias")
        
    })
})