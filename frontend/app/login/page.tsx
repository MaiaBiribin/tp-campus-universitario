
import Link from "next/link"
import { SubmitEvent } from "react";
import { useRouter } from "next/router";


export default function Home(){
  const router=useRouter()
  async function handleSumit(evento:SubmitEvent<HTMLFormElement>){
     evento.preventDefault()
     const formData =new FormData(evento.currentTarget)
     const DatosLogin=Object.fromEntries(formData.entries())
    
    try {
      
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(DatosLogin), 
      });

      
      if (response.ok) {
        const usuario = await response.json(); 
        localStorage.setItem("token", usuario.token)

        alert(`¡Bienvenido! Rol: ${usuario.rol}`);

       
        if (usuario.rol === "estudiante") {
          router.push("/estudiante/home");
        } else if (usuario.rol === "profesor") {
          router.push("/profesor/home");
        } else {
          router.push("/dashboard/home"); 
        }

      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(errorData.mensaje || "Credenciales incorrectas. Verificá tus datos.");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      alert("Hubo un problema al conectar con el servidor.");
    }

  }
  
  
  
  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden p-8 flex flex-col justify-between font-sans antialiased">
      <main className="relative flex flex-col grow justify-between">
            <p>bienvenido a nuestra app por favor ingrese su usuario</p>
            <p>Por favor ingrse su usuario</p>
       <form id="forum" onSubmit={handleSumit}>
          <label htmlFor="usuario">Email:</label>
         <input 
          type="Email" 
          name="email" 
          id="Email" 
          placeholder="Ej:Aula@gmail.com"
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
        
         <br/>
       
         <Link href={"/registro"}
         className="flex items center gap-2 font-medium text-lg text-white">
          no tines usario? crea uno
         </Link>      
       </form>
      </main>
    </div>
  )
}