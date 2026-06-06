"use client";
import { useRouter } from "next/navigation";




export default function Registrarse(){
  const ruta=useRouter();
  
  async function MandarDatos(event:React.FormEvent<HTMLFormElement>){
    event.preventDefault(); 

    const formData = new FormData(event.currentTarget); 
    const datosUsuario = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("http://localhost:4000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({
          mail: datosUsuario.mail,
          dni: datosUsuario.dni,
          contrasena: datosUsuario.contrasena,
        }),
      });

      if (response.ok) {
        alert("solicitud creada,espera a que el administrador acepta la solicitud.")
         ruta.push("/login")
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(errorData.message || "Hubo un error en el registro.");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      alert("Hubo un problema al conectar con el servidor.");
    }

  }
  
  
  return (
   <div className="relative min-h-screen bg-[#070b19] text-white p-4 flex items-center justify-center font-sans antialiased">
   <main className="bg-[#0d1527] border border-[#1e293b] rounded-2xl p-8 md:p-12 max-w-lg w-full shadow-2xl flex flex-col items-center" >
      <header className="flex flex-col items-center text-center mb-8 w-full" >
        <h1 className="text-2xl font-bold text-white mb-2">Crea tu nueva cuenta</h1>
        <p className="text-sm text-slate-400 leading-relaxed">completa tus datos para registrarte en AulaAsync</p>
      </header>
     
      <form onSubmit={MandarDatos} 
       className="w-full flex flex-col gap-5" >
        <label htmlFor="dni" className="text-sm font-medium text-slate-300 block mb-1.5">DNI</label>
        <input 
         type="number"
         name="dni" //imporante que quede asi para el backend
         id="Dni"
         placeholder="Ej:456495"
         required
        className="w-full bg-[#090f1c] border border-[#1e293b] rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#6366f1] transition-colors"
        />
        <br />
        <label htmlFor="Email" className="text-sm font-medium text-slate-300 block mb-1.5">Correo Electronico</label>
        <input 
         type="email"
         name="mail" //imporante que quede asi para el backend
         id="Email"
         placeholder="Ej:aula@gmail.com"
         required
         className="w-full bg-[#090f1c] border border-[#1e293b] rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#6366f1] transition-colors"
        />
        <br />
        <label htmlFor="contraseña" className="text-sm font-medium text-slate-300 block mb-1.5">Contraseña</label>
        <input 
         type="password" 
         name="contrasena" //imporante que quede asi para el backend
         id="Contraseña"
         placeholder="****"
         required
         className="w-full bg-[#090f1c] border border-[#1e293b] rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#6366f1] transition-colors"
        />
        <button type="submit" className="w-full bg-[#5842e3] hover:bg-[#4732c8] text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors mt-4 shadow-lg shadow-[#5842e3]/20">Crear cuenta</button>
      </form>
    </main>
  
    </div>
  );
}
