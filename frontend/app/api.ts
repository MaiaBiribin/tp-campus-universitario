const API_URL = "http://localhost:4000";

/**
 * Obtiene una cookie por nombre (solo cliente).
 * @param {string} Nombre de la cookie
 * @returns valor de la cookie o null si no existe / SSR
 */
function getCookie(name: string) {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }
  return null;
}

/**
 * Wrapper de fetch con:
 * - URL base del backend
 * - JSON por defecto
 * - Auth automática vía cookie "token"
 *
 * @param {string} endpoint ruta del backend, ej: "/usuarios"
 * @param {RequestInit} options opciones estándar de fetch
 * @returns Promise<Response>
 */
export async function api(endpoint: string, options: RequestInit = {}) {
  const token = getCookie("token");

  return fetch(`${API_URL}${endpoint}`, {
    ...options,

    headers: {
      "Content-Type": "application/json",

      ...(token ? { Authorization: `Bearer ${token}` } : {}),

      ...(options.headers || {}),
    },
  });
}