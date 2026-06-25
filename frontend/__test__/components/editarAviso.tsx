import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import EditarAviso from "@/app/components/editarAviso";
import { getAvisoById, editarAviso } from "@/app/services/avisos";
import { useRouter } from "next/navigation";

jest.mock("@/app/services/avisos",()=>({
  getAvisoById: jest.fn(),
  editarAviso: jest.fn(),
}));

jest.mock("next/navigation",()=>({
  useRouter: jest.fn(),
}));

jest.mock("@/app/components/ui/button",()=>({
  default: function MockButton({
    children,
    ...props
  }: any){
    return (
      <button {...props}>
        {children}
      </button>
    );
  }
}));

jest.mock("@/app/components/ui/card",()=>({
  default: function MockCard({
    children
  }:any){
    return (
      <div>
        {children}
      </div>
    );
  }
}));

describe("EditarAviso",()=>{
  const pushMock = jest.fn();
  beforeEach(()=>{
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });
  });

  it("muestra mensaje de carga mientras obtiene el aviso",()=>{
    (getAvisoById as jest.Mock)
      .mockImplementation(
        ()=> new Promise(()=>{})
      );
    render(<EditarAviso idAviso={1}/>);
    expect(
      screen.getByText(
        "Cargando aviso..."
      )
    ).toBeInTheDocument();
  });

  it("carga el aviso y muestra el mensaje actual",async()=>{
    (getAvisoById as jest.Mock).mockResolvedValue({id_aviso:1,mensaje:"Aviso original"});

    render(<EditarAviso idAviso={1}/>);
    expect(await screen.findByDisplayValue("Aviso original")).toBeInTheDocument();
    expect(getAvisoById).toHaveBeenCalledWith(1);
  });

  it("muestra error si no puede cargar el aviso",async()=>{
    (getAvisoById as jest.Mock)
      .mockRejectedValue(
        new Error("error")
      );
    render(<EditarAviso idAviso={1}/>);
    expect(
      await screen.findByText("No se pudo cargar el aviso."
      )
    ).toBeInTheDocument();
  });

  it("valida mensaje vacío antes de guardar",async()=>{
    (getAvisoById as jest.Mock).mockResolvedValue({id_aviso:1,mensaje:""});
    render(<EditarAviso idAviso={1}/>);
    await screen.findByRole("textbox");
    const button =screen.getByRole(
        "button",
        {
          name:"Guardar cambios"
        }
      );
    fireEvent.click(button);
    expect(
      await screen.findByText(
        "Escribí un mensaje."
      )
    ).toBeInTheDocument();
    expect(editarAviso).not.toHaveBeenCalled();
  });

  it("actualiza correctamente un aviso",async()=>{
    jest.useFakeTimers();
    (getAvisoById as jest.Mock)
      .mockResolvedValue({
        id_aviso:1,
        mensaje:"Mensaje viejo"
      });
    (editarAviso as jest.Mock).mockResolvedValue({id_aviso:1,mensaje:"Mensaje nuevo"});
    render(<EditarAviso idAviso={1}/>);
    const input =await screen.findByDisplayValue("Mensaje viejo");
    fireEvent.change(
      input,
      {
        target:{
          value:"Mensaje nuevo"
        }
      }
    );
    fireEvent.click(
      screen.getByRole(
        "button",
        {
          name:"Guardar cambios"
        }
      )
    );
    await waitFor(()=>{
      expect(editarAviso)
        .toHaveBeenCalledWith(
          1,
          "Mensaje nuevo"
        );
    });
    expect(await screen.findByText("Aviso actualizado correctamente.")).toBeInTheDocument();
    jest.advanceTimersByTime(1000);
    expect(pushMock)
      .toHaveBeenCalledWith(
        "/dashboard/docente/avisos"
      );
    jest.useRealTimers();
  });

  it("muestra error si falla la actualización",async()=>{
    (getAvisoById as jest.Mock).mockResolvedValue({id_aviso:1,mensaje:"Mensaje"});
    (editarAviso as jest.Mock).mockRejectedValue(
        new Error("fallo")
      );
    render(<EditarAviso idAviso={1}/>);
    const input =await screen.findByDisplayValue("Mensaje");
    fireEvent.change(
      input,
      {
        target:{
          value:"Cambio"
        }
      }
    );
    fireEvent.click(
      screen.getByRole(
        "button",
        {
          name:"Guardar cambios"
        }
      )
    );
    expect(await screen.findByText("No se pudo actualizar el aviso.")).toBeInTheDocument();
  });
});