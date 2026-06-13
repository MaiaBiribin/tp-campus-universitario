export const ROLES = {
  ADMIN: "Admin",
  PROFESOR: "Profesor",
  ALUMNO: "Alumno",
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];

export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: ["/dashboard/admin"],
  [ROLES.PROFESOR]: ["/dashboard/docente"],
  [ROLES.ALUMNO]: ["/dashboard/estudiante"],
} as const;