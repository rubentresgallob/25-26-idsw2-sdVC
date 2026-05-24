import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ICorrectorService, ResultadoCorreccion } from './corrector.interface';

@Injectable()
export class DigitalCorrectorService implements ICorrectorService {
  constructor(private prisma: PrismaService) {}

  async corregir(examenId: number): Promise<ResultadoCorreccion> {
    const examen = await this.prisma.examen.findUnique({
      where: { id: examenId },
      include: {
        preguntas: true,
        respuestas: true,
      },
    });
    if (!examen) throw new NotFoundException(`Examen #${examenId} no encontrado`);

    const totalPreguntas = examen.preguntas.length;
    let nota = 0;
    let acertadas = 0;

    for (const respuestaAlumno of examen.respuestas) {
      const respuesta = await this.prisma.respuesta.findUnique({
        where: { id: respuestaAlumno.respuestaId },
      });
      if (respuesta?.esCorrecta) {
        const examenPregunta = examen.preguntas.find(
          p => p.preguntaId === respuestaAlumno.preguntaId,
        );
        nota += examenPregunta?.peso ?? 0;
        acertadas++;
      }
    }

    return { nota: Math.round(nota * 100) / 100, totalPreguntas, acertadas };
  }
}
