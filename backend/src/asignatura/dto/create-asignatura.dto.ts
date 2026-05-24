import { IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAsignaturaDto {
  @ApiProperty({ example: 'Ingeniería del Software II' })
  @IsString()
  titulo: string;

  @ApiProperty({ example: 'IDSW2' })
  @IsString()
  codigo: string;

  @ApiProperty({ example: '2025-2026' })
  @IsString()
  cursoAcademico: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  docenteId: number;
}
