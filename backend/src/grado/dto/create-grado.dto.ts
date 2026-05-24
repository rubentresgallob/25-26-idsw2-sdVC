import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGradoDto {
  @ApiProperty({ example: 'Ingeniería Informática' })
  @IsString()
  titulo: string;

  @ApiProperty({ example: 'GINF' })
  @IsString()
  codigo: string;
}
