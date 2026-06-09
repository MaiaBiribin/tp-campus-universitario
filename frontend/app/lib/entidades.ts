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
}


export default interface Rol{
    id:number
    nombre:string 
}



export default interface Carrera{
    id_carrera:number
    materias:[]
}