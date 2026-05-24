import { Module } from '@nestjs/common';
import { AsignaturaController } from './asignatura.controller';
import { AsignaturaService } from './asignatura.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [AsignaturaController],
  providers: [AsignaturaService],
  exports: [AsignaturaService],
})
export class AsignaturaModule {}
