import { Module } from '@nestjs/common';
import { ExamenController } from './examen.controller';
import { ExamenService } from './examen.service';
import { DigitalCorrectorService } from './corrector/digital.corrector';
import { CORRECTOR_SERVICE } from './corrector/corrector.interface';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [ExamenController],
  providers: [
    ExamenService,
    DigitalCorrectorService,
    {
      provide: CORRECTOR_SERVICE,
      useClass: DigitalCorrectorService,
    },
  ],
})
export class ExamenModule {}
