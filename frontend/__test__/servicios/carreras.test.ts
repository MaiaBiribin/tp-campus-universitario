import { api } from "@/app/api";
import { getCarreras } from "@/app/services/carreras";

jest.mock("@/app/api",()=>({
  api: jest.fn(),
}));

describe("getCarreras",()=>{
  beforeEach(()=>{
    jest.clearAllMocks();
  });

  it("obtiene carreras correctamente",async()=>{

    (api as jest.Mock)
      .mockResolvedValue({
        ok:true,
        json: async()=>[
          {
            id_carrera:2,
            nombre:"Biologo"
          }
        ]
      });

    const respuesta =await getCarreras();
    expect(api)
      .toHaveBeenCalledWith(
        "/carreras"
      );
    expect(respuesta)
      .toEqual([
        {
          id_carrera:2,
          nombre:"Biologo"
        }
      ]);
  });

  it("lanza error cuando la respuesta no es correcta", async () => {

  (api as jest.Mock)
    .mockResolvedValue({
      ok: false,
    });

  await expect(
    getCarreras()
  ).rejects.toThrow(
    "Error cargando carreras"
  );

  expect(api)
    .toHaveBeenCalledWith(
      "/carreras"
    );
});
});