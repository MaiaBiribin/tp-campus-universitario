import Registrarse from "@/app/registro/page";
import { registrarUsuario } from "@/app/services/auth";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";


const globalMockPush = jest.fn();
jest.mock("@/services/auth", () => ({
  registrarUsuario: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: globalMockPush,
  }),
}));


describe("Pagina registro", () => {
  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it("poder renderizar el formulario de registro", () => {
    render(<Registrarse />);
    expect(
      screen.getByRole("heading", {
        name: /Crear cuenta/i
      })
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Ej: Juana")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Ej: Pérez")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Ej: 45649587")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Ej: alumno@universidad.edu")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("********")).toBeInTheDocument();
    expect(screen.getByRole("button", {name:/Solicitar registro/i})).toBeInTheDocument();
  });

  it("registra usuario correctamente y muestra mensaje de éxito", async()=>{
    jest.useFakeTimers();
    (registrarUsuario as jest.Mock).mockResolvedValue({ok:true});
    const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
    render(<Registrarse/>);
    await user.type(screen.getByPlaceholderText("Ej: Juana"),"Felipe");
    await user.type(screen.getByPlaceholderText("Ej: Pérez"),"Gomez");
    await user.type(
      screen.getByPlaceholderText("Ej: 45649587"),
      "39888777"
    );
    await user.type(
      screen.getByPlaceholderText("Ej: alumno@universidad.edu"),
      "felipe@gmail.com"
    );
    await user.type(
      screen.getByPlaceholderText("********"),
      "123456"
    );
    await user.click(
      screen.getByRole("button", {
        name:/Solicitar registro/i
      })
    );
    expect(registrarUsuario)
      .toHaveBeenCalledWith({
        nombre:"Felipe",
        apellido:"Gomez",
        dni:"39888777",
        mail:"felipe@gmail.com",
        contrasena:"123456"
      });
    await waitFor(() => {
  expect(screen.getByText("Solicitud creada. Esperá a que un administrador apruebe tu registro.")).toBeInTheDocument();});
  jest.advanceTimersByTime(2000);
  await waitFor(() => {expect(globalMockPush).toHaveBeenCalledWith("/login");});
  });

  it("muestra error cuando backend devuelve mensaje", async()=>{
    (registrarUsuario as jest.Mock)
      .mockResolvedValue({
        ok:false,
        json: async()=>({
          message:"El mail ya existe"
        })
      });
    const user = userEvent.setup();
    render(<Registrarse/>);
    await user.type(
      screen.getByPlaceholderText("Ej: Juana"),
      "Juan"
    );
    await user.type(
      screen.getByPlaceholderText("Ej: Pérez"),
      "Perez"
    );
    await user.type(
      screen.getByPlaceholderText("Ej: 45649587"),
      "11111111"
    );
    await user.type(
      screen.getByPlaceholderText("Ej: alumno@universidad.edu"),
      "juan@gmail.com"
    );

    await user.type(screen.getByPlaceholderText("********"),"1234");
    await user.click(
      screen.getByRole("button",{
        name:/Solicitar registro/i
      })
    );

    expect(await screen.findByText("El mail ya existe")).toBeInTheDocument();
  });

  it("muestra error genérico cuando backend rechaza sin mensaje", async()=>{
    (registrarUsuario as jest.Mock)
      .mockResolvedValue({
        ok:false,
        json:async()=>({})
      });
    const user=userEvent.setup();
    render(<Registrarse/>);
    await user.type(
      screen.getByPlaceholderText("Ej: Juana"),
      "Ana"
    );
    await user.type(
      screen.getByPlaceholderText("Ej: Pérez"),
      "Lopez"
    );
    await user.type(
      screen.getByPlaceholderText("Ej: 45649587"),
      "22222222"
    );
    await user.type(
      screen.getByPlaceholderText("Ej: alumno@universidad.edu"),
      "ana@gmail.com"
    );
    await user.type(
      screen.getByPlaceholderText("********"),
      "1234"
    );
    await user.click(screen.getByRole("button",{name:/Solicitar registro/i}));

    expect(await screen.findByText("Hubo un error en el registro.")).toBeInTheDocument();
  });

  it("muestra error cuando falla la conexión", async()=>{
    (registrarUsuario as jest.Mock)
      .mockRejectedValue(
        new Error("fallo")
      );
    const user=userEvent.setup();
    render(<Registrarse/>);
    await user.type(screen.getByPlaceholderText("Ej: Juana"),"Maria");
    await user.type(
      screen.getByPlaceholderText("Ej: Pérez"),
      "Lopez"
    );
    await user.type(screen.getByPlaceholderText("Ej: 45649587"),"33333333");
    await user.type(screen.getByPlaceholderText("Ej: alumno@universidad.edu"),"maria@gmail.com");
    await user.type(
      screen.getByPlaceholderText("********"),
      "1234"
    );
    await user.click(screen.getByRole("button",{name:/Solicitar registro/i}));

    expect(await screen.findByText("Hubo un problema al conectar con el servidor.")).toBeInTheDocument();
  });

  it("el link hacia login funciona",()=>{
    render(<Registrarse/>);
    const link = screen.getByRole("link",{name:/Iniciá sesión/i});
    expect(link).toHaveAttribute("href","/login");
  });
});