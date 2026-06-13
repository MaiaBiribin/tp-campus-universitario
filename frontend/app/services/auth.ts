import { api } from "../api";
import type { Role } from "@/app/lib/roles";

export async function login(mail: string, contrasena: string) {
  const response = await api("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      mail,
      contrasena,
    }),
  });

  return response;
}

export async function registrarUsuario(datos: {
  nombre: string;
  apellido: string;
  mail: string;
  dni: string;
  contrasena: string;
}) {
  const response = await api("/auth/register", {
    method: "POST",
    body: JSON.stringify(datos),
  });

  return response;
}

export function guardarSesion(token: string) {
  document.cookie = `token=${token}; path=/`;
}

export function logout() {
  document.cookie =
    "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}