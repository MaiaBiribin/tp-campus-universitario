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

        if (payload.rol === "admin") {
          ruta.push("/administrador/home");
        } else if (payload.rol === "profesor") {
          ruta.push("/profesor/home");
        } else if (payload.rol === "alumno") {
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

      <header className="flex flex-col items-center text-center w-full mb-10">
        <h1 className="text-2xl font-bold text-white mb-3">
          Iniciar sesión
        </h1>

        <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
          Ingresá tu mail y contraseña para acceder al sistema.
        </p>
      </header>

      <form
        className="w-full flex flex-col gap-8"
        onSubmit={handleSubmit}
      >
        <div>
          <label
            htmlFor="mail"
            className="block text-sm font-medium text-slate-300 mb-2"
          >
            Mail
          </label>

          <input
            type="email"
            name="mail"
            id="mail"
            placeholder="Ej: aula@gmail.com"
            required
            className="w-full bg-[#090f1c] border border-[#1e293b] rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#6366f1] transition-colors"
          />
        </div>

        <div>
          <label
            htmlFor="contrasena"
            className="block text-sm font-medium text-slate-300 mb-2"
          >
            Contraseña
          </label>

          <input
            type="password"
            name="contrasena"
            id="contrasena"
            placeholder="••••••••"
            required
            className="w-full bg-[#090f1c] border border-[#1e293b] rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#6366f1] transition-colors"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#5842e3] hover:bg-[#4732c8] text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center transition-colors mt-2 shadow-lg shadow-[#5842e3]/20"
        >
          Ingresar
        </button>

        <p className="text-center text-slate-400 text-sm">
          ¿No tenés usuario?
          <Link
            href="/registro"
            className="text-[#8b5cf6] hover:text-[#a78bfa] ml-1 font-medium"
          >
            Creá una cuenta
          </Link>
        </p>

        <div className="mt-4 pt-5 border-t border-[#1e293b]">
          <p className="text-center text-sm text-slate-500 leading-relaxed">
            Los usuarios deben ser aprobados por un administrador antes de poder iniciar sesión.
          </p>
        </div>
      </form>

    </main>
  </div>
)
}