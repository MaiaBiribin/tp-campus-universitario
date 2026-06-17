import { ApiProperty } from '@nestjs/swagger';

export class PerfilResponseDto {
  @ApiProperty({ description: 'ID único del usuario', example: 1 })
  sub: number;

  @ApiProperty({ description: 'Correo electrónico del usuario', example: 'admin@mail.com' })
  mail: string;

  @ApiProperty({ description: 'Nombre del rol asignado', example: 'Administrador' })
  rol: string;

  @ApiProperty({ description: 'Nombre de pila del usuario', example: 'Juan' })
  nombre: string;

  @ApiProperty({ description: 'Apellido del usuario', example: 'Pérez' })
  apellido: string;

  @ApiProperty({ description: 'Número de DNI del usuario', example: '12345678' })
  dni: string;
}
