import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ description: 'Nombre de pila del usuario', example: 'Juan' })
  @IsString()
  nombre: string;

  @ApiProperty({ description: 'Apellido del usuario', example: 'Pérez' })
  @IsString()
  apellido: string;

  @ApiProperty({ description: 'Correo electrónico único del usuario', example: 'juan@mail.com' })
  @IsEmail()
  mail: string;

  @ApiProperty({ description: 'Número de DNI único del usuario', example: '12345678' })
  @IsString()
  dni: string;

  @ApiProperty({ description: 'Contraseña en texto plano (se almacena hasheada)', example: 'miPassword123' })
  @IsString()
  contrasena: string;
}
