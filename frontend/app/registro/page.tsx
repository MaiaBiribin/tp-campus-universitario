"use client"
import { useRouter } from "next/navigation";

export default function Registrarse(){
  const ruta=useRouter();
  
  async function MandarDatos(event:React.FormEvent<HTMLFormElement>){
    event.preventDefault(); //evita que se recargue la pagina = Por defecto los formularios HTML recargan la página — esto lo cancela.

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
        alert("Tu usuario fue creado correctamente. El administrador debe habilitarlo antes de que puedas ingresar.");
        ruta.push("/login");
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
   <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden p-8 flex flex-col justify-between font-sans antialiased">
   <main className="relative flex flex-col grow justify-between">
      <header className="flex justify-between items-start w-full">
        <h1 className="text-3xl font-extrabold tracking-tight">Crea tu nueva cuenta</h1>
        <p className="leading-relaxed">completa tus datos para registrarte en AulaAsync</p>
      </header>
     
      <form onSubmit={MandarDatos} 
       className="flex flex-col grow justify-between " >
        <label htmlFor="dni">DNI</label>
        <input 
         type="number"
         name="dni" //imporante que quede asi para el backend
         id="Dni"
         placeholder="Ej:456495"
         required
        />
        <br />
        <label htmlFor="Email">Correo Electronico</label>
        <input 
         type="email"
         name="mail" //imporante que quede asi para el backend
         id="Email"
         placeholder="Ej:aula@gmail.com"
         required
        />
        <br />
        <label htmlFor="contraseña">Contraseña</label>
        <input 
         type="password" 
         name="contrasena" //imporante que quede asi para el backend
         id="Contraseña"
         placeholder="****"
         required
        />
        <button type="submit">Crear cuenta</button>
      </form>
    </main>
  
    </div>
  );
}
