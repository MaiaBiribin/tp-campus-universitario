import { renderHook, act } from "@testing-library/react";
import { useCrearEvento } from "@/app/hooks/useCrearEvento";
import {getCarreras,} from "@/app/services/carreras";
import {getAulas,} from "@/app/services/aulas";
import {getMateriasPorCarrera,} from "@/app/services/materias";
import {crearEvento,} from "@/app/services/eventos";

jest.mock("@/app/services/carreras", () => ({getCarreras: jest.fn(),}));
jest.mock("@/app/services/aulas", () => ({getAulas: jest.fn(),}));
jest.mock("@/app/services/materias", () => ({getMateriasPorCarrera: jest.fn(),}));
jest.mock("@/app/services/eventos", () => ({crearEvento: jest.fn(),}));

describe("useCrearEvento", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debe cargar carreras y aulas al montar", async () => {
    (getCarreras as jest.Mock).mockResolvedValue([
      { id_carrera: 1, nombre: "Ing" },
    ]);
    (getAulas as jest.Mock).mockResolvedValue([
      { id_aula: 1, nombre: "A1" },
    ]);

    const { result } = renderHook(() =>useCrearEvento());
    await act(async () => {
    });

    expect(result.current.carreras.length).toBe(1);
    expect(result.current.aulas.length).toBe(1);
  });

    it("debe cargar materias al cambiar carrera", async () => {
    (getMateriasPorCarrera as jest.Mock).mockResolvedValue([
      { id_materia: 1, nombre: "Matemática" },
    ]);

    const { result } = renderHook(() =>
      useCrearEvento()
    );

    await act(async () => {
      await result.current.cambiarCarrera("1");
    });

    expect(
      getMateriasPorCarrera
    ).toHaveBeenCalledWith(1);

    expect(result.current.materias.length).toBe(1);
  });

    it("debe fallar si horaInicio >= horaFin", async () => {
    const { result } = renderHook(() =>
      useCrearEvento()
    );

    await act(async () => {
      result.current.setHoraInicio("10:00");
      result.current.setHoraFin("09:00");
    });

    let ok: boolean;

    await act(async () => {
      ok = await result.current.submit();
    });

    expect(ok!).toBe(false);
    expect(result.current.error).toBe(
      "La hora de inicio debe ser menor"
    );
  });

    it("debe fallar si no hay materia seleccionada", async () => {
    const { result } = renderHook(() =>
      useCrearEvento()
    );

    await act(async () => {
      result.current.setHoraInicio("08:00");
      result.current.setHoraFin("09:00");
      result.current.setIdMateria("");
    });

    let ok: boolean;

    await act(async () => {
      ok = await result.current.submit();
    });

    expect(ok!).toBe(false);
    expect(result.current.error).toBe(
      "Seleccioná una materia"
    );
  });
    it("debe crear evento correctamente", async () => {
    (crearEvento as jest.Mock).mockResolvedValue({});

    const { result } = renderHook(() =>useCrearEvento());

    await act(async () => {
      result.current.setHoraInicio("08:00");
      result.current.setHoraFin("09:00");
      result.current.setFecha("2026-01-01");
      await result.current.cambiarCarrera("1");
      result.current.setIdMateria("1");
      result.current.setIdAula("1");
      result.current.setIdTipoEvento("1");

      (result.current as any).materias = [
        { id_materia: 1, nombre: "Mat" },
      ];
    });

    let ok: boolean;
    await act(async () => {ok = await result.current.submit();});
    expect(crearEvento).toHaveBeenCalled();
    expect(ok!).toBe(true);
    expect(result.current.exito).toBe(
      "Evento creado correctamente"
    );
  });
});

