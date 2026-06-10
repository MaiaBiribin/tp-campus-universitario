const API_URL = "http://localhost:4000";

export async function api(endpoint: string, options: RequestInit = {}) {

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  return fetch(`${API_URL}${endpoint}`, {
    ...options,

    headers: {
      "Content-Type": "application/json",

      ...(token
        ? { Authorization: `Bearer ${token}` }
        : {}),

      ...(options.headers || {}),
    },
  });
}