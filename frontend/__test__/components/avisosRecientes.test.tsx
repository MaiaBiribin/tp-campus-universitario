import { render, screen, waitFor } from "@testing-library/react";
import { getAvisos } from "@/app/services/avisos";
import AvisosRecientes from "@/app/components/avisosRecientes";

jest.mock("@/app/services/avisos",()=>({
  getAvisos: jest.fn()
}));

describe("Componente AvisosRecientes",()=>{

  beforeEach(()=>{jest.clearAllMocks();});

  it("muestra mensaje de carga mientras obtiene avisos",()=>{
  (getAvisos as jest.Mock).mockReturnValue(new Promise(()=>{}));
  render(
    <AvisosRecientes/>
  );

  expect(screen.getByText("Cargando avisos...")).toBeInTheDocument();
  });

  it("muestra mensaje cuando no hay avisos recientes",async()=>{

    (getAvisos as jest.Mock)
      .mockResolvedValue([]);
    render(
      <AvisosRecientes/>
    );

    await waitFor(()=>{
      expect(screen.getByText("No hay avisos recientes.")).toBeInTheDocument();});
  });

  it("carga avisos correctamente y muestra los primeros 3 ordenados",async()=>{

    (getAvisos as jest.Mock).mockResolvedValue([{
      id_aviso:1,
      mensaje:"Aviso viejo",
      fecha_creacion:"2026-06-01",
      evento:{titulo:"Parcial"}
    },
    {
      id_aviso:2,
    mensaje:"Aviso nuevo",
    fecha_creacion:"2026-06-10",
    evento:{
      titulo:"Clase"
    }}]);


    render(
      <AvisosRecientes/>
    );
    await waitFor(()=>{
      expect(screen.getByText("Aviso nuevo")).toBeInTheDocument();
    });
    expect(screen.getByText("Aviso viejo")).toBeInTheDocument();
    expect(screen.getByText("Clase")).toBeInTheDocument();
    expect(screen.getByText("Parcial")).toBeInTheDocument()
  });

  it("muestra solamente los últimos 3 avisos",async()=>{

    (getAvisos as jest.Mock).mockResolvedValue([
      {id_aviso:1,mensaje:"Aviso 1",fecha_creacion:"2026-06-01",evento:{titulo:"Evento"}},
      {id_aviso:2,mensaje:"Aviso 2",fecha_creacion:"2026-06-02",evento:{titulo:"Evento"}},
      {id_aviso:3,mensaje:"Aviso 3",fecha_creacion:"2026-06-03",evento:{titulo:"Evento"}},
      {id_aviso:4,mensaje:"Aviso 4",fecha_creacion:"2026-06-04",evento:{titulo:"Evento"}}
    ]);
    render(
      <AvisosRecientes/>
    );
    await waitFor(()=>{
      expect(screen.getByText("Aviso 4")).toBeInTheDocument();});
    expect(screen.queryByText("Aviso 1")).not.toBeInTheDocument();
    expect(screen.getByText("Aviso 4")).toBeInTheDocument();
    expect(screen.getByText("Aviso 3")).toBeInTheDocument();
    expect(screen.getByText("Aviso 2")).toBeInTheDocument();
  });

  it("muestra Nuevo aviso si el aviso no tiene evento",async()=>{

    (getAvisos as jest.Mock).mockResolvedValue([
      {id_aviso:10,mensaje:"Sin evento",fecha_creacion:"2026-06-20",evento:null}
    ]);
    render(
      <AvisosRecientes/>
    );

    await waitFor(()=>{
      expect(screen.getByText("Nuevo aviso")).toBeInTheDocument();});
  });

  it("muestra mensaje de error cuando falla la carga",async()=>{
  (getAvisos as jest.Mock).mockRejectedValue(new Error("fallo"));
  render(
    <AvisosRecientes/>
  );

  await waitFor(()=>{
    expect(screen.getByText("No se pudieron cargar los avisos recientes.")).toBeInTheDocument();
  });});
});