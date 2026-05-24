import { IsEmail, IsString, MinLength, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Rol } from '@prisma/client';

export class RegisterDto {
  @ApiProperty({ example: 'Juan' })
  @IsString()
  nombre: string;

  @ApiProperty({ example: 'García López' })
  @IsString()
  apellidos: string;

  @ApiProperty({ example: '12345678A' })
  @IsString()
  dni: string;

  @ApiProperty({ example: 'jgarcia' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'juan@universidad.es' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ enum: Rol, default: Rol.DOCENTE, required: false })
  @IsEnum(Rol)
  @IsOptional()
  rol?: Rol;
}
