import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AlumnoService } from './alumno.service';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('alumnos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('alumnos')
export class AlumnoController {
  constructor(private alumnoService: AlumnoService) {}

  @ApiOperation({ summary: 'Listar todos los alumnos' })
  @Get()
  findAll() {
    return this.alumnoService.findAll();
  }

  @ApiOperation({ summary: 'Obtener un alumno por ID' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.alumnoService.findOne(id);
  }

  @ApiOperation({ summary: 'Crear alumno' })
  @Post()
  crear(@Body() dto: CreateAlumnoDto) {
    return this.alumnoService.crear(dto);
  }

  @ApiOperation({ summary: 'Actualizar alumno' })
  @Put(':id')
  actualizar(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateAlumnoDto) {
    return this.alumnoService.actualizar(id, dto);
  }

  @ApiOperation({ summary: 'Eliminar alumno' })
  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.alumnoService.eliminar(id);
  }

  @ApiOperation({ summary: 'Matricular alumno en una asignatura' })
  @Post(':id/asignaturas/:asignaturaId')
  matricular(
    @Param('id', ParseIntPipe) id: number,
    @Param('asignaturaId', ParseIntPipe) asignaturaId: number,
  ) {
    return this.alumnoService.matricular(id, asignaturaId);
  }

  @ApiOperation({ summary: 'Desmatricular alumno de una asignatura' })
  @Delete(':id/asignaturas/:asignaturaId')
  desmatricular(
    @Param('id', ParseIntPipe) id: number,
    @Param('asignaturaId', ParseIntPipe) asignaturaId: number,
  ) {
    return this.alumnoService.desmatricular(id, asignaturaId);
  }
}
