import { IsString, IsEnum, IsBoolean, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Dificultad } from '@prisma/client';

export class UpdatePreguntaDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  enunciado?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  tema?: string;

  @ApiPropertyOptional({ enum: Dificultad })
  @IsEnum(Dificultad)
  @IsOptional()
  dificultad?: Dificultad;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  habilitada?: boolean;
}
