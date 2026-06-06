"use client";

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
    <div className="relative min-h-screen bg-[#070b19] text-white p-4 flex items-center justify-center font-sans antialiased">
      <main className="bg-[#0d1527] border border-[#1e293b] rounded-2xl p-8 md:p-12 max-w-lg w-full shadow-2xl flex flex-col items-center">
        <header className="flex flex-col items-center text-center mb-8 w-full"> 
          <div >
          <h1  className="text-2xl font-bold text-white mb-2" >Iniciar sesion</h1>
          </div>
          <div >
          <p className="text-sm text-slate-400 leading-relaxed">ingrese su mail y contraseña de la pagina</p>
          </div>
        </header>

       <form className="w-full flex flex-col gap-5"  onSubmit={handleSubmit}>
          <label htmlFor="usuario" className="text-sm font-medium text-slate-300 block mb-1.5">Email:</label>
         <input
          type="Email" 
          name="mail" 
          id="Email" 
          placeholder="Ej:Aula@gmail.com"
          required 
          className="w-full bg-[#090f1c] border border-[#1e293b] rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#6366f1] transition-colors"
          />
         <br/>
         <label htmlFor="contraseña" className="text-sm font-medium text-slate-300 block mb-1.5">contraseña</label>
         <input 
          type="password"
          name="contrasena"
          id="contraseña"
          placeholder="Ej:*****"
          required
          className="w-full bg-[#090f1c] border border-[#1e293b] rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#6366f1] transition-colors"
          ></input>
          <br />
         <button  type="submit" className="w-full bg-[#5842e3] hover:bg-[#4732c8] text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors mt-4 shadow-lg shadow-[#5842e3]/20">
         Ingresar
         </button>
        
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
