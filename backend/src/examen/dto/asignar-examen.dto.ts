import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AsignarExamenDto {
  @ApiProperty({ example: 5 })
  @IsInt()
  alumnoId: number;
}
