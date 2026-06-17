import { ApiProperty } from '@nestjs/swagger';

export class RegisterResponseDto {
  @ApiProperty({
    description: 'Mensaje de confirmación de la solicitud de registro',
    example: 'Solicitud de registro enviada. Aguardá la habilitación del administrador.',
  })
  mensaje: string;
}
