import { IsArray, ValidateNested, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class RespuestaAlumnoDto {
  @ApiProperty({ example: 1, description: 'ID de la pregunta' })
  @IsInt()
  preguntaId: number;

  @ApiProperty({ example: 3, description: 'ID de la respuesta marcada por el alumno' })
  @IsInt()
  respuestaId: number;
}

export class CorregirExamenDto {
  @ApiProperty({ type: [RespuestaAlumnoDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RespuestaAlumnoDto)
  respuestas: RespuestaAlumnoDto[];
}
