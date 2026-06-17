import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from "class-validator";

export class CrearInscripcionDto {

  @ApiProperty({ description: 'ID de la materia en la que se inscriben los usuarios', example: 3 })
  @IsNumber()
  id_materia: number;

  @ApiProperty({ description: 'Lista de IDs de usuarios a inscribir en la materia', example: [1, 2, 5] })
  @IsArray()
  usuarios: number[];

}