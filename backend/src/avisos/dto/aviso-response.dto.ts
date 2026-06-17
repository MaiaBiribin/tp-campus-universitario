import { ApiProperty } from '@nestjs/swagger';

export class AvisoResponseDto {
  @ApiProperty({ description: 'ID único del aviso', example: 1 })
  id_aviso: number;

  @ApiProperty({ description: 'Contenido del aviso', example: 'El parcial se posterga una semana' })
  mensaje: string;

  @ApiProperty({ description: 'Fecha y hora de creación del aviso', example: '2026-06-16T10:00:00.000Z' })
  fecha_creacion: Date;

  @ApiProperty({ description: 'Usuario que creó el aviso' })
  usuarioCreador: object;

  @ApiProperty({ description: 'Evento al que está asociado el aviso' })
  evento: object;
}
