import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateAvisoDto {
  @ApiProperty({ description: 'Nuevo mensaje del aviso' })
  @IsString()
  @IsNotEmpty()
  mensaje: string;
}