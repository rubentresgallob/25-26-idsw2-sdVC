import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Rol } from '@prisma/client';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const rolesRequeridos = this.reflector.getAllAndOverride<Rol[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!rolesRequeridos) return true;

    const { user } = context.switchToHttp().getRequest();
    return rolesRequeridos.includes(user.rol);
  }
}
