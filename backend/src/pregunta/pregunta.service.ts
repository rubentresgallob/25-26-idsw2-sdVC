import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePreguntaDto } from './dto/create-pregunta.dto';
import { UpdatePreguntaDto } from './dto/update-pregunta.dto';

@Injectable()
export class PreguntaService {
  constructor(private prisma: PrismaService) {}

  async crear(bateriaId: number, dto: CreatePreguntaDto) {
    const bateria = await this.prisma.bateriaDePreguntas.findUnique({ where: { id: bateriaId } });
    if (!bateria) throw new NotFoundException(`Batería #${bateriaId} no encontrada`);

    return this.prisma.pregunta.create({
      data: {
        enunciado: dto.enunciado,
        tema: dto.tema,
        dificultad: dto.dificultad,
        bateriaId,
        respuestas: { create: dto.respuestas },
      },
      include: { respuestas: true },
    });
  }

  findByBateria(bateriaId: number) {
    return this.prisma.pregunta.findMany({
      where: { bateriaId },
      include: { respuestas: true },
    });
  }

  async findOne(id: number) {
    const pregunta = await this.prisma.pregunta.findUnique({
      where: { id },
      include: { respuestas: true },
    });
    if (!pregunta) throw new NotFoundException(`Pregunta #${id} no encontrada`);
    return pregunta;
  }

  async actualizar(id: number, dto: UpdatePreguntaDto) {
    await this.findOne(id);
    return this.prisma.pregunta.update({ where: { id }, data: dto, include: { respuestas: true } });
  }

  async toggleHabilitada(id: number) {
    const pregunta = await this.findOne(id);
    return this.prisma.pregunta.update({
      where: { id },
      data: { habilitada: !pregunta.habilitada },
    });
  }

  async eliminar(id: number) {
    await this.findOne(id);
    return this.prisma.pregunta.delete({ where: { id } });
  }
}
