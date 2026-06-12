export interface Rol {
  id_rol: number;
  nombre: string;
}
export interface Usuario {
  id_usuario: number;
  nombre: string;
  apellido: string;
  mail: string;
  dni: string;
  estado: string;
  rol: Rol;
}
export interface TipoEvento {
  id_tipo_evento: number;
  nombre: string;
}

export interface Evento {
  id_evento: number;
  titulo: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  estado: string;
  aula: Aula;
  materia: Materia;
  tipoEvento: TipoEvento;
}

export interface Carrera {
  id_carrera: number;
  nombre: string;
}

export interface Materia {
  id_materia: number;
  nombre: string;

  carrera: {
    id_carrera: number;
    nombre: string;
  };
}

export interface Aula {
  id_aula: number;
  nombre: string;
  capacidad: number;
  piso: number;
  ubicacion: string;
}

export interface Solicitud {
  id_usuario: number;
  nombre: string;
  apellido: string;
  mail: string;
  dni: string;
}

export interface Inscripcion {
  id_inscripcion:number;
  usuario:Usuario;
  materia:Materia;
}