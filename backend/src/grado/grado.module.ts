import { Module } from '@nestjs/common';
import { GradoController } from './grado.controller';
import { GradoService } from './grado.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [GradoController],
  providers: [GradoService],
  exports: [GradoService],
})
export class GradoModule {}
