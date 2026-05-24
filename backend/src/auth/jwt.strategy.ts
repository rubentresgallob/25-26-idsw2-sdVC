import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET as string,
    });
  }

  async validate(payload: { sub: number; email: string; rol: string }) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id: payload.sub },
    });
    if (!usuario) throw new UnauthorizedException();
    return usuario;
  }
}
