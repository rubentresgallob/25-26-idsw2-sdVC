import { Module } from '@nestjs/common';
import { PreguntaController } from './pregunta.controller';
import { PreguntaService } from './pregunta.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [PreguntaController],
  providers: [PreguntaService],
  exports: [PreguntaService],
})
export class PreguntaModule {}
