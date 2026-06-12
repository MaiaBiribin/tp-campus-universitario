import {Controller,Post,Body,Get} from "@nestjs/common";
import { InscripcionesService } from "./inscripciones.service";
import { CrearInscripcionDto } from "./crear-inscripcion.dto";

@Controller("inscripciones")
export class InscripcionesController {


constructor(
 private readonly service:InscripcionesService
){}



@Post()
crear(
 @Body() dto:CrearInscripcionDto
){

 console.log("LLEGÓ:", dto);

 return this.service.crear(dto);

}



@Get()
listar(){

 return this.service.listar();

}


}