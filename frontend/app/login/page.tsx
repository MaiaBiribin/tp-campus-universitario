"use client";

import {useRouter,useSearchParams} from "next/navigation";
import Link from "next/link";
import { api } from "../api";
import layout from "../styles/layout.module.css";
import forms from "../styles/forms.module.css";
import Button from "../components/button";
import Card from "../components/card";
import Form from "../components/form";

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const accesoDenegado =
    searchParams.get("acceso") === "denegado";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const datos = Object.fromEntries(formData.entries());

    const response = await api("/auth/login", {
      method: "POST",
      body: JSON.stringify({
        mail: datos.mail,
        contrasena: datos.contrasena,
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      alert(err.message || "Error login");
      return;
    }

    const data = await response.json();

    // guardar para el proxy
    document.cookie =
   `token=${data.access_token}; path=/`;

    // guardar para api.ts
    localStorage.setItem(
    "token",
     data.access_token
    );

    const payload = JSON.parse(
      atob(
    data.access_token.split(".")[1]
    )
    );
    console.log("PAYLOAD COMPLETO:", payload);
    console.log("TOKEN PAYLOAD:", payload);

    alert(`Bienvenido ${payload.nombre}`);

    if (payload.rol === "Admin") {
      router.push("/dashboard/admin");
    } else if (payload.rol === "Profesor") {
      router.push("/dashboard/docente");
    } else if (payload.rol === "Alumno") {
      router.push("/dashboard/estudiante");
    } else {
      alert("Rol desconocido: " + payload.rol);
    }
  }

return(
<div className={layout.centeredPage}>
  <Form
  title="Iniciar sesión"
  description="Ingresá tu mail y contraseña para acceder al sistema."
  onSubmit={handleSubmit}
  >
    {accesoDenegado&&(
      <Card>
        Debés iniciar sesión.
      </Card>
    )}
  <div>
    <label>
      Correo electrónico
    </label>
    <input
    type="email"
    name="mail"
    required
    placeholder="Ej: aula@gmail.com"
    className={forms.input}
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
        className={forms.input}
        />
    </div>
    <Button>
      Ingresar
      </Button>
      <p className={forms.formFooter}>
        ¿No tenés usuario?
        <Link href="/registro">
        Creá una cuenta
        </Link>
      </p>
      </Form>
    </div>
    );
  }