import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUsuarioDto {
  @ApiProperty({ description: 'Nombre de pila del usuario', example: 'Juan' })
  @IsString()
  nombre: string;

  @ApiProperty({ description: 'Apellido del usuario', example: 'Pérez' })
  @IsString()
  apellido: string;

  @ApiProperty({ description: 'Correo electrónico único del usuario', example: 'juan.perez@miuniversidad.edu.ar' })
  @IsEmail()
  mail: string;

  @ApiProperty({ description: 'Número de DNI único del usuario', example: '45987654' })
  @IsString()
  dni: string;

  @ApiProperty({ description: 'Contraseña en texto plano (se almacena hasheada)', example: 'claveSegura123' })
  @IsString()
  contrasena: string;
}
