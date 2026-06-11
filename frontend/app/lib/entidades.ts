export interface Rol {
  id_rol: number;
  nombre: string;
}
export interface Usuario {
<<<<<<< HEAD
  idUsario:number
  nombre:string
  apellido:string
  email: string;
  contraseña: string;
  rol: number;
  eventos: [];
  habilitado: boolean;
=======
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
>>>>>>> d6ae4c08225d350bd34887e14db44ab2637b5738
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