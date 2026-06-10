export function obtenerUsuarioAutenticado() {
  if (typeof document === "undefined") return null;

  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  if (!token) return null;

  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64)); 
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return null;
  }
}