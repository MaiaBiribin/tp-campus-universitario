import { api } from "../api";

/**
 * Inicia sesión de un usuario.
 * @param {string} mail mail del usuario.
 * @param {string} contrasena contraseña del usuario.
 * @returns {Promise<Response>} respuesta del backend con el token o error.
 * @throws {Error} Si falla la petición de autenticación.
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
 * Registra un nuevo usuario en el sistema.
 * @param {{nombre: string, apellido: string, mail: string, dni: string, contrasena: string}} datos
 * Datos del usuario a registrar.
 * @returns {Promise<Response>} Respuesta del backend.
 * @throws {Error} Si falla el registro.
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
 * Guarda el token de sesión en cookies del navegador.
 * @param {string} token - JWT de autenticación.
 */
export function guardarSesion(token: string) {
  document.cookie =
    `token=${token}; path=/; SameSite=Lax`;
}

/**
 * Cierra la sesión eliminando la cookie de autenticación.
 */
export function logout() {
  document.cookie =
    "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}