import { Role } from "./roles";

/**
 * Decodifica el payload de un token JWT.
 * @param {string} token token JWT con estructura `header.payload.signature`.
 * @returns {Record<string, unknown> | null} payload decodificado o null si el token es inválido.
 */
export function decodeToken(token: string) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

/**
 * Obtiene el rol del usuario almacenado en un token JWT.
 * @param {string} token token JWT del usuario autenticado.
 * @returns {Role | null} rol del usuario si existe, o null si el token no pudo ser leído.
 */
export function getRoleFromToken(token: string): Role | null {
  const payload = decodeToken(token);
  if (!payload) return null;
  return payload.rol as Role;
}