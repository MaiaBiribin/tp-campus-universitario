import { api } from "@/app/api";

describe("api", () => {

  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(document, "cookie", {
      writable: true,
      value: "",
    });

    global.fetch = jest.fn();
  });

  it("realiza fetch con la URL correcta y headers por defecto", async () => {
    (fetch as jest.Mock).mockResolvedValue({ ok: true });
    await api("/usuarios");
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:4000/usuarios",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  });

  it("agrega token en Authorization cuando existe cookie", async () => {
    Object.defineProperty(document, "cookie", {
      writable: true,
      value: "token=abc123",
    });
    (fetch as jest.Mock).mockResolvedValue({ ok: true });
    await api("/usuarios");
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:4000/usuarios",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer abc123",
        },
      }
    );
  });

  it("no agrega Authorization cuando no existe token", async () => {
    (fetch as jest.Mock).mockResolvedValue({ ok: true });

    await api("/eventos");
    expect(fetch).toHaveBeenCalledWith("http://localhost:4000/eventos",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  });

  it("mantiene headers personalizados enviados en options", async () => {

    (fetch as jest.Mock).mockResolvedValue({ ok: true });
    await api("/login", {
      method: "POST",
      headers: {
        "X-Test": "valor",
      },
      body: JSON.stringify({
        mail: "test@test.com",
      }),
    });

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:4000/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Test": "valor",
        },
        body: JSON.stringify({
          mail: "test@test.com",
        }),
      }
    );
  });

  it("envía correctamente metodos y body", async () => {
    (fetch as jest.Mock).mockResolvedValue({ ok: true });
    await api("/avisos", {
      method: "DELETE",
      body: JSON.stringify({
        id: 1,
      }),
    });

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:4000/avisos",
      {
        method: "DELETE",
        body: JSON.stringify({
          id: 1,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  });
});