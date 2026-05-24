import { IsNumber, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ActualizarPesoDto {
  @ApiProperty({ example: 2.5, description: 'Nuevo peso de la pregunta (la suma total del examen no puede superar 10)' })
  @IsNumber()
  @Min(0.1)
  @Max(10)
  peso: number;
}
