import { IsString, IsEnum, IsBoolean, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Dificultad } from '@prisma/client';

export class CreateRespuestaDto {
  @ApiProperty({ example: 'Principio de responsabilidad única' })
  @IsString()
  opcion: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  esCorrecta: boolean;
}

export class CreatePreguntaDto {
  @ApiProperty({ example: '¿Qué significa la S en SOLID?' })
  @IsString()
  enunciado: string;

  @ApiProperty({ example: 'SOLID' })
  @IsString()
  tema: string;

  @ApiProperty({ enum: Dificultad, default: Dificultad.MEDIA })
  @IsEnum(Dificultad)
  @IsOptional()
  dificultad?: Dificultad;

  @ApiProperty({ type: [CreateRespuestaDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRespuestaDto)
  respuestas: CreateRespuestaDto[];
}
