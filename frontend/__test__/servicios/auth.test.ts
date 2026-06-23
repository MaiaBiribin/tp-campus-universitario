import { api } from "@/app/api";
import {
  login,
  registrarUsuario,
  guardarSesion,
  logout
} from "@/app/services/auth";


jest.mock("@/app/api", () => ({
  api: jest.fn(),
}));

describe("probar los distintos tipos de autentificacion que posee la pagina",()=>{
  beforeEach(()=>{

    jest.clearAllMocks();

    Object.defineProperty(document,"cookie",{
      writable:true,
      value:"",
    });

  });

  it("Probar que la autentificacion del login funcione correctamente",async()=>{

    (api as jest.Mock).mockResolvedValue({
      ok:true
    });

    const respuesta = await login(
      "Alvaro@gmail.com",
      "24531"
    );

    expect(api).toHaveBeenCalledTimes(1);
    expect(api).toHaveBeenCalledWith(
      "/auth/login",
      {
        method:"POST",
        body:JSON.stringify({
          mail:"Alvaro@gmail.com",
          contrasena:"24531"
        })
      }
    );
    expect(respuesta).toEqual({
      ok:true
    });
  });

  it("probar que la autentificacion del registrar usuario funcione",async()=>{
    (api as jest.Mock).mockResolvedValue({
      ok:true
    });

    const datos = {
      nombre:"gonzalo",
      apellido:"perez",
      mail:"GonzaloPerez@gmail.com",
      dni:"45321520",
      contrasena:"pedrito"

    };
    const respuesta = await registrarUsuario(datos);
    expect(api).toHaveBeenCalledTimes(1);
    expect(api).toHaveBeenCalledWith(
      "/auth/register",
      {
        method:"POST",
        body:JSON.stringify(datos)
      }
    );
    expect(respuesta).toEqual({
      ok:true
    });
  });

  it("probar que se guarde el token en cookie",()=>{

    guardarSesion("token_prueba");
    expect(document.cookie).toBe(
      "token=token_prueba; path=/; SameSite=Lax"
    );

  });

  it("probar que la cookie del token expire correctamente",()=>{

    logout();
    expect(document.cookie).toBe(
      "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    );
  });
});