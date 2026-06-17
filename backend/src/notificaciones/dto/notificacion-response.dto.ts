import { ApiProperty } from '@nestjs/swagger';

export class NotificacionResponseDto {
  @ApiProperty({ description: 'ID único de la notificación', example: 1 })
  id_notificacion: number;

  @ApiProperty({ description: 'Contenido del mensaje de la notificación', example: 'Se ha publicado un nuevo aviso en tu materia' })
  mensaje: string;

  @ApiProperty({ description: 'Indica si el usuario ya leyó la notificación', example: false })
  leida: boolean;

  @ApiProperty({ description: 'Fecha y hora en que se generó la notificación', example: '2026-06-16T10:00:00.000Z' })
  fecha_creacion: Date;

  @ApiProperty({ description: 'Evento asociado a la notificación (puede ser nulo)', nullable: true })
  evento: object;
}
