import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApiService } from './api';
import { AuthResponse, Rol, UsuarioPerfil } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'jg_token';
  private readonly ROL_KEY = 'jg_rol';

  constructor(private api: ApiService) {}

  login(email: string, password: string): Observable<AuthResponse> {
    return this.api
      .post<AuthResponse>('auth/login', { email, password })
      .pipe(
        tap((res) => {
          localStorage.setItem(this.TOKEN_KEY, res.access_token);
          localStorage.setItem(this.ROL_KEY, res.rol);
        }),
      );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.ROL_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getRol(): Rol | null {
    return localStorage.getItem(this.ROL_KEY) as Rol | null;
  }

  esAdmin(): boolean {
    return this.getRol() === 'ADMINISTRADOR';
  }

  getPerfil(): Observable<UsuarioPerfil> {
    return this.api.get<UsuarioPerfil>('auth/perfil');
  }
}
