export const ROLES = {
  ADMIN: "Admin",
  PROFESOR: "Profesor",
  ALUMNO: "Alumno",
} as const;

export type Role =
  typeof ROLES[keyof typeof ROLES];

export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: [
    "/dashboard/admin",
    "/dashboard/mapa",
    "/dashboard/eventos",
  ],
  [ROLES.PROFESOR]: [
    "/dashboard/docente",
    "/dashboard/mapa",
    "/dashboard/eventos",
  ],
  [ROLES.ALUMNO]: [
    "/dashboard/estudiante",
    "/dashboard/mapa",
    "/dashboard/eventos",
  ],
} as const;