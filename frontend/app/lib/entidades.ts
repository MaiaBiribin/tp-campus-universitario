<<<<<<< HEAD
export default interface evento{
    idAula:number
    tipo:string
}

export default interface materia{
   nombre:string
   tipo:string
}

export default interface usario{
    idUsuario:number
    nombre:string
    apellido:string
    email:string
    contraseña:string
    rol:"alumno"|"profesor"|"admin"
    eventos:evento[]
    habilitado:boolean
}



export default interface aula{
   id:number
   nombre:string
   capacidad:number
   piso:string
=======
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
>>>>>>> 21b814dffbd64ee84a2a8ff0fe34d0a131b3a0a9
}

export interface Rol {
  id: number;
  nombre: string;
}

<<<<<<< HEAD


export default interface Carrera{
    id_carrera:number
    materias:[]
=======
export interface Materia {
  id: number;
  nombre: string;
  cuatrimestre: number;
  id_carrera: number;
}

export interface Carrera {
  id: number;
  nombre: string;
>>>>>>> 21b814dffbd64ee84a2a8ff0fe34d0a131b3a0a9
}