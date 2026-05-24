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
        preguntas: { include: { pregunta: { include: { respuestas: true } } } },
        respuestas: true,
      },
    });
    if (!examen) throw new NotFoundException(`Examen #${examenId} no encontrado`);

    const totalPreguntas = examen.preguntas.length;
    let acertadas = 0;

    for (const respuestaAlumno of examen.respuestas) {
      const respuesta = await this.prisma.respuesta.findUnique({
        where: { id: respuestaAlumno.respuestaId },
      });
      if (respuesta?.esCorrecta) acertadas++;
    }

    const nota = totalPreguntas > 0 ? (acertadas / totalPreguntas) * 10 : 0;
    return { nota: Math.round(nota * 100) / 100, totalPreguntas, acertadas };
  }
}
