import { api } from "@/app/api";
import { getInscripcionesPorMateria,inscribirUsuarios,obtenerIdsUsuariosInscriptos } from "@/app/services/inscripciones";
import { Inscripcion } from "@/app/types/entidades";

jest.mock("@/api",()=>({
    api:jest.fn(),
}))


describe("Servicio de Inscripciones", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getInscripcionesPorMateria", () => {
    it("debería inyectar el idMateria en la URL y retornar el arreglo de inscripciones", async () => {
     
      const mockInscripciones = [
        { id_inscripcion: 1, usuario: { id_usuario: 10, nombre: "Juan" }, id_materia: 54 },
        { id_inscripcion: 2, usuario: { id_usuario: 11, nombre: "Ana" }, id_materia: 54 }
      ];

      (api as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockInscripciones,
      });

      const resultado = await getInscripcionesPorMateria(54);

      expect(api).toHaveBeenCalledTimes(1);
      expect(api).toHaveBeenCalledWith("/inscripciones/materia/54");
      expect(resultado).toEqual(mockInscripciones);
    });

    it("debería lanzar un error si la API responde con un !ok", async () => {
      (api as jest.Mock).mockResolvedValue({ ok: false });

      await expect(getInscripcionesPorMateria(54)).rejects.toThrow("Error cargando inscripciones");
    });
  });

  describe("inscribirUsuarios", () => {
    it("debería hacer un POST a /inscripciones con el id_materia y el arreglo de usuarios", async () => {
      const usuariosAAgregar = [10, 11, 12];
      const mockRespuestaBack = { mensaje: "Inscripciones procesadas con éxito" };

      (api as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockRespuestaBack,
      });

      const resultado = await inscribirUsuarios(54, usuariosAAgregar);

      // Verificamos el contrato estricto del body (camelCase del parámetro -> snake_case de la API)
      expect(api).toHaveBeenCalledWith("/inscripciones", {
        method: "POST",
        body: JSON.stringify({
          id_materia: 54,
          usuarios: usuariosAAgregar,
        }),
      });
      expect(resultado).toEqual(mockRespuestaBack);
    });

    it("debería lanzar un error si falla la inscripción masiva", async () => {
      (api as jest.Mock).mockResolvedValue({ ok: false });

      await expect(inscribirUsuarios(54, [10])).rejects.toThrow("Error al inscribir usuarios");
    });
  });

  describe("obtenerIdsUsuariosInscriptos (Función Pura)", () => {
    it("debería mapear correctamente las inscripciones y extraer solo los id_usuario", () => {
     
      const inscripcionesMock = [
        { usuario: { id_usuario: 101 } },
        { usuario: { id_usuario: 102 } },
        { usuario: { id_usuario: 103 } },
      ] as Inscripcion[]; 

      
      const resultadoIds = obtenerIdsUsuariosInscriptos(inscripcionesMock);

      
      expect(resultadoIds).toEqual([101, 102, 103]);
      expect(resultadoIds).toHaveLength(3);
    });

    it("debería retornar un arreglo vacío si se le pasa una lista vacía de inscripciones", () => {
      const resultadoIds = obtenerIdsUsuariosInscriptos([]);
      expect(resultadoIds).toEqual([]);
    });
  });
});