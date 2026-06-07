import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  // Sin token → redirigir al login
  if (!token) {
    return NextResponse.redirect(new URL('/login?acceso=denegado', request.url))
  }

  // Decodificar el JWT para leer el rol
  const payload = JSON.parse(atob(token.split('.')[1]));
  const rol = payload.rol;

  // Verificar que el rol coincida con la ruta
  if (pathname.startsWith('/dashboard/admin') && rol !== 'Admin') {
    return NextResponse.redirect(new URL('/login?acceso=denegado', request.url))
  }

  if (pathname.startsWith('/dashboard/docente') && rol !== 'Profesor') {
    return NextResponse.redirect(new URL('/login?acceso=denegado', request.url))
  }

  if (pathname.startsWith('/dashboard/estudiante') && rol !== 'Alumno') {
    return NextResponse.redirect(new URL('/login?acceso=denegado', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*']
}