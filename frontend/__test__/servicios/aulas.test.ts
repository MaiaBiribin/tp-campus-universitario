import { api } from "@/app/api";
import { getAulas } from "@/app/services/aulas";


jest.mock("@/api",()=>({
    api:jest.fn(),
}))

describe("conseguir la ruta del backend para conseguir las aulas",()=>{

    it("que pueda recibir correctamente la ruta del back", async()=>{

        (api as jest.Mock).mockResolvedValue({
            ok:true,
            json: async ()=> [{id:1,nombre:"Aula 21"}],
        })

       const respuesta= await getAulas()

       expect(api).toHaveBeenCalledWith("/aulas")

       expect(respuesta).toEqual([{id:1,nombre:"Aula 21"}])

    })

})