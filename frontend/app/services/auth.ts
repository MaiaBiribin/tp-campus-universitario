import { api } from "../api";
import type { Role } from "@/app/lib/roles";
/**
 * manda las credenciales al back para verificar si el usuario existe
 * @param mail{string} el mail que ingreso en el login
 * @param contrasena{string} la contraseña que ingreso en el login
 * @returns{promise}devuelve si existe el usario en la base de datos
 */
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
/**
 * se encarga de registrar al usuario en el sistemas
 * @param datos{datos:} serian los datos que ingresa el usuario para registrase.
 * @returns {Promise<JSON>} devulve si fue existosa el registro.
 */
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
/**
 * guarad el token una vez logeado el usario
 * @param token el token de usuario
 */
export function guardarSesion(token: string) {
  document.cookie =
    `token=${token}; path=/; SameSite=Lax`;
}
/**
 * caduca el token del usuario.
 */
export function logout() {
  document.cookie =
    "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}