import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, Patch, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { PreguntaService } from './pregunta.service';
import { CreatePreguntaDto } from './dto/create-pregunta.dto';
import { UpdatePreguntaDto } from './dto/update-pregunta.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('preguntas')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('baterias/:bateriaId/preguntas')
export class PreguntaController {
  constructor(private preguntaService: PreguntaService) {}

  @ApiOperation({ summary: 'Listar preguntas de una batería' })
  @Get()
  findAll(@Param('bateriaId', ParseIntPipe) bateriaId: number) {
    return this.preguntaService.findByBateria(bateriaId);
  }

  @ApiOperation({ summary: 'Obtener una pregunta por ID' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.preguntaService.findOne(id);
  }

  @ApiOperation({ summary: 'Crear pregunta con sus respuestas' })
  @Post()
  crear(
    @Param('bateriaId', ParseIntPipe) bateriaId: number,
    @Body() dto: CreatePreguntaDto,
  ) {
    return this.preguntaService.crear(bateriaId, dto);
  }

  @ApiOperation({ summary: 'Actualizar pregunta' })
  @Put(':id')
  actualizar(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePreguntaDto) {
    return this.preguntaService.actualizar(id, dto);
  }

  @ApiOperation({ summary: 'Habilitar/deshabilitar pregunta' })
  @Patch(':id/toggle')
  toggle(@Param('id', ParseIntPipe) id: number) {
    return this.preguntaService.toggleHabilitada(id);
  }

  @ApiOperation({ summary: 'Eliminar pregunta' })
  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.preguntaService.eliminar(id);
  }
}
