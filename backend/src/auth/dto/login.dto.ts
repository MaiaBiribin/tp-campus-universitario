import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Correo electrónico registrado del usuario',
    example: 'admin@mail.com',
  })
  @IsEmail()
  mail: string;

  @ApiProperty({
    description: 'Contraseña del usuario (mínimo 6 caracteres)',
    example: '123456',
  })
  @IsString()
  contrasena: string;
}
