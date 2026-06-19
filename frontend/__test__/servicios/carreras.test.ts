import { api } from "@/app/api";
import { getCarreras } from "@/app/services/carreras";



jest.mock("@/api",()=>({
    api:jest.fn(),
}))

describe("conseguir la ruta de las carreras",()=>{

   it("probar que traiga correctamente la ruta",async()=>{
        (api as jest.Mock).mockResolvedValue({
            ok:true,
            json:async()=>[{id_carrera:2,nombre:"Biologo"}],    
        })  
       const respuesta = await getCarreras()

       expect(api).toHaveBeenCalledWith("/carreras");

       expect(respuesta).toEqual([{id_carrera:2,nombre:"Biologo"}])

   })


})