import Registrarse from "@/app/registro/page";
import { registrarUsuario } from "@/app/services/auth";
import { render,screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import userEvent from "@testing-library/user-event";

 const globalMockPush = jest.fn();

 jest.mock("@/services/auth",()=>({
        registrarUsuario: jest.fn()
    }))

 jest.mock("next/navigation",()=>({
        useRouter:()=>({
            push:globalMockPush
        })
    }))


 describe("Pagina registro",()=>{
    
      let mock=jest.mock;

       beforeEach(()=>{
         jest.clearAllMocks();

        jest.spyOn(window,"alert").mockImplementation(()=>{})
       })
 
       
 it("poder renderizar el formulario de registro",()=>{
    render(<Registrarse/>)

    expect(screen.getByRole("heading",{name:/Crear cuenta/i})).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Ej: Juana")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Ej: Pérez")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Ej: 45649587")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Ej: alumno@universidad.edu")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("********")).toBeInTheDocument()
    expect(screen.getByRole("button",{name:/Solicitar registro/i})).toBeInTheDocument();
 })

    
   
 it("que se pueda llamar al servicio del back y que se manden bien los datos",async ()=>{
   
     (registrarUsuario as jest.Mock).mockResolvedValue({
        ok:true,
     })
   
     render(<Registrarse/>)

     const usuario=userEvent.setup();

      await usuario.type(screen.getByPlaceholderText("Ej: Juana"),"Felipe");
      await usuario.type(screen.getByPlaceholderText("Ej: Pérez"),"Gomez");
      await usuario.type(screen.getByPlaceholderText("Ej: 45649587"),"39888777");
      await usuario.type(screen.getByPlaceholderText("Ej: alumno@universidad.edu"),"FelipieGom@gmail.com")
      await usuario.type(screen.getByPlaceholderText("********"),"284531")

      await usuario.click(screen.getByRole("button",{name:/Solicitar registro/i}))

      expect(registrarUsuario).toHaveBeenCalledTimes(1)
      expect(registrarUsuario).toHaveBeenCalledWith({
        nombre:"Felipe",
        apellido:"Gomez",
        dni:"39888777",
        mail:"FelipieGom@gmail.com",
        contrasena:"284531"
      });
       
     await waitFor(() => {
       expect(screen.getByText("Solicitud creada. Esperá a que un administrador apruebe tu registro.")).toBeInTheDocument()
      expect(globalMockPush).toHaveBeenCalledWith("/login");
    });
 })


 it("que la etiqueta link funcione adequadamente",()=>{
       render(<Registrarse />)
      
       const enlanceLogin=screen.getByRole("link",{name:/Iniciá sesión/i})
 
       expect(enlanceLogin).toHaveAttribute("href","/login")
    })



})