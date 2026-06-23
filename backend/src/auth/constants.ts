export const jwtConstants = {
  secret: process.env.JWT_SECRET,
};
export const ROLES = {
  ADMIN: 'Admin',
  ESTUDIANTE: 'Estudiante',
  DOCENTE: "Docente",
} as const;