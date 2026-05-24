import { Controller, Post, Get, Patch, Param, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ExamenService } from './examen.service';
import { GenerarExamenDto } from './dto/generar-examen.dto';
import { AsignarExamenDto } from './dto/asignar-examen.dto';
import { CorregirExamenDto } from './dto/corregir-examen.dto';
import { ActualizarPesoDto } from './dto/actualizar-peso.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('examenes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('examenes')
export class ExamenController {
  constructor(private examenService: ExamenService) {}

  @ApiOperation({ summary: 'Generar N variantes de examen para una asignatura' })
  @Post('generar')
  generar(@Body() dto: GenerarExamenDto) {
    return this.examenService.generar(dto);
  }

  @ApiOperation({ summary: 'Listar exámenes de una asignatura' })
  @Get('asignatura/:asignaturaId')
  findByAsignatura(@Param('asignaturaId', ParseIntPipe) asignaturaId: number) {
    return this.examenService.findByAsignatura(asignaturaId);
  }

  @ApiOperation({ summary: 'Obtener examen por ID' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.examenService.findOne(id);
  }

  @ApiOperation({ summary: 'Asignar examen a un alumno (GENERADO → ASIGNADO)' })
  @Patch(':id/asignar')
  asignar(@Param('id', ParseIntPipe) id: number, @Body() dto: AsignarExamenDto) {
    return this.examenService.asignar(id, dto);
  }

  @ApiOperation({ summary: 'Modificar peso de una pregunta (solo en estado GENERADO, suma ≤ 10)' })
  @Patch(':id/preguntas/:preguntaId/peso')
  actualizarPeso(
    @Param('id', ParseIntPipe) id: number,
    @Param('preguntaId', ParseIntPipe) preguntaId: number,
    @Body() dto: ActualizarPesoDto,
  ) {
    return this.examenService.actualizarPeso(id, preguntaId, dto.peso);
  }

  @ApiOperation({ summary: 'Corregir examen con respuestas del alumno (ASIGNADO → CORREGIDO)' })
  @Patch(':id/corregir')
  corregir(@Param('id', ParseIntPipe) id: number, @Body() dto: CorregirExamenDto) {
    return this.examenService.corregir(id, dto);
  }
}
