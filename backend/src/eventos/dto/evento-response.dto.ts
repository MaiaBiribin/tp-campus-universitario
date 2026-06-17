import { ApiProperty } from '@nestjs/swagger';

export class EventoResponseDto {
  @ApiProperty({ description: 'ID único del evento', example: 1 })
  id_evento: number;

  @ApiProperty({ description: 'Título descriptivo del evento', example: 'Parcial de Matemáticas' })
  titulo: string;

  @ApiProperty({ description: 'Fecha del evento', example: '2026-06-20' })
  fecha: string;

  @ApiProperty({ description: 'Hora de inicio del evento', example: '09:00:00' })
  horaInicio: string;

  @ApiProperty({ description: 'Hora de finalización del evento', example: '11:00:00' })
  horaFin: string;

  @ApiProperty({ description: 'Estado del evento (ej: aceptado, cancelado)', example: 'aceptado' })
  estado: string;

  @ApiProperty({ description: 'Aula asignada al evento' })
  aula: object;

  @ApiProperty({ description: 'Tipo de evento' })
  tipoEvento: object;

  @ApiProperty({ description: 'Materia asociada al evento' })
  materia: object;
}
