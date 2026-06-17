import {render,screen, within} from "@testing-library/react"
import Home from "@/app/page"
import '@testing-library/jest-dom'


describe("pagina principal <home>",()=>{
   it("pagina principal",()=>{
    render(<Home />) 
    
     const TituloCompleto=screen.getByRole("heading",{
       level:1,
       name:(content)=>{
         const textoLimpio=content.replace(/\s+/g, ' ').trim()
         return /Bienvenido a AulaSync/i.test(textoLimpio)
       }
     } )
    expect(TituloCompleto).toBeInTheDocument()
   })

   it("que se pueda renderizar bien el titulo gestion de eventos y su contenido",()=>{
      render(<Home />)
     
      const ContendorGestion=screen.getByRole("heading",{name:"Gestión de eventos"})

      const contendorCard=ContendorGestion.closest("div")

      if(!contendorCard){
        throw new Error("no se pudo encontrar el card del contenedor")
      }
      
      expect(
        within(contendorCard).getByText("Organizá y asigná eventos académicos")
      )
   })

    it("que se pueda renderizar bien el titulo aulas disponibles y su contenido",()=>{
      render(<Home />)
     
      const ContendorAulas=screen.getByRole("heading",{name:"Aulas disponibles"})

      const contendorCard=ContendorAulas.closest("div")

      if(!contendorCard){
        throw new Error("no se pudo encontrar el card del contenedor")
      }
      
      expect(
        within(contendorCard).getByText("Asignación inteligente sin conflictos horarios")
      )
   })

    it("que se pueda renderizar bien el titulo notificaciones y su contenido",()=>{
      render(<Home />)
     
      const ContendorNoti=screen.getByRole("heading",{name:"Notificaciones"})

      const contendorCard=ContendorNoti.closest("div")

      if(!contendorCard){
        throw new Error("no se pudo encontrar el card del contenedor")
      }
      
      expect(
        within(contendorCard).getByText("Enterate de cambios y avisos importantes")
      )
   })



    it("que se pueda renderizar bien el titulo para todos y su contenido",()=>{
      render(<Home />)
     
      const ContendorTodos=screen.getByRole("heading",{name:"Para todos"})

      const contendorCard=ContendorTodos.closest("div")

      if(!contendorCard){
        throw new Error("no se pudo encontrar el card del contenedor")
      }
      
      expect(
        within(contendorCard).getByText("Estudiantes, docentes y administradores")
      )
   })

   it("que la etiqueta link funcione adequadamente",()=>{
      render(<Home />)
     
      const enlanceLogin=screen.getByRole("link",{name:/Ingresar/i})

      expect(enlanceLogin).toHaveAttribute("href","/login")
   })

})