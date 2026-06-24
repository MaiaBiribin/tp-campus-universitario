import { renderHook, act, waitFor } from "@testing-library/react";
import { useAsignacionAcademica } from "@/app/hooks/useAsignacionAcademica";

import { getCarreras } from "@/app/services/carreras";
import { getMateriasPorCarrera } from "@/app/services/materias";
import {
  getInscripcionesPorMateria,
  inscribirUsuarios as inscribirUsuariosService,
  obtenerIdsUsuariosInscriptos,
} from "@/app/services/inscripciones";
import { getUsuariosHabilitados } from "@/app/services/usuarios";

jest.mock("@/app/services/carreras", () => ({
  getCarreras: jest.fn(),
}));

jest.mock("@/app/services/materias", () => ({
  getMateriasPorCarrera: jest.fn(),
}));

jest.mock("@/app/services/inscripciones", () => ({
  getInscripcionesPorMateria: jest.fn(),
  inscribirUsuarios: jest.fn(),
  obtenerIdsUsuariosInscriptos: jest.fn(),
}));

jest.mock("@/app/services/usuarios", () => ({
  getUsuariosHabilitados: jest.fn(),
}));

describe("useAsignacionAcademica", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const render = () => renderHook(() => useAsignacionAcademica());

  it("carga carreras, usuarios y materias iniciales", async () => {
    (getCarreras as jest.Mock).mockResolvedValue([
      { id_carrera: 1, nombre: "Ing" },
    ]);

    (getUsuariosHabilitados as jest.Mock).mockResolvedValue([
      { id_usuario: 1, nombre: "Juan" },
    ]);

    (getMateriasPorCarrera as jest.Mock).mockResolvedValue([
      { id_materia: 10, nombre: "Mat" },
    ]);

    const { result } = render();

    await waitFor(() => {
      expect(result.current.cargando).toBe(false);
    });

    expect(result.current.carreras).toHaveLength(1);
    expect(result.current.usuarios).toHaveLength(1);
    expect(result.current.materias).toHaveLength(1);
  });

  it("cambia carrera y recarga materias", async () => {
    (getMateriasPorCarrera as jest.Mock).mockResolvedValue([
      { id_materia: 2, nombre: "Fisica" },
    ]);

    const { result } = render();

    await waitFor(() => expect(result.current.cargando).toBe(false));

    await act(async () => {
      await result.current.cambiarCarrera(2);
    });

    expect(getMateriasPorCarrera).toHaveBeenCalledWith(2);
    expect(result.current.carreraSeleccionada).toBe(2);

    await waitFor(() => {
      expect(result.current.materias).toHaveLength(1);
    });
  });

  it("carga usuarios inscriptos", async () => {
    (getInscripcionesPorMateria as jest.Mock).mockResolvedValue([
      { id_usuario: 1 },
      { id_usuario: 2 },
    ]);

    (obtenerIdsUsuariosInscriptos as jest.Mock).mockReturnValue([1, 2]);

    const { result } = render();

    await waitFor(() => expect(result.current.cargando).toBe(false));

    await act(async () => {
      await result.current.cargarUsuariosInscriptos(10);
    });

    expect(getInscripcionesPorMateria).toHaveBeenCalledWith(10);
    expect(result.current.usuariosInscriptos).toEqual([1, 2]);
  });

  it("agrega y quita usuarios seleccionados", () => {
    const { result } = render();

    act(() => {
      result.current.toggleUsuario(1);
    });

    expect(result.current.usuariosSeleccionados).toContain(1);

    act(() => {
      result.current.toggleUsuario(1);
    });

    expect(result.current.usuariosSeleccionados).not.toContain(1);
  });

  it("inscribe usuarios correctamente", async () => {
    (inscribirUsuariosService as jest.Mock).mockResolvedValue({});

    const { result } = render();

    act(() => {
      result.current.toggleUsuario(1);
      result.current.toggleUsuario(2);
    });

    await act(async () => {
      await result.current.inscribirUsuarios(10);
    });

    expect(inscribirUsuariosService).toHaveBeenCalledWith(10, [1, 2]);
    expect(result.current.exito).toContain("inscripto");
    expect(result.current.usuariosSeleccionados).toEqual([]);
  });

  it("muestra error si no hay usuarios seleccionados", async () => {
    const { result } = render();

    await act(async () => {
      await result.current.inscribirUsuarios(10);
    });

    expect(result.current.error).toBe("Seleccioná usuarios");
  });
});