import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { DocenteModule } from './docente/docente.module';
import { AdministradorModule } from './administrador/administrador.module';
import { GradoModule } from './grado/grado.module';
import { AsignaturaModule } from './asignatura/asignatura.module';
import { AlumnoModule } from './alumno/alumno.module';
import { BateriaPreguntasModule } from './bateria-preguntas/bateria-preguntas.module';
import { PreguntaModule } from './pregunta/pregunta.module';
import { ExamenModule } from './examen/examen.module';

@Module({
  imports: [PrismaModule, AuthModule, UsuarioModule, DocenteModule, AdministradorModule, GradoModule, AsignaturaModule, AlumnoModule, BateriaPreguntasModule, PreguntaModule, ExamenModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
