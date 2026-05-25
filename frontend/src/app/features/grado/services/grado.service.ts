import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api';
import { Grado, CreateGradoDto } from '../models/grado.model';

@Injectable({ providedIn: 'root' })
export class GradoService {
  private readonly path = 'grados';

  constructor(private api: ApiService) {}

  getAll(): Observable<Grado[]> {
    return this.api.get<Grado[]>(this.path);
  }

  getOne(id: number): Observable<Grado> {
    return this.api.get<Grado>(`${this.path}/${id}`);
  }

  crear(dto: CreateGradoDto): Observable<Grado> {
    return this.api.post<Grado>(this.path, dto);
  }

  actualizar(id: number, dto: CreateGradoDto): Observable<Grado> {
    return this.api.put<Grado>(`${this.path}/${id}`, dto);
  }

  eliminar(id: number): Observable<void> {
    return this.api.delete<void>(`${this.path}/${id}`);
  }
}
