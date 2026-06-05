"use client";

"use client"
import Link from "next/link"

import { useRouter } from "next/navigation";

export default function Home(){
  const ruta=useRouter()

 async function handleSubmit(evento: React.FormEvent<HTMLFormElement>){
    evento.preventDefault()
    const formData = new FormData(evento.currentTarget)
    const DatosLogin = Object.fromEntries(formData.entries())
    
    try {
      const response = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mail: DatosLogin.mail,
          contrasena: DatosLogin.contrasena,
        }), 
      });

      if (response.ok) {
        const data = await response.json(); 
        localStorage.setItem("token", data.access_token)

  
        const payload = JSON.parse(atob(data.access_token.split('.')[1]));

        alert(`¡Bienvenido ${payload.nombre}!`);

        if (payload.rol === "Admin") {
          ruta.push("/administrador/home");
        } else if (payload.rol === "Profesor") {
          ruta.push("/profesor/home");
        } else if (payload.rol === "Alumno") {
          ruta.push("/alumno/home");
        }

      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(errorData.message || "Credenciales incorrectas.");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      alert("Hubo un problema al conectar con el servidor.");
    }
  }
  
  
  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden p-8 flex flex-col justify-between font-sans antialiased">
      <main className="relative flex flex-col grow justify-between">
        <header className="flex justify-between items-start w-full"> 
          <div className="flex items-center gap-3">
          <h1 className="text-purple-400 font-sans font-size 20">Iniciar sesion</h1>
          </div>
          <div className="flex items-center gap-3">
          <p className="">ingrese su mail y contraseña de la pagina</p>
          </div>
        </header>

       <form className="relative min-h-screen text-white flex-col justify-between" onSubmit={handleSubmit}>
          <label htmlFor="usuario">Email:</label>
         <input className=""
          type="Email" 
          name="mail" 
          id="Email" 
          placeholder="Ej:Aula@gmail.com"
          required 
          />
         <br/>
         <label htmlFor="contraseña">contraseña</label>
         <input className=""
          type="password"
          name="contrasena"
          id="contraseña"
          placeholder="Ej:*****"
          required
          ></input>
          <br />
         <button className="" type="submit">Ingresar</button>
        
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
