import { ApiProperty } from '@nestjs/swagger';

export class AulaResponseDto {
  @ApiProperty({ description: 'ID único del aula generado por la base de datos', example: 1 })
  id_aula: number;

  @ApiProperty({ description: 'Nombre o identificador del aula', example: 'Laboratorio de Informática' })
  nombre: string;

  @ApiProperty({ description: 'Capacidad máxima de personas', example: 40 })
  capacidad: number;

  @ApiProperty({ description: 'Número de piso donde se ubica el aula', example: 2 })
  piso: number;

  @ApiProperty({ description: 'Descripción de la ubicación física dentro del campus', example: 'Pabellón Central, Ala Sur' })
  ubicacion: string;
}
