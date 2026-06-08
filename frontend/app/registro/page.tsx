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
          nombre : datosUsuario.nombre,
          apellido : datosUsuario.apellido,
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
    <main className="bg-[#0d1527] border border-[#1e293b] rounded-2xl p-8 md:p-12 max-w-lg w-full shadow-2xl flex flex-col items-center">

      <header className="flex flex-col items-center text-center w-full mb-10">
        <h1 className="text-2xl font-bold text-white mb-3">
          Crear cuenta
        </h1>

        <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
          Completá tus datos para solicitar acceso al sistema.
        </p>
      </header>

      <form
        onSubmit={MandarDatos}
        className="w-full flex flex-col gap-8"
      >
        <div>
          <label
            htmlFor="dni"
            className="block text-sm font-medium text-slate-300 mb-2"
          >
            DNI
          </label>

          <input
            type="number"
            name="dni"
            id="dni"
            placeholder="Ej: 45649587"
            required
            className="w-full bg-[#090f1c] border border-[#1e293b] rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#6366f1] transition-colors"
          />
        </div>

        <div>
          <label
            htmlFor="mail"
            className="block text-sm font-medium text-slate-300 mb-2"
          >
            Correo electrónico
          </label>

          <input
            type="email"
            name="mail"
            id="mail"
            placeholder="Ej: alumno@universidad.edu"
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
          Solicitar registro
        </button>

        <p className="text-center text-slate-400 text-sm">
          ¿Ya tenés una cuenta?
          <a
            href="/login"
            className="text-[#8b5cf6] hover:text-[#a78bfa] ml-1 font-medium"
          >
            Iniciá sesión
          </a>
        </p>

        <div className="mt-4 pt-5 border-t border-[#1e293b]">
          <p className="text-center text-sm text-slate-500 leading-relaxed">
            Tu solicitud quedará pendiente hasta que un administrador la apruebe.
            Una vez habilitada, podrás iniciar sesión en el sistema.
          </p>
        </div>
      </form>

    </main>
  </div>
);
}
