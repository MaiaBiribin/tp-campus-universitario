import Login from "@/app/login/page";
import { render,screen, waitFor } from "@testing-library/react";
import { login,guardarSesion} from "@/app/services/auth";
import { ROLES } from "@/app/lib/roles";
import { decodeToken } from "@/app/lib/auth";
import { useRouter,useSearchParams } from "next/navigation";
import userEvent from "@testing-library/user-event";


const globalMockPush=jest.fn()
let mockGetparam=jest.fn()

jest.mock("next/navigation",()=>({
    useRouter:()=>({
        push:globalMockPush
    }),
   useSearchParams:()=>({
     get:mockGetparam
   })
    
}))

jest.mock("@/services/auth",()=>({
    login:jest.fn(),
    guardarSesion:jest.fn()
}))

jest.mock("@/lib/auth",()=>({
    decodeToken:jest.fn()
}))

describe("Pagina Login <Login>",()=>{

       beforeEach(()=>{
        jest.clearAllMocks()
        jest.spyOn(window,"alert").mockImplementation(()=>{})

        mockGetparam.mockReturnValue(null)

        Object.defineProperty(window,"localStorage",{
           value:{setItem:jest.fn()},
           writable:true
        })
       })


    it("poder renderizar la pagina login",()=>{
         mockGetparam.mockReturnValue("denegado");
        
         render(<Login />)

         expect(screen.getByText(/ingresá tu mail y contraseña/i)).toBeInTheDocument()
         expect(screen.getByPlaceholderText("Ej: aula@gmail.com")).toBeInTheDocument()
         expect(screen.getByPlaceholderText("********")).toBeInTheDocument()
         expect(screen.getByRole("button",{name:/Ingresar/i})).toBeInTheDocument()

       expect(screen.getByText(/Debés iniciar sesión/i)).toBeInTheDocument()
    })

    it("deberia poder loguear exitosamente, guardar su token y enviar al dashboard correspondiente", async()=>{
       (login as jest.Mock).mockResolvedValue({
         ok:true,
         json:async()=>({access_token:"token_valido"}),
       });

        (decodeToken as jest.Mock).mockReturnValue({
            rol:ROLES.DOCENTE,
        });

        render(<Login />)
        const usuario=userEvent.setup()

        await usuario.type(screen.getByPlaceholderText("Ej: aula@gmail.com"),"Alonzo@gmail.com")
        await usuario.type(screen.getByPlaceholderText("********"),"12345")
        await usuario.click(screen.getByRole("button",{name:/ingresar/i}))

        expect(login).toHaveBeenCalledWith("Alonzo@gmail.com","12345")

        await waitFor(()=>{
            expect(guardarSesion).toHaveBeenCalledWith("token_valido")
            expect(window.localStorage.setItem).toHaveBeenCalledWith("token","token_valido")
          
            expect(decodeToken).toHaveBeenCalledWith("token_valido")
            expect(globalMockPush).toHaveBeenCalledWith("/dashboard/docente")
        })
    })


    it("debería mostrar un alert si las credenciales son incorrectas", async () => {
    (login as jest.Mock).mockResolvedValue({
      ok: false,
      json: async () => ({ message: "Credenciales inválidas" }),
    });

    render(<Login />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText("Ej: aula@gmail.com"), "error@gmail.com");
    await user.type(screen.getByPlaceholderText("********"), "claveErronea");
    await user.click(screen.getByRole("button", { name: /ingresar/i }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Credenciales inválidas");
      expect(globalMockPush).not.toHaveBeenCalled(); 
    });
  });

})

