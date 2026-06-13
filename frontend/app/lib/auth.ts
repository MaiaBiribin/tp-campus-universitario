import { Role } from "./roles";

export function decodeToken(token: string) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

export function getRoleFromToken(token: string): Role | null {
  const payload = decodeToken(token);
  if (!payload) return null;

  return payload.rol as Role;
}