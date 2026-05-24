import { Injectable, NotImplementedException } from '@nestjs/common';
import { ICorrectorService, ResultadoCorreccion } from './corrector.interface';

/**
 * Implementación futura: extrae clave y respuestas marcadas desde
 * imagen de hoja de respuestas vía API de visión (ej. OpenAI Vision).
 * Una vez extraídas las respuestas, delega el cálculo al mismo algoritmo
 * que DigitalCorrectorService.
 */
@Injectable()
export class ImageCorrectorService implements ICorrectorService {
  async corregir(_examenId: number): Promise<ResultadoCorreccion> {
    throw new NotImplementedException('Corrección por imagen aún no implementada');
  }
}
