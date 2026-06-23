import { api } from "@/app/api";
import { crearAviso,eliminarAviso,getAvisosPorEvento } from "@/app/services/avisos";


jest.mock("@/api",()=>({
    api:jest.fn(),
}))

describe("probar que los services de avisos funcionen bien",()=>{

    beforeEach(() => {
    jest.clearAllMocks();
  });

    it("probar que se cree un aviso",async()=>{
       const mockAviso={mensaje:"tenemos clase virtual",id_evento:21};

        (api as jest.Mock).mockResolvedValue({
            ok:true,
            json:async()=>mockAviso
        });

        const respuesta= await crearAviso("tenemos clase virtual",21)

        expect(api).toHaveBeenCalledTimes(1)
        expect(api).toHaveBeenCalledWith("/avisos",{
           method:"POST",
           body:JSON.stringify({mensaje:"tenemos clase virtual",id_evento:21})

        })

        expect(respuesta).toEqual(mockAviso)
    })

    it("verificar que se lanze el error creando un aviso correctamente",async()=>{
        (api as jest.Mock).mockResolvedValue({ok:false});

       await expect(crearAviso("a",250)).rejects.toThrow("Error creando aviso");
    })


    it("probar que poder obtener los avisos de un evento",async()=>{
       const mockAvisos=[{
         mensaje:"clase suspendida",id_evento:4},
         {mensaje:"clase atrasada",id_evento:4},
       ];
        (api as jest.Mock).mockResolvedValue({
            ok:true,
            json:async()=>mockAvisos,
        }); 

        const respuesta= await getAvisosPorEvento(4)

        expect(api).toHaveBeenCalledTimes(1)
        expect(api).toHaveBeenCalledWith(`/avisos/evento/4`)

        expect(respuesta).toEqual(mockAvisos)
    })

    it("probando que si se traen mal los avisos que tire error correctamente",async()=>{
        (api as jest.Mock).mockResolvedValue({ok:false});
        await expect(getAvisosPorEvento(5)).rejects.toThrow("Error cargando avisos");
    })
})

it("probar que se pueda eliminar un aviso", async () => {
    const mockRespuesta = {
        mensaje:"Aviso eliminado"
    };

    (api as jest.Mock).mockResolvedValue({
        ok:true,
        json:async()=>mockRespuesta
    });

    const respuesta = await eliminarAviso(10);
    expect(api).toHaveBeenCalledTimes(1);
    expect(api).toHaveBeenCalledWith("/avisos/10",{
        method:"DELETE"
    });
    expect(respuesta).toEqual(mockRespuesta);
});