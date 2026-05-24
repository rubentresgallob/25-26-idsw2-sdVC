import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGradoDto } from './dto/create-grado.dto';
import { UpdateGradoDto } from './dto/update-grado.dto';

@Injectable()
export class GradoService {
  constructor(private prisma: PrismaService) {}

  async crear(dto: CreateGradoDto) {
    const existe = await this.prisma.grado.findUnique({ where: { codigo: dto.codigo } });
    if (existe) throw new ConflictException(`Ya existe un grado con código ${dto.codigo}`);
    return this.prisma.grado.create({ data: dto });
  }

  findAll() {
    return this.prisma.grado.findMany({ include: { asignaturas: { include: { asignatura: true } } } });
  }

  async findOne(id: number) {
    const grado = await this.prisma.grado.findUnique({
      where: { id },
      include: { asignaturas: { include: { asignatura: true } }, alumnos: true },
    });
    if (!grado) throw new NotFoundException(`Grado #${id} no encontrado`);
    return grado;
  }

  async actualizar(id: number, dto: UpdateGradoDto) {
    await this.findOne(id);
    return this.prisma.grado.update({ where: { id }, data: dto });
  }

  async eliminar(id: number) {
    await this.findOne(id);
    return this.prisma.grado.delete({ where: { id } });
  }
}
