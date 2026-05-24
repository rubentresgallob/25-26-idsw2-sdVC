import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Rol } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existe = await this.prisma.usuario.findFirst({
      where: { OR: [{ email: dto.email }, { dni: dto.dni }, { username: dto.username }] },
    });
    if (existe) throw new ConflictException('Email, DNI o username ya registrado');

    const hash = await bcrypt.hash(dto.password, 10);
    const usuario = await this.prisma.usuario.create({
      data: {
        nombre: dto.nombre,
        apellidos: dto.apellidos,
        dni: dto.dni,
        username: dto.username,
        email: dto.email,
        password: hash,
        rol: dto.rol ?? Rol.DOCENTE,
      },
    });

    if (usuario.rol === Rol.DOCENTE) {
      await this.prisma.docente.create({ data: { usuarioId: usuario.id } });
    } else {
      await this.prisma.administrador.create({ data: { usuarioId: usuario.id } });
    }

    return this.firmarToken(usuario.id, usuario.email, usuario.rol);
  }

  async login(dto: LoginDto) {
    const usuario = await this.prisma.usuario.findUnique({ where: { email: dto.email } });
    if (!usuario) throw new UnauthorizedException('Credenciales incorrectas');

    const valida = await bcrypt.compare(dto.password, usuario.password);
    if (!valida) throw new UnauthorizedException('Credenciales incorrectas');

    return this.firmarToken(usuario.id, usuario.email, usuario.rol);
  }

  private firmarToken(id: number, email: string, rol: Rol) {
    const payload = { sub: id, email, rol };
    return {
      access_token: this.jwtService.sign(payload),
      rol,
    };
  }
}
