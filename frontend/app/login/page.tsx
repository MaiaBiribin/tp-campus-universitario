
"use client"
import Link from "next/link"
//import { SubmitEvent } from "react";
import { useRouter } from "next/navigation";


export default function Home(){
  const router=useRouter()

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

        // Decodificamos el token para leer el rol
        const payload = JSON.parse(atob(data.access_token.split('.')[1]));

        alert(`¡Bienvenido ${payload.nombre}!`);

        if (payload.rol === "Admin") {
          router.push("/administrador/home");
        } else if (payload.rol === "Profesor") {
          router.push("/profesor/home");
        } else if (payload.rol === "Alumno") {
          router.push("/alumno/home");
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
  // async function handleSumit(evento:SubmitEvent<HTMLFormElement>){
  //    evento.preventDefault()
  //    const formData =new FormData(evento.currentTarget)
  //    const DatosLogin=Object.fromEntries(formData.entries())
    
  //   try {
      
  //     const response = await fetch("http://localhost:4000/auth/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(DatosLogin), 
  //     });

      
  //     if (response.ok) {
  //       const usuario = await response.json(); 
  //       localStorage.setItem("token", usuario.token)

  //       alert(`¡Bienvenido! Rol: ${usuario.rol}`);

       
  //       if (usuario.rol === "estudiante") {
  //         router.push("/estudiante/home");
  //       } else if (usuario.rol === "profesor") {
  //         router.push("/profesor/home");
  //       } else {
  //         router.push("/dashboard/home"); 
  //       }

  //     } else {
  //       const errorData = await response.json().catch(() => ({}));
  //       alert(errorData.mensaje || "Credenciales incorrectas. Verificá tus datos.");
  //     }
  //   } catch (error) {
  //     console.error("Error al conectar con el servidor:", error);
  //     alert("Hubo un problema al conectar con el servidor.");
  //   }

  // }
  
  
  
  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden p-8 flex flex-col justify-between font-sans antialiased">
      <main className="relative flex flex-col grow justify-between">
            <p>bienvenido a nuestra app por favor ingrese su usuario</p>
            <p>Por favor ingrse su usuario</p>
       <form id="forum" onSubmit={handleSubmit}>
          <label htmlFor="usuario">Email:</label>
         <input 
          type="Email" 
          name="mail" 
          id="Email" 
          placeholder="Ej:Aula@gmail.com"
          required 
          />
         <br/>
         <label htmlFor="contraseña">contraseña</label>
         <input
          type="password"
          name="contrasena"
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