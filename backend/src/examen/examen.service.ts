import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { Dificultad, EstadoExamen } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { GenerarExamenDto } from './dto/generar-examen.dto';
import { AsignarExamenDto } from './dto/asignar-examen.dto';
import { CorregirExamenDto } from './dto/corregir-examen.dto';
import { CORRECTOR_SERVICE } from './corrector/corrector.interface';
import type { ICorrectorService } from './corrector/corrector.interface';

@Injectable()
export class ExamenService {
  constructor(
    private prisma: PrismaService,
    @Inject(CORRECTOR_SERVICE) private corrector: ICorrectorService,
  ) {}

  // ── GENERACIÓN ────────────────────────────────────────────────────────────

  async generar(dto: GenerarExamenDto) {
    const bateria = await this.prisma.bateriaDePreguntas.findUnique({
      where: { asignaturaId: dto.asignaturaId },
      include: { preguntas: { where: { habilitada: true, tema: { in: dto.temas } } } },
    });
    if (!bateria) throw new NotFoundException('Batería de preguntas no encontrada para esta asignatura');

    const { baja, media, alta } = dto.proporcionalidad;
    if (baja + media + alta !== 100) {
      throw new BadRequestException('La proporcionalidad debe sumar 100');
    }

    const examenes = await Promise.all(
      Array.from({ length: dto.numVariantes }, () =>
        this.generarVariante(bateria.preguntas, dto),
      ),
    );

    return examenes;
  }

  private async generarVariante(
    preguntasDisponibles: { id: number; dificultad: Dificultad }[],
    dto: GenerarExamenDto,
  ) {
    const nBaja = Math.round((dto.proporcionalidad.baja / 100) * dto.numPreguntas);
    const nAlta = Math.round((dto.proporcionalidad.alta / 100) * dto.numPreguntas);
    const nMedia = dto.numPreguntas - nBaja - nAlta;

    const seleccionadas = [
      ...this.seleccionarAleatorio(preguntasDisponibles.filter(p => p.dificultad === Dificultad.BAJA), nBaja),
      ...this.seleccionarAleatorio(preguntasDisponibles.filter(p => p.dificultad === Dificultad.MEDIA), nMedia),
      ...this.seleccionarAleatorio(preguntasDisponibles.filter(p => p.dificultad === Dificultad.ALTA), nAlta),
    ];

    if (seleccionadas.length < dto.numPreguntas) {
      throw new BadRequestException(
        `No hay suficientes preguntas habilitadas para cumplir la proporcionalidad solicitada`,
      );
    }

    return this.prisma.examen.create({
      data: {
        claveCorreccion: this.generarClave(),
        evaluacion: dto.evaluacion,
        estado: EstadoExamen.GENERADO,
        asignaturaId: dto.asignaturaId,
        docenteId: dto.docenteId,
        preguntas: { create: seleccionadas.map(p => ({ preguntaId: p.id })) },
      },
      include: { preguntas: { include: { pregunta: true } } },
    });
  }

  private seleccionarAleatorio<T>(arr: T[], n: number): T[] {
    return [...arr].sort(() => Math.random() - 0.5).slice(0, n);
  }

  private generarClave(): string {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  }

  // ── ASIGNACIÓN ────────────────────────────────────────────────────────────

  async asignar(examenId: number, dto: AsignarExamenDto) {
    const examen = await this.findOne(examenId);
    if (examen.estado !== EstadoExamen.GENERADO) {
      throw new BadRequestException('Solo se pueden asignar exámenes en estado GENERADO');
    }

    return this.prisma.examen.update({
      where: { id: examenId },
      data: { alumnoId: dto.alumnoId, estado: EstadoExamen.ASIGNADO },
    });
  }

  // ── CORRECCIÓN ────────────────────────────────────────────────────────────

  async corregir(examenId: number, dto: CorregirExamenDto) {
    const examen = await this.findOne(examenId);
    if (examen.estado !== EstadoExamen.ASIGNADO) {
      throw new BadRequestException('Solo se pueden corregir exámenes en estado ASIGNADO');
    }

    await this.prisma.respuestaAlumno.createMany({
      data: dto.respuestas.map(r => ({
        examenId,
        preguntaId: r.preguntaId,
        respuestaId: r.respuestaId,
      })),
    });

    const resultado = await this.corrector.corregir(examenId);

    await this.prisma.examen.update({
      where: { id: examenId },
      data: { estado: EstadoExamen.CORREGIDO, nota: resultado.nota },
    });

    return resultado;
  }

  // ── CONSULTAS ─────────────────────────────────────────────────────────────

  findByAsignatura(asignaturaId: number) {
    return this.prisma.examen.findMany({
      where: { asignaturaId },
      include: { alumno: true, preguntas: { include: { pregunta: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const examen = await this.prisma.examen.findUnique({
      where: { id },
      include: {
        alumno: true,
        asignatura: true,
        preguntas: { include: { pregunta: { include: { respuestas: true } } } },
        respuestas: true,
      },
    });
    if (!examen) throw new NotFoundException(`Examen #${id} no encontrado`);
    return examen;
  }
}
