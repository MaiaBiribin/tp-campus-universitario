export default interface usario{
    email:string
    contraseña:string
    rol:number
    eventos:[]
    habilitado:boolean
}

export default interface evento{
    idAula:number
    tipo:string
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

export default interface materia{
   nombre:string
   tipo:string
}