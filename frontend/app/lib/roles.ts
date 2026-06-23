export const ROLES = {
  ADMIN: "Admin",
  DOCENTE: "Docente",
  ESTUDIANTE: "Estudiante",
} as const;

export type Role =
  typeof ROLES[keyof typeof ROLES];

export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: [
    "/dashboard/admin",
    "/dashboard/mapa",
    "/dashboard/eventos",
  ],
  [ROLES.DOCENTE]: [
    "/dashboard/docente",
    "/dashboard/mapa",
    "/dashboard/eventos",
  ],
  [ROLES.ESTUDIANTE]: [
    "/dashboard/estudiante",
    "/dashboard/mapa",
    "/dashboard/eventos",
  ],
} as const;