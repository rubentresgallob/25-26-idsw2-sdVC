import { IsInt, IsEnum, IsArray, IsString, IsNumber, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Evaluacion } from '@prisma/client';

export class ProporcionalidadDto {
  @ApiProperty({ example: 30, description: 'Porcentaje de preguntas de dificultad BAJA (0-100)' })
  @IsNumber()
  @Min(0) @Max(100)
  baja: number;

  @ApiProperty({ example: 50 })
  @IsNumber()
  @Min(0) @Max(100)
  media: number;

  @ApiProperty({ example: 20 })
  @IsNumber()
  @Min(0) @Max(100)
  alta: number;
}

export class GenerarExamenDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  asignaturaId: number;

  @ApiProperty({ example: 1, description: 'ID del docente que genera los exámenes' })
  @IsInt()
  docenteId: number;

  @ApiProperty({ example: ['SOLID', 'Patrones'], description: 'Temas de los que extraer preguntas' })
  @IsArray()
  @IsString({ each: true })
  temas: string[];

  @ApiProperty({ example: 10, description: 'Número de preguntas por examen' })
  @IsInt()
  @Min(1)
  numPreguntas: number;

  @ApiProperty({ example: 3, description: 'Número de variantes (tipos) a generar' })
  @IsInt()
  @Min(1)
  numVariantes: number;

  @ApiProperty({ enum: Evaluacion })
  @IsEnum(Evaluacion)
  evaluacion: Evaluacion;

  @ApiProperty({ type: ProporcionalidadDto })
  proporcionalidad: ProporcionalidadDto;
}
