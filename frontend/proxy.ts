import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {

  const token =request.cookies.get('token')?.value
  const {pathname} =request.nextUrl
  if (!token) {
    return NextResponse.redirect(
      new URL(
        '/login?acceso=denegado',
        request.url
      )
    )
  }

  let rol
  try {
    const payload =JSON.parse(atob(token.split(".")[1]))
    rol =payload.rol
  }

  catch {
    return NextResponse.redirect(new URL('/login?acceso=denegado',request.url))
  }

  const permisos = {
    "/dashboard/admin":
      "Admin",
    "/dashboard/docente":
      "Profesor",
    "/dashboard/estudiante":
      "Alumno",
  }

  for (const [ruta,rolPermitido]of Object.entries(permisos)) {
    if (pathname.startsWith(ruta) && rol !== rolPermitido) {
      return NextResponse.redirect(new URL('/login?acceso=denegado',request.url))
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*'
  ]

}