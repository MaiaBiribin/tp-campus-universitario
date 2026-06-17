import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCarreraDto {
  @ApiProperty({ description: 'Nombre de la carrera universitaria', example: 'Ingeniería en Sistemas' })
  @IsString()
  nombre: string;
}
