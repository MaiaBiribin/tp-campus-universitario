import { render, screen, waitFor } from "@testing-library/react";
import { getAvisosPorEvento } from "@/app/services/avisos";
import { getEventos } from "@/app/services/eventos";
import AvisosRecientes from "@/app/components/avisosRecientes";

jest.mock("@/app/services/avisos",()=>({
  getAvisosPorEvento:jest.fn()
}));

jest.mock("@/app/services/eventos",()=>({
  getEventos:jest.fn()
}));


describe("Componente AvisosRecientes",()=>{

  beforeEach(()=>{
    jest.clearAllMocks();
    jest.spyOn(console,"error")
      .mockImplementation(()=>{});
  });

  afterEach(()=>{
    jest.restoreAllMocks();
  });

  it("muestra mensaje cuando no hay avisos recientes",async()=>{

    (getEventos as jest.Mock)
      .mockResolvedValue([]);
    render(
      <AvisosRecientes/>
    );

    await waitFor(()=>{
      expect(screen.getByText("No hay avisos recientes.")).toBeInTheDocument();});

    expect(getAvisosPorEvento).not.toHaveBeenCalled();
  });

  it("carga avisos correctamente y muestra los primeros 3 ordenados",async()=>{


    (getEventos as jest.Mock).mockResolvedValue([
        {
          id_evento:1,
          titulo:"Parcial"
        },
        {
          id_evento:2,
          titulo:"Clase"
        }
      ]);

    (getAvisosPorEvento as jest.Mock).mockImplementation(
        async(id)=>{
          if(id===1){
            return [
              {
                id_aviso:1,
                mensaje:"Aviso viejo",
                fecha_creacion:"2026-06-01",
                evento:{
                  titulo:"Parcial"
                }
              }
            ];
          }
          if(id===2){
            return [
              {
                id_aviso:2,
                mensaje:"Aviso nuevo",
                fecha_creacion:"2026-06-10",
                evento:{
                  titulo:"Clase"
                }
              }
            ];
          }
          return [];
        }
      );
    render(
      <AvisosRecientes/>
    );
    await waitFor(()=>{
      expect(screen.getByText("Aviso nuevo")).toBeInTheDocument();
    });
    expect(screen.getByText("Aviso viejo")).toBeInTheDocument();
    expect(screen.getByText("Clase")).toBeInTheDocument();
    expect(screen.getByText("Parcial")).toBeInTheDocument();
    expect(getAvisosPorEvento).toHaveBeenCalledTimes(2);
    expect(getAvisosPorEvento).toHaveBeenCalledWith(1);
    expect(getAvisosPorEvento).toHaveBeenCalledWith(2);
  });

  it("muestra solamente los últimos 3 avisos",async()=>{

    (getEventos as jest.Mock).mockResolvedValue([
        {
          id_evento:1,
          titulo:"Evento"
        }
      ]);
    (getAvisosPorEvento as jest.Mock).mockResolvedValue([
        {
          id_aviso:1,
          mensaje:"Aviso 1",
          fecha_creacion:"2026-06-01",
          evento:{
            titulo:"Evento"
          }
        },
        {
          id_aviso:2,
          mensaje:"Aviso 2",
          fecha_creacion:"2026-06-02",
          evento:{
            titulo:"Evento"
          }
        },
        {
          id_aviso:3,
          mensaje:"Aviso 3",
          fecha_creacion:"2026-06-03",
          evento:{
            titulo:"Evento"
          }
        },
        {
          id_aviso:4,
          mensaje:"Aviso 4",
          fecha_creacion:"2026-06-04",
          evento:{
            titulo:"Evento"
          }
        }
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

    (getEventos as jest.Mock).mockResolvedValue([
        {
          id_evento:5,
          titulo:"Evento"
        }
      ]);
    (getAvisosPorEvento as jest.Mock).mockResolvedValue([
        {
          id_aviso:10,
          mensaje:"Sin evento",
          fecha_creacion:"2026-06-20",
          evento:null
        }
      ]);
    render(
      <AvisosRecientes/>
    );

    await waitFor(()=>{
      expect(screen.getByText("Nuevo aviso")).toBeInTheDocument();});
  });

  it("maneja errores cuando falla la carga",async()=>{

    (getEventos as jest.Mock).mockRejectedValue(new Error("fallo"));
    render(
      <AvisosRecientes/>
    );
    await waitFor(()=>{
      expect(console.error).toHaveBeenCalledWith("Error cargando avisos",expect.any(Error));
    });
    expect(
      screen.getByText("No hay avisos recientes.")).toBeInTheDocument();
  });

});