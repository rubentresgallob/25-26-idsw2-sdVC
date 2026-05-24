import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';

@Injectable()
export class AlumnoService {
  constructor(private prisma: PrismaService) {}

  async crear(dto: CreateAlumnoDto) {
    const existe = await this.prisma.alumno.findUnique({ where: { dni: dto.dni } });
    if (existe) throw new ConflictException(`Ya existe un alumno con DNI ${dto.dni}`);
    return this.prisma.alumno.create({ data: dto });
  }

  findAll() {
    return this.prisma.alumno.findMany({
      include: { grado: true, asignaturas: { include: { asignatura: true } } },
    });
  }

  async findOne(id: number) {
    const alumno = await this.prisma.alumno.findUnique({
      where: { id },
      include: { grado: true, asignaturas: { include: { asignatura: true } } },
    });
    if (!alumno) throw new NotFoundException(`Alumno #${id} no encontrado`);
    return alumno;
  }

  async actualizar(id: number, dto: UpdateAlumnoDto) {
    await this.findOne(id);
    return this.prisma.alumno.update({ where: { id }, data: dto });
  }

  async eliminar(id: number) {
    await this.findOne(id);
    return this.prisma.alumno.delete({ where: { id } });
  }

  async matricular(alumnoId: number, asignaturaId: number) {
    return this.prisma.alumnoAsignatura.create({ data: { alumnoId, asignaturaId } });
  }

  async desmatricular(alumnoId: number, asignaturaId: number) {
    return this.prisma.alumnoAsignatura.delete({
      where: { alumnoId_asignaturaId: { alumnoId, asignaturaId } },
    });
  }
}
