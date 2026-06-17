import { ApiProperty } from '@nestjs/swagger';

export class CarreraResponseDto {
  @ApiProperty({ description: 'ID único de la carrera generado por la base de datos', example: 1 })
  id_carrera: number;

  @ApiProperty({ description: 'Nombre de la carrera universitaria', example: 'Ingeniería en Sistemas' })
  nombre: string;
}
