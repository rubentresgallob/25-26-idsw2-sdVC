export interface ResultadoCorreccion {
  nota: number;
  totalPreguntas: number;
  acertadas: number;
}

export interface ICorrectorService {
  corregir(examenId: number): Promise<ResultadoCorreccion>;
}

export const CORRECTOR_SERVICE = 'CORRECTOR_SERVICE';
