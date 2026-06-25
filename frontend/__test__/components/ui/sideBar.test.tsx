import { render, screen, fireEvent } from "@testing-library/react";
import SideBar from "@/app/components/ui/sideBar";
import { getRoleFromToken } from "@/app/lib/auth";
import { logout } from "@/app/services/auth";
import { useRouter } from "next/navigation";
import React from "react";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
jest.mock("@/app/lib/auth", () => ({
  getRoleFromToken: jest.fn(),
}));
jest.mock("@/app/services/auth", () => ({
  logout: jest.fn(),
}));
jest.mock(
  "@/app/components/ui/navLinks",
  () => (props: any) => {
    return (
      <div data-testid="navlinks">
        role: {props.role}
      </div>
    );
  }
);
describe("SideBar", () => {
  const push = jest.fn();
  const replace = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockReturnValue({
      push,
      replace,
    });
  });

  it("no debe renderizar NavLinks si no hay token", () => {
    Object.defineProperty(document, "cookie", {
      writable: true,
      value: "",
    });

    render(<SideBar />);

    expect(
      screen.queryByTestId("navlinks")
    ).not.toBeInTheDocument();
  });
    it("debe mostrar NavLinks admin si el token es Admin", () => {
    Object.defineProperty(document, "cookie", {
      writable: true,
      value: "token=abc",
    });

    (getRoleFromToken as jest.Mock).mockReturnValue(
      "Admin"
    );

    render(<SideBar />);

    expect(
      screen.getByText("role: admin")
    ).toBeInTheDocument();
  });
    it("debe mostrar NavLinks docente", () => {
    Object.defineProperty(document, "cookie", {
      writable: true,
      value: "token=abc",
    });

    (getRoleFromToken as jest.Mock).mockReturnValue(
      "Docente"
    );

    render(<SideBar />);

    expect(
      screen.getByText("role: docente")
    ).toBeInTheDocument();
  });
    it("debe mostrar NavLinks estudiante", () => {
    Object.defineProperty(document, "cookie", {
      writable: true,
      value: "token=abc",
    });

    (getRoleFromToken as jest.Mock).mockReturnValue(
      "Estudiante"
    );

    render(<SideBar />);

    expect(
      screen.getByText("role: estudiante")
    ).toBeInTheDocument();
  });
    it("debe cerrar sesión y redirigir al login", () => {
    Object.defineProperty(document, "cookie", {
      writable: true,
      value: "token=abc",
    });

    (getRoleFromToken as jest.Mock).mockReturnValue(
      "Admin"
    );

    render(<SideBar />);

    const button =
      screen.getByText("Cerrar sesión");

    fireEvent.click(button);

    expect(logout).toHaveBeenCalled();
    expect(replace).toHaveBeenCalledWith("/login");
  });
});
