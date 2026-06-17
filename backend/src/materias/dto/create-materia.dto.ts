import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateMateriaDto {
  @ApiProperty({ description: 'Nombre de la materia', example: 'Análisis Matemático II' })
  @IsString()
  nombre: string;

  @ApiProperty({ description: 'ID de la carrera a la que pertenece la materia', example: 1 })
  @IsNumber()
  id_carrera: number;
}
