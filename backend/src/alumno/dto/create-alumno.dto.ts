import { IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlumnoDto {
  @ApiProperty({ example: 'María' })
  @IsString()
  nombre: string;

  @ApiProperty({ example: 'Pérez García' })
  @IsString()
  apellidos: string;

  @ApiProperty({ example: '87654321B' })
  @IsString()
  dni: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  gradoId: number;
}
