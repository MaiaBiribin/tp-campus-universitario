import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ROLE_PERMISSIONS, Role } from "@/app/lib/roles";

function decodeJWT(token: string) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

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

export const config = {
  matcher: ["/dashboard/:path*"],
};