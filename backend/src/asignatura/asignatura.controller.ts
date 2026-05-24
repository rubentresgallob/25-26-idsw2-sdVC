import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AsignaturaService } from './asignatura.service';
import { CreateAsignaturaDto } from './dto/create-asignatura.dto';
import { UpdateAsignaturaDto } from './dto/update-asignatura.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('asignaturas')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('asignaturas')
export class AsignaturaController {
  constructor(private asignaturaService: AsignaturaService) {}

  @ApiOperation({ summary: 'Listar todas las asignaturas' })
  @Get()
  findAll() {
    return this.asignaturaService.findAll();
  }

  @ApiOperation({ summary: 'Obtener una asignatura por ID' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.asignaturaService.findOne(id);
  }

  @ApiOperation({ summary: 'Crear asignatura (crea batería de preguntas automáticamente)' })
  @Post()
  crear(@Body() dto: CreateAsignaturaDto) {
    return this.asignaturaService.crear(dto);
  }

  @ApiOperation({ summary: 'Actualizar asignatura' })
  @Put(':id')
  actualizar(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateAsignaturaDto) {
    return this.asignaturaService.actualizar(id, dto);
  }

  @ApiOperation({ summary: 'Eliminar asignatura' })
  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.asignaturaService.eliminar(id);
  }

  @ApiOperation({ summary: 'Asignar asignatura a un grado' })
  @Post(':id/grados/:gradoId')
  asignarGrado(
    @Param('id', ParseIntPipe) id: number,
    @Param('gradoId', ParseIntPipe) gradoId: number,
  ) {
    return this.asignaturaService.asignarGrado(id, gradoId);
  }

  @ApiOperation({ summary: 'Desasignar asignatura de un grado' })
  @Delete(':id/grados/:gradoId')
  desasignarGrado(
    @Param('id', ParseIntPipe) id: number,
    @Param('gradoId', ParseIntPipe) gradoId: number,
  ) {
    return this.asignaturaService.desasignarGrado(id, gradoId);
  }
}
