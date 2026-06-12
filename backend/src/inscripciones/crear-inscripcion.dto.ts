import { IsArray, IsNumber } from "class-validator";

export class CrearInscripcionDto {

  @IsNumber()
  id_materia: number;


  @IsArray()
  usuarios: number[];

}