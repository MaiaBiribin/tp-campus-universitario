"use client";

import { useRouter } from "next/navigation";
import {registrarUsuario} from "../services/auth";
import Link from "next/link";
import Form from "../components/ui/form";
import Button from "../components/ui/button";
import layout from "../styles/layout.module.css";
import forms from "../styles/forms.module.css";

export default function Registrarse() {
  const ruta = useRouter();
  async function MandarDatos(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    const formData =new FormData(event.currentTarget);
    const datosUsuario =Object.fromEntries(formData.entries());
    try {
      const response =await registrarUsuario({
        nombre: String(datosUsuario.nombre),
        apellido:String(datosUsuario.apellido),
        mail:String(datosUsuario.mail),
        dni:String(datosUsuario.dni),contrasena:
        String(datosUsuario.contrasena),
      });
      if (response.ok) {
        alert("Solicitud creada. Esperá a que un administrador apruebe tu registro.");
        ruta.push("/login");
      } else {
        const errorData =await response.json().catch(() => ({}));
        alert(errorData.message ||"Hubo un error en el registro.");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:",error);
      alert("Hubo un problema al conectar con el servidor.");
    }
  }

  return (
    <div
      className={
        layout.centeredPage
      }
    >
      <Form
        title="Crear cuenta"
        description="Completá tus datos para solicitar acceso al sistema."
        onSubmit={
          MandarDatos
        }
      >
        <div>
          <label>
            Nombre
          </label>
          <input
            type="text"
            name="nombre"
            required
            placeholder="Ej: Juana"
            className={
              forms.input
            }
          />
        </div>
        <div>
          <label>
            Apellido
          </label>
          <input
            type="text"
            name="apellido"
            required
            placeholder="Ej: Pérez"
            className={
              forms.input
            }
          />
        </div>
        <div>
          <label>
            DNI
          </label>
          <input
            type="number"
            name="dni"
            required
            placeholder="Ej: 45649587"
            className={
              forms.input
            }
          />
        </div>
        <div>
          <label>
            Correo electrónico
          </label>
          <input
            type="email"
            name="mail"
            required
            placeholder="Ej: alumno@universidad.edu"
            className={
              forms.input
            }
          />
        </div>
        <div>
          <label>
            Contraseña
          </label>
          <input
            type="password"
            name="contrasena"
            required
            placeholder="********"
            className={
              forms.input
            }
          />
        </div>
        <Button
          type="submit"
        >
          Solicitar registro
        </Button>
        <p
          className={
            forms.formFooter
          }
        >
          ¿Ya tenés una cuenta?
          <Link
            href="/login"
          >
            Iniciá sesión
          </Link>
        </p>
      </Form>
    </div>
  );
}