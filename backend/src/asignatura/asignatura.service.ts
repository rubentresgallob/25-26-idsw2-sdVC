import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAsignaturaDto } from './dto/create-asignatura.dto';
import { UpdateAsignaturaDto } from './dto/update-asignatura.dto';

@Injectable()
export class AsignaturaService {
  constructor(private prisma: PrismaService) {}

  async crear(dto: CreateAsignaturaDto) {
    const existe = await this.prisma.asignatura.findUnique({ where: { codigo: dto.codigo } });
    if (existe) throw new ConflictException(`Ya existe una asignatura con código ${dto.codigo}`);

    const asignatura = await this.prisma.asignatura.create({ data: dto });
    await this.prisma.bateriaDePreguntas.create({ data: { asignaturaId: asignatura.id } });
    return asignatura;
  }

  findAll() {
    return this.prisma.asignatura.findMany({
      include: { docente: { include: { usuario: true } }, grados: { include: { grado: true } } },
    });
  }

  async findOne(id: number) {
    const asignatura = await this.prisma.asignatura.findUnique({
      where: { id },
      include: {
        docente: { include: { usuario: true } },
        grados: { include: { grado: true } },
        bateria: { include: { preguntas: { include: { respuestas: true } } } },
      },
    });
    if (!asignatura) throw new NotFoundException(`Asignatura #${id} no encontrada`);
    return asignatura;
  }

  async actualizar(id: number, dto: UpdateAsignaturaDto) {
    await this.findOne(id);
    return this.prisma.asignatura.update({ where: { id }, data: dto });
  }

  async eliminar(id: number) {
    await this.findOne(id);
    return this.prisma.asignatura.delete({ where: { id } });
  }

  async asignarGrado(asignaturaId: number, gradoId: number) {
    return this.prisma.gradoAsignatura.create({ data: { asignaturaId, gradoId } });
  }

  async desasignarGrado(asignaturaId: number, gradoId: number) {
    return this.prisma.gradoAsignatura.delete({
      where: { gradoId_asignaturaId: { gradoId, asignaturaId } },
    });
  }
}
