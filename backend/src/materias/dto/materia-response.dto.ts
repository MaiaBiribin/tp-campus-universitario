import { ApiProperty } from '@nestjs/swagger';

export class MateriaResponseDto {
  @ApiProperty({ description: 'ID único de la materia generado por la base de datos', example: 1 })
  id_materia: number;

  @ApiProperty({ description: 'Nombre de la materia', example: 'Análisis Matemático II' })
  nombre: string;

  @ApiProperty({ description: 'Carrera a la que pertenece la materia' })
  carrera: object;
}
