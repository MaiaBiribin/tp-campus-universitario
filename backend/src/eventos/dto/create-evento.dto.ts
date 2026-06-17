import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsObject, IsString } from 'class-validator';

export class AulaRefDto {
  @ApiProperty({ description: 'ID del aula donde se realizará el evento', example: 1 })
  id_aula: number;
}

export class TipoEventoRefDto {
  @ApiProperty({ description: 'ID del tipo de evento', example: 1 })
  id_tipo_evento: number;
}

export class MateriaRefDto {
  @ApiProperty({ description: 'ID de la materia asociada al evento', example: 16 })
  id_materia: number;
}

export class CreateEventoDto {
  @ApiProperty({ description: 'Título descriptivo del evento', example: 'Parcial de Matemáticas' })
  @IsString()
  titulo: string;

  @ApiProperty({ description: 'Fecha del evento en formato ISO 8601', example: '2026-06-20' })
  @IsDateString()
  fecha: string;

  @ApiProperty({ description: 'Hora de inicio del evento (HH:MM:SS)', example: '09:00:00' })
  @IsString()
  horaInicio: string;

  @ApiProperty({ description: 'Hora de finalización del evento (HH:MM:SS)', example: '11:00:00' })
  @IsString()
  horaFin: string;

  @ApiProperty({ description: 'Referencia al aula donde se realizará el evento', type: AulaRefDto })
  @IsObject()
  aula: AulaRefDto;

  @ApiProperty({ description: 'Referencia al tipo de evento', type: TipoEventoRefDto })
  @IsObject()
  tipoEvento: TipoEventoRefDto;

  @ApiProperty({ description: 'Referencia a la materia asociada al evento', type: MateriaRefDto })
  @IsObject()
  materia: MateriaRefDto;
}
