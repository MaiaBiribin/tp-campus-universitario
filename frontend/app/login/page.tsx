"use client";
import {Suspense, useState} from "react";
import {useRouter,useSearchParams} from "next/navigation";
import Link from "next/link";
import {login,guardarSesion,}from "../services/auth";
import { ROLES } from "@/app/lib/roles";
import { decodeToken } from "@/app/lib/auth";
import layout from "../styles/layout.module.css";
import forms from "../styles/forms.module.css";
import Button from "../components/ui/button";
import Card from "../components/ui/card";
import Form from "../components/ui/form";
import React from "react";
/**
 * pagina donde los usuarios ya existentes ingresan sus usuarios.
 * se encarga de verificar que el usuario exista y mandarlo a su respectiva pagina.
 * @returns {JSX.Element} vista del login de la pagina.
 */
const LoginForm=()=> {
  const router = useRouter();
  const searchParams = useSearchParams();
  const accesoDenegado =searchParams.get("acceso") === "denegado";
  const [error,setError] = useState("");
  const [cargando,setCargando] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setCargando(true);

    const formData = new FormData(e.currentTarget);
    const mail = formData.get("mail") as string;
    const contrasena = formData.get("contrasena") as string;
    try {
    const response = await login(mail, contrasena);
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      setError(err.message || "No se pudo iniciar sesión");
      return;
    }

    const data = await response.json();
    guardarSesion(data.access_token);
    const payload = decodeToken(data.access_token);

    if (!payload) {
      setError("Token inválido");
      return;
    }
    const rol = payload.rol;
    const rutas = {
      [ROLES.ADMIN]: "/dashboard/admin",
      [ROLES.DOCENTE]: "/dashboard/docente",
      [ROLES.ESTUDIANTE]: "/dashboard/estudiante",
    } as const;

    router.push(rutas[rol as keyof typeof rutas]);
  } catch {
    setError("No se pudo conectar con el servidor");
  } finally {
    setCargando(false);
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
    {error && (
      <p className={forms.error}>{error}</p>
      )}
    <Button>{cargando ? "Ingresando..." : "Ingresar"}</Button>
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

  export default function Login() {
    return(
      <Suspense fallback={<p>Cargando...</p>}>
        <LoginForm /> 
      </Suspense>
    )
  } 