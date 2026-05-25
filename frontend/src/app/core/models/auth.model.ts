export type Rol = 'DOCENTE' | 'ADMINISTRADOR';

export interface AuthResponse {
  access_token: string;
  rol: Rol;
}

export interface UsuarioPerfil {
  id: number;
  nombre: string;
  apellidos: string;
  email: string;
  username: string;
  dni: string;
  rol: Rol;
}
