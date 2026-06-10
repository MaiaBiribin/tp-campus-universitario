"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { api } from "../lib/api";

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

  return (
    <div className="relative min-h-screen bg-[#070b19] text-white p-4 flex items-center justify-center font-sans antialiased">

      <main className="bg-[#0d1527] border border-[#1e293b] rounded-2xl p-8 md:p-12 max-w-lg w-full shadow-2xl flex flex-col items-center">

        <header className="flex flex-col items-center text-center w-full mb-10">
          <h1 className="text-2xl font-bold text-white mb-3">
            Iniciar sesión
          </h1>

          <p className="text-sm text-slate-400">
            Ingresá tu mail y contraseña para acceder al sistema.
          </p>
        </header>

        {accesoDenegado && (
          <p className="text-red-400 text-sm mb-4 text-center">
            Debés iniciar sesión para acceder a esa página.
          </p>
        )}

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8">

          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Correo electrónico
            </label>

            <input
              type="email"
              name="mail"
              required
              placeholder="Ej: aula@gmail.com"
              className="w-full bg-[#090f1c] border border-[#1e293b] rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Contraseña
            </label>

            <input
              type="password"
              name="contrasena"
              required
              placeholder="••••••••"
              className="w-full bg-[#090f1c] border border-[#1e293b] rounded-lg px-4 py-3"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#5842e3] hover:bg-[#4732c8] text-white font-semibold py-3 rounded-xl"
          >
            Ingresar
          </button>

          <p className="text-center text-slate-400 text-sm">
            ¿No tenés usuario?
            <Link href="/registro" className="text-[#8b5cf6] ml-1">
              Creá una cuenta
            </Link>
          </p>

        </form>
      </main>
    </div>
  );
}