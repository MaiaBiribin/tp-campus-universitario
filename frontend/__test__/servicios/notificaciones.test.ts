import { TraerTodasNotificaciones,NotificacionLeida, 
  NotificacionLeidas, 
  CantidadNotificacionesSinLeer } from "@/app/services/notificaciones";

import { api } from "@/app/api";

jest.mock("@/app/api", () => ({
  api: jest.fn(),
}));

describe("Servicio de Notificaciones", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("TraerTodasNotificaciones", () => {
    it("debería hacer un GET a la ruta correcta y retornar el listado de notificaciones", async () => {
      const mockNotificaciones = [
        { id_notificacion: 1, mensaje: "Nuevo aviso de examen", leida: false },
        { id_notificacion: 2, mensaje: "Clase suspendida", leida: true }
      ];

      (api as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockNotificaciones,
      });

      const resultado = await TraerTodasNotificaciones();

      expect(api).toHaveBeenCalledTimes(1);
      expect(api).toHaveBeenCalledWith("/notificaciones/mis-notificaciones");
      expect(resultado).toEqual(mockNotificaciones);
    });
    it("debería lanzar error si la respuesta falla", async () => {
  (api as jest.Mock).mockResolvedValue({
    ok: false,
  });

  await expect(
    TraerTodasNotificaciones()
  ).rejects.toThrow(
    "Error al traer las notificaciones"
  );
});
  });

  describe("NotificacionLeida", () => {
    it("debería hacer un PATCH inyectando el ID en la URL y retornar la notificación actualizada", async () => {
      const mockRespuestaBack = {id_notificacion: 42,mensaje: "Aviso",fecha_creacion: "2026-06-25",leida: true};

      (api as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockRespuestaBack,
      });

      const resultado = await NotificacionLeida(42);

      
      expect(api).toHaveBeenCalledWith("/notificaciones/42/leida", {
        method: "PATCH",
      });
      expect(resultado).toEqual(mockRespuestaBack);
    });

    it("debería lanzar un error si el PATCH individual falla", async () => {
      (api as jest.Mock).mockResolvedValue({ ok: false });

      await expect(NotificacionLeida(42)).rejects.toThrow("Error al cambiar estado notificacion");
    });
  });

  describe("NotificacionLeidas", () => {
    it("debería hacer un PATCH a la ruta masiva de marcar todas como leídas", async () => {
      const mockRespuestaBack = [
  {
    id_notificacion: 1,
    mensaje: "Aviso",
    fecha_creacion: "2026-06-25",
    leida: true
  }
];

      (api as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockRespuestaBack,
      });

      const resultado = await NotificacionLeidas();

      expect(api).toHaveBeenCalledWith("/notificaciones/marcar-todas-leidas", {
        method: "PATCH",
      });
      expect(resultado).toEqual(mockRespuestaBack);
    });

    it("debería lanzar un error si el PATCH masivo falla", async () => {
      (api as jest.Mock).mockResolvedValue({ ok: false });

      await expect(NotificacionLeidas()).rejects.toThrow("Error al cambiar estado notificaciones");
    });
  });

  describe("CantidadNotificacionesSinLeer", () => {
    it("debería filtrar el arreglo del backend y retornar solo la cantidad de elementos no leídos", async () => {
      
      const mockNotificaciones = [
        { id_notificacion: 1, leida: false },
        { id_notificacion: 2, leida: true },
        { id_notificacion: 3, leida: false },
      ];

      (api as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockNotificaciones,
      });

      const cantidad = await CantidadNotificacionesSinLeer();

      expect(api).toHaveBeenCalledWith("/notificaciones/mis-notificaciones");
      
      
      expect(cantidad).toBe(2);
    });

    it("debería retornar 0 si todas las notificaciones ya fueron leídas", async () => {
      const mockNotificacionesLeidas = [
        { id_notificacion: 1, leida: true },
        { id_notificacion: 2, leida: true },
      ];

      (api as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockNotificacionesLeidas,
      });

      const cantidad = await CantidadNotificacionesSinLeer();
      expect(cantidad).toBe(0);
    });

    it("debería lanzar un error si falla la carga para el conteo", async () => {
      (api as jest.Mock).mockResolvedValue({ ok: false });

      await expect(CantidadNotificacionesSinLeer()).rejects.toThrow("No se pudieron cargar");
    });
  });
});