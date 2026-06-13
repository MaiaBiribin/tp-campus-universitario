"use client";

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

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const accesoDenegado =
    searchParams.get("acceso") === "denegado";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const datos = Object.fromEntries(formData.entries());
    const response =await login(String(datos.mail),String(datos.contrasena));

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      alert(err.message || "Error login");
      return;
    }

    const data = await response.json();
    guardarSesion(data.access_token);

    // guardar para api.ts
    localStorage.setItem(
    "token",
     data.access_token
    );

    const payload = decodeToken(data.access_token);
    if (!payload) {
      alert("Token inválido");
      return;}
      const rol = payload.rol;
      const rutas = {
        [ROLES.ADMIN]: "/dashboard/admin",
        [ROLES.PROFESOR]: "/dashboard/docente",
        [ROLES.ALUMNO]: "/dashboard/estudiante",
      } as const;
      router.push(rutas[rol as keyof typeof rutas]);
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