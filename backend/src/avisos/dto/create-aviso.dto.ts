import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateAvisoDto {
  @ApiProperty({ description: 'Contenido del aviso a publicar', example: 'El parcial se posterga una semana' })
  @IsString()
  mensaje: string;

  @ApiProperty({ description: 'ID del evento al que pertenece el aviso', example: 1 })
  @IsNumber()
  id_evento: number;
}
