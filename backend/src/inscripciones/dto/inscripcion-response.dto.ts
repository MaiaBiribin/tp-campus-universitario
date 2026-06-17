import { ApiProperty } from '@nestjs/swagger';

export class InscripcionResponseDto {
  @ApiProperty({ description: 'ID único de la inscripción', example: 1 })
  id_inscripcion: number;

  @ApiProperty({ description: 'Usuario inscripto' })
  usuario: object;

  @ApiProperty({ description: 'Materia en la que se inscribió el usuario' })
  materia: object;
}
