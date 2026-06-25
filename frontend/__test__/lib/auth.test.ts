import {
  decodeToken,
  getRoleFromToken,
} from "@/app/lib/auth";

describe("auth", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe("decodeToken", () => {
    it("debe decodificar correctamente un token válido", () => {
      const payload = {
        rol: "Admin",
        sub: 1,
      };

      jest
        .spyOn(global, "atob")
        .mockReturnValue(JSON.stringify(payload));

      const resultado = decodeToken(
        "header.payload.signature"
      );

      expect(resultado).toEqual(payload);
    });

    it("debe retornar null cuando el token es inválido", () => {
      jest
        .spyOn(global, "atob")
        .mockImplementation(() => {
          throw new Error("token inválido");
        });

      const resultado = decodeToken(
        "token-invalido"
      );

      expect(resultado).toBeNull();
    });

    it("debe retornar null cuando el payload no es JSON válido", () => {
      jest
        .spyOn(global, "atob")
        .mockReturnValue("no-es-json");

      const resultado = decodeToken(
        "header.payload.signature"
      );

      expect(resultado).toBeNull();
    });
  });

  describe("getRoleFromToken", () => {
    it("debe retornar el rol contenido en el token", () => {
      jest
        .spyOn(global, "atob")
        .mockReturnValue(
          JSON.stringify({
            rol: "Admin",
          })
        );

      const resultado = getRoleFromToken(
        "header.payload.signature"
      );

      expect(resultado).toBe("Admin");
    });

    it("debe retornar null cuando el token es inválido", () => {
      jest
        .spyOn(global, "atob")
        .mockImplementation(() => {
          throw new Error("token inválido");
        });

      const resultado = getRoleFromToken(
        "token-invalido"
      );

      expect(resultado).toBeNull();
    });

    it("debe retornar null cuando decodeToken falla", () => {
      jest
        .spyOn(global, "atob")
        .mockReturnValue("json-invalido");

      const resultado = getRoleFromToken(
        "header.payload.signature"
      );

      expect(resultado).toBeNull();
    });
  });
});