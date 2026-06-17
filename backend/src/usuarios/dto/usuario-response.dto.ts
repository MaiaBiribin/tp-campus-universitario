import { ApiProperty } from '@nestjs/swagger';

export class UsuarioResponseDto {
  @ApiProperty({ description: 'ID único del usuario generado por la base de datos', example: 1 })
  id_usuario: number;

  @ApiProperty({ description: 'Nombre de pila del usuario', example: 'Juan' })
  nombre: string;

  @ApiProperty({ description: 'Apellido del usuario', example: 'Pérez' })
  apellido: string;

  @ApiProperty({ description: 'Correo electrónico del usuario', example: 'juan.perez@miuniversidad.edu.ar' })
  mail: string;

  @ApiProperty({ description: 'Número de DNI del usuario', example: '45987654' })
  dni: string;

  @ApiProperty({ description: 'Estado de habilitación del usuario', enum: ['pendiente', 'habilitado', 'rechazado'], example: 'pendiente' })
  estado: string;

  @ApiProperty({ description: 'Rol asignado al usuario' })
  rol: object;
}
