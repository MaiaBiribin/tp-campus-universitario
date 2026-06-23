import { proxy } from "../proxy";
import { NextResponse } from "next/server";

jest.mock("next/server", () => ({
  NextResponse: {
    redirect: jest.fn(() => ({
      type: "redirect",
    })),
    next: jest.fn(() => ({
      type: "next",
    })),
  },
}));

describe("proxy", () => {
  const createRequest = (
    token: string | undefined,
    pathname: string
  ) =>
    ({
      url: "http://localhost:3000/dashboard/admin",
      nextUrl: {
        pathname,
      },
      cookies: {
        get: jest.fn().mockReturnValue(
          token ? { value: token } : undefined
        ),
      },
    }) as any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debe redirigir al login cuando no existe token", () => {
    const request = createRequest(
      undefined,
      "/dashboard/admin"
    );
    proxy(request);
    expect(NextResponse.redirect).toHaveBeenCalled();
    expect(NextResponse.next).not.toHaveBeenCalled();
  });

  it("debe redirigir al login cuando el token es inválido", () => {
    global.atob = jest.fn(() => {
      throw new Error("token inválido");
    });

    const request = createRequest("token-invalido","/dashboard/admin");
    proxy(request);
    expect(NextResponse.redirect).toHaveBeenCalled();
    expect(NextResponse.next).not.toHaveBeenCalled();
  });

  it("debe redirigir cuando el usuario no tiene permisos para la ruta", () => {
    global.atob = jest.fn(() =>
      JSON.stringify({
        rol: "Estudiante",
      })
    );
    const request = createRequest("header.payload.signature","/dashboard/admin");

    proxy(request);
    expect(NextResponse.redirect).toHaveBeenCalled();
    expect(NextResponse.next).not.toHaveBeenCalled();
  });

  it("debe permitir el acceso cuando el usuario tiene permisos", () => {
  global.atob = jest.fn(() =>
    JSON.stringify({
      rol: "Admin",
    })
  );
  const request = createRequest(
    "header.payload.signature",
    "/dashboard/admin"
  );
  proxy(request);
  expect(NextResponse.next).toHaveBeenCalled();
  expect(NextResponse.redirect).not.toHaveBeenCalled();
});
});