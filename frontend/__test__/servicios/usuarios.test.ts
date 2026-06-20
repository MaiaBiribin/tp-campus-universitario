import { api } from "@/app/api";
import { Usuario } from "@/app/types/entidades";
import { getUsuariosHabilitados,getUsuariosPendientes,aprobarUsuario,rechazarUsuario,obtenerUsuariosDisponibles } from "@/app/services/usuarios";

jest.mock("@/api",()=>({
    api:jest.fn(),
}))

describe("Servicio de Usuarios", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getUsuariosHabilitados", () => {
    it("debería hacer un GET a /usuarios/habilitados y retornar la lista", async () => {
      const mockUsuarios = [{ id_usuario: 1, nombre: "Carlos" }];
      
      (api as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockUsuarios,
      });

      const resultado = await getUsuariosHabilitados();

      expect(api).toHaveBeenCalledTimes(1);
      expect(api).toHaveBeenCalledWith("/usuarios/habilitados");
      expect(resultado).toEqual(mockUsuarios);
    });

    it("debería lanzar un error si falla la carga de habilitados", async () => {
      (api as jest.Mock).mockResolvedValue({ ok: false });
      await expect(getUsuariosHabilitados()).rejects.toThrow("Error cargando usuarios");
    });
  });

  describe("getUsuariosPendientes", () => {
    it("debería hacer un GET a /usuarios/pendientes y retornar las solicitudes", async () => {
      const mockPendientes = [{ id_usuario: 2, nombre: "Marta" }];

      (api as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockPendientes,
      });

      const resultado = await getUsuariosPendientes();

      expect(api).toHaveBeenCalledWith("/usuarios/pendientes");
      expect(resultado).toEqual(mockPendientes);
    });

    it("debería lanzar un error si falla la carga de pendientes", async () => {
      (api as jest.Mock).mockResolvedValue({ ok: false });
      await expect(getUsuariosPendientes()).rejects.toThrow("Error cargando solicitudes");
    });
  });

  describe("aprobarUsuario", () => {
    it("debería hacer un PATCH a la URL de habilitar con el ID del usuario", async () => {
      (api as jest.Mock).mockResolvedValue({ ok: true });

      await aprobarUsuario(15);

      expect(api).toHaveBeenCalledWith("/usuarios/15/habilitar", {
        method: "PATCH",
      });
    });

    it("debería lanzar un error si el backend no puede aprobar al usuario", async () => {
      (api as jest.Mock).mockResolvedValue({ ok: false });
      await expect(aprobarUsuario(15)).rejects.toThrow("Error aprobando usuario");
    });
  });

  describe("rechazarUsuario", () => {
    it("debería hacer un PATCH a la URL de rechazar con el ID del usuario", async () => {
      (api as jest.Mock).mockResolvedValue({ ok: true });

      await rechazarUsuario(22);

      expect(api).toHaveBeenCalledWith("/usuarios/22/rechazar", {
        method: "PATCH",
      });
    });

    it("debería lanzar un error si el backend no puede rechazar al usuario", async () => {
      (api as jest.Mock).mockResolvedValue({ ok: false });
      await expect(rechazarUsuario(22)).rejects.toThrow("Error rechazando usuario");
    });
  });

  describe("obtenerUsuariosDisponibles (Función Pura)", () => {
    it("debería excluir a los usuarios cuyos IDs ya figuren en la lista de inscriptos", () => {
     
      const listaUsuariosMock = [
        { id_usuario: 101, nombre: "Estudiante A" },
        { id_usuario: 102, nombre: "Estudiante B" },
        { id_usuario: 103, nombre: "Estudiante C" },
      ] as Usuario[];

     
      const idsInscriptosMock = [102];

     
      const disponibles = obtenerUsuariosDisponibles(listaUsuariosMock, idsInscriptosMock);

      
      expect(disponibles).toHaveLength(2);
      expect(disponibles[0].id_usuario).toBe(101);
      expect(disponibles[1].id_usuario).toBe(103);
      
     
      const contieneInscripto = disponibles.some(u => u.id_usuario === 102);
      expect(contieneInscripto).toBe(false);
    });

    it("debería retornar todos los usuarios si la lista de inscriptos está vacía", () => {
      const listaUsuariosMock = [{ id_usuario: 101, nombre: "Estudiante A" }] as Usuario[];
      const disponibles = obtenerUsuariosDisponibles(listaUsuariosMock, []);
      
      expect(disponibles).toHaveLength(1);
      expect(disponibles[0].id_usuario).toBe(101);
    });
  });
});