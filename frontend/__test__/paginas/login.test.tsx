import Login from "@/app/login/page";
import { render, screen, waitFor } from "@testing-library/react";
import { login, guardarSesion } from "@/app/services/auth";
import { ROLES } from "@/app/lib/roles";
import { decodeToken } from "@/app/lib/auth";
import { useRouter, useSearchParams } from "next/navigation";
import userEvent from "@testing-library/user-event";


const globalMockPush = jest.fn();

let mockGetparam = jest.fn();


jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: globalMockPush
  }),

  useSearchParams: () => ({
    get: mockGetparam
  })
}));


jest.mock("@/app/services/auth", () => ({
  login: jest.fn(),
  guardarSesion: jest.fn()
}));


jest.mock("@/app/lib/auth", () => ({
  decodeToken: jest.fn()
}));



describe("Pagina Login <Login>",()=>{


beforeEach(()=>{

  jest.clearAllMocks();

  mockGetparam.mockReturnValue(null);

});



it("poder renderizar la pagina login",()=>{

  mockGetparam.mockReturnValue("denegado");

  render(<Login />);


  expect(
    screen.getByText(/ingresá tu mail y contraseña/i)
  ).toBeInTheDocument();


  expect(
    screen.getByPlaceholderText("Ej: aula@gmail.com")
  ).toBeInTheDocument();


  expect(
    screen.getByPlaceholderText("********")
  ).toBeInTheDocument();


  expect(
    screen.getByRole("button",{name:/Ingresar/i})
  ).toBeInTheDocument();


  expect(
    screen.getByText(/Debés iniciar sesión/i)
  ).toBeInTheDocument();

});



it("deberia poder loguear exitosamente, guardar token y enviar al dashboard", async()=>{


(login as jest.Mock).mockResolvedValue({

  ok:true,

  json:async()=>({
    access_token:"token_valido"
  })

});


(decodeToken as jest.Mock).mockReturnValue({

  rol:ROLES.DOCENTE

});


render(<Login />);


const user = userEvent.setup();


await user.type(
  screen.getByPlaceholderText("Ej: aula@gmail.com"),
  "Alonzo@gmail.com"
);


await user.type(
  screen.getByPlaceholderText("********"),
  "12345"
);


await user.click(
  screen.getByRole("button",{name:/Ingresar/i})
);



expect(login).toHaveBeenCalledWith(
  "Alonzo@gmail.com",
  "12345"
);



await waitFor(()=>{


expect(
  guardarSesion
).toHaveBeenCalledWith("token_valido");


expect(
  decodeToken
).toHaveBeenCalledWith("token_valido");


expect(
  globalMockPush
).toHaveBeenCalledWith("/dashboard/docente");


});


});



it("debería mostrar error si las credenciales son incorrectas", async()=>{


(login as jest.Mock).mockResolvedValue({

  ok:false,

  json:async()=>({
    message:"Credenciales inválidas"
  })

});


render(<Login />);


const user = userEvent.setup();



await user.type(
 screen.getByPlaceholderText("Ej: aula@gmail.com"),
 "error@gmail.com"
);


await user.type(
 screen.getByPlaceholderText("********"),
 "claveErronea"
);
await user.click(screen.getByRole("button",{name:/Ingresar/i}));
await waitFor(()=>{
expect(screen.getByText("Credenciales inválidas")).toBeInTheDocument();
expect(globalMockPush).not.toHaveBeenCalled();

});
});
});
