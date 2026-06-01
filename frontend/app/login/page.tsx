import { redirect } from "next/navigation"
import Link from "next/link"
export default function Home(){
  return (
    <div id="inicio">
    <p>bienvenido a nuestra app por favor ingrese su usuario</p>
    <p>Por favor ingrse su usuario</p>
     <form id="forum" action={async (formData) => {
        'use server'
        const usuario = formData.get('usuario')
        console.log("Usuario ingresado:", usuario)

        redirect("/paginaPrincial/estudiantes/home")
      }}>
        <label htmlFor="usuario">Usuario:</label>
        <input 
          type="text" 
          name="usuario" 
          id="usuario" 
          placeholder="Ej:pedro"
          required 
        />
        <br/>
        <label htmlFor="contraseña">contraseña</label>
        <input
          type="password"
          name="contraseña"
          id="contraseña"
          placeholder="Ej:*****"
          required
          ></input>
          <br />
        <button type="submit">Ingresar</button>
        
        <br />
       
        <Link href={"/registro"}
         className="flex items center gap-2 font-medium text-lg text-white">
          no tines usario? crea uno
        </Link>
      
      </form>
    </div>
  )
}