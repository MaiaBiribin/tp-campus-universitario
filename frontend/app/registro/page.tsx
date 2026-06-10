"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import forms from "../styles/forms.module.css";
import cards from "../styles/cards.module.css";
import buttons from "../styles/buttons.module.css";
import layout from "../styles/layout.module.css";
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
        alert("Solicitud creada. Esperá a que un administrador apruebe tu registro.")
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
    <div className={layout.centeredPage}>

      <main className={forms.formCard}>

        {/* HEADER */}
        <header className={layout.header}>
          <h1>Crear cuenta</h1>

          <p>
            Completá tus datos para solicitar acceso al sistema.
          </p>
        </header>

        {/* FORM */}
        <form onSubmit={MandarDatos} className={forms.form}>

          <div>
            <label>Nombre</label>

            <input
              type="text"
              name="nombre"
              placeholder=" Ej: Juana"
              required
              className={forms.input}
            />
          </div>

          <div>
            <label>Apellido</label>

            <input
              type="text"
              name="apellido"
              placeholder=" Ej: Pérez"
              required
              className={forms.input}
            />
          </div>

          <div>
            <label>DNI</label>

            <input
              type="number"
              name="dni"
              placeholder=" Ej: 45649587"
              required
              className={forms.input}
            />
          </div>

          <div>
            <label>Correo electrónico</label>

            <input
              type="email"
              name="mail"
              placeholder=" Ej: alumno@universidad.edu"
              required
              className={forms.input}
            />
          </div>

          <div>
            <label>Contraseña</label>

            <input
              type="password"
              name="contrasena"
              placeholder=" *********** "
              required
              className={forms.input}
            />
          </div>

          {/* BOTÓN */}
          <button type="submit" className={buttons.primary}>
            Solicitar registro
          </button>

          {/* FOOTER */}
          <p className={forms.formFooter}>
            ¿Ya tenés una cuenta?{" "}
            <Link href="/login">Creá una cuenta</Link>
          </p>

        </form>

      </main>

    </div>
  );
}