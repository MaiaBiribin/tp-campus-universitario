import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUsuarioDto {
  @ApiProperty({ description: 'Nombre de pila del usuario', example: 'Juan', required: false })
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiProperty({ description: 'Apellido del usuario', example: 'Pérez', required: false })
  @IsOptional()
  @IsString()
  apellido?: string;

  @ApiProperty({ description: 'Correo electrónico del usuario', example: 'juan@mail.com', required: false })
  @IsOptional()
  @IsEmail()
  mail?: string;

  @ApiProperty({ description: 'DNI del usuario', example: '12345678', required: false })
  @IsOptional()
  @IsString()
  dni?: string;
}
