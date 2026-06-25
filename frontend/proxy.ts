import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ROLE_PERMISSIONS, Role } from "@/app/lib/roles";

/**
 * Decodifica un JWT sin validación de firma.
 * @param token JWT en formato string
 * @returns Payload decodificado o null si es inválido
 */
function decodeJWT(token: string) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

/**
 * Middleware de autorización para rutas protegidas del dashboard.
 *
 * Flujo:
 * - Verifica existencia de token en cookies
 * - Decodifica JWT
 * - Valida rol contra permisos definidos
 *
 * @param request Request entrante de Next.js
 * @returns NextResponse:
 * - redirect a /login si no está autorizado
 * - next() si está autorizado
 */
export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;
  if (!token) {
    return NextResponse.redirect(
      new URL("/login?acceso=denegado", request.url)
    );
  }
  const payload = decodeJWT(token);
  if (!payload) {
    return NextResponse.redirect(
      new URL("/login?acceso=denegado", request.url)
    );
  }
  const rol = payload.rol as Role;
  const permitido =
  ROLE_PERMISSIONS[rol]?.some(r =>
    pathname.startsWith(r)
  );
  if (!permitido) {
    return NextResponse.redirect(
      new URL("/login?acceso=denegado", request.url)
    );
  }
  return NextResponse.next();
}

/**
 * Configuración del middleware.
 * @matcher rutas protegidas del dashboard
 */
export const config = {
  matcher: ["/dashboard/:path*"],
};