import { Module } from '@nestjs/common';
import { AlumnoController } from './alumno.controller';
import { AlumnoService } from './alumno.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [AlumnoController],
  providers: [AlumnoService],
  exports: [AlumnoService],
})
export class AlumnoModule {}
