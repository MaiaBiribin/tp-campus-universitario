export interface Usuario {
  email: string;
  contraseña: string;
  rol: number;
  eventos: [];
  habilitado: boolean;
}

export interface Evento {
  id_evento?: number;
  titulo: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  id_aula: number;
  id_tipo_evento: number;
  id_materia: number;
}

export interface Aula {
  id: number;
  nombre: string;
  capacidad: number;
  piso: string;
}

export interface Rol {
  id: number;
  nombre: string;
}

export interface Materia {
  id_materia: number;
  nombre: string;
  cuatrimestre: number;

  carrera: {
    id_carrera: number;
    nombre: string;
  };
}

export interface Carrera {
  id_carrera: number;
  nombre: string;
}