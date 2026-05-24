import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { GradoService } from './grado.service';
import { CreateGradoDto } from './dto/create-grado.dto';
import { UpdateGradoDto } from './dto/update-grado.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('grados')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('grados')
export class GradoController {
  constructor(private gradoService: GradoService) {}

  @ApiOperation({ summary: 'Listar todos los grados' })
  @Get()
  findAll() {
    return this.gradoService.findAll();
  }

  @ApiOperation({ summary: 'Obtener un grado por ID' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.gradoService.findOne(id);
  }

  @ApiOperation({ summary: 'Crear un nuevo grado' })
  @Post()
  crear(@Body() dto: CreateGradoDto) {
    return this.gradoService.crear(dto);
  }

  @ApiOperation({ summary: 'Actualizar un grado' })
  @Put(':id')
  actualizar(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateGradoDto) {
    return this.gradoService.actualizar(id, dto);
  }

  @ApiOperation({ summary: 'Eliminar un grado' })
  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.gradoService.eliminar(id);
  }
}
