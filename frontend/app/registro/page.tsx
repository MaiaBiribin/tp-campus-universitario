import { useRouter } from "next/router";
import { SubmitEvent } from "react";



export default function Registrarse(){
  const ruta=useRouter();
  
  async function MandarDatos(event:SubmitEvent<HTMLFormElement>){
    event.preventDefault(); 

    const formData = new FormData(event.currentTarget); // 
    const datosUsuario = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("http://localhost/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosUsuario),
      });

      if (response.ok) {
        alert("su usario fue creado corectamente,el administrador tiene que confirmar al usario.")
         const respuestaAdmin=await fetch("")
          
         if(respuestaAdmin){
          ruta.push("/estudiante") ;
         }else{
          console.error("no se admitio el usario.")
         }
        
      } else {
        alert("Hubo un error en el registro.");
      
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
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
         name="Dni"
         id="Dni"
         placeholder="Ej:456495"
         required
        />
        <br />
        <label htmlFor="Email">Correo Electronico</label>
        <input 
         type="email"
         name="email"
         id="Email"
         placeholder="Ej:aula@gmail.com"
         required
        />
        <br />
        <label htmlFor="contraseña">Contraseña</label>
        <input 
         type="password" 
         name="contraseña"
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
