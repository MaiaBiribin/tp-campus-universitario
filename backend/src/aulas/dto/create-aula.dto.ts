import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min } from 'class-validator';

export class CreateAulaDto {
  @ApiProperty({ description: 'Nombre o identificador del aula', example: 'Laboratorio de Informática' })
  @IsString()
  nombre: string;

  @ApiProperty({ description: 'Capacidad máxima de personas', example: 40 })
  @IsInt()
  @Min(1)
  capacidad: number;

  @ApiProperty({ description: 'Número de piso donde se ubica el aula', example: 2 })
  @IsInt()
  piso: number;

  @ApiProperty({ description: 'Descripción de la ubicación física dentro del campus', example: 'Pabellón Central, Ala Sur' })
  @IsString()
  ubicacion: string;
}
