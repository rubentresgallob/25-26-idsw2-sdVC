# Estado del Proyecto — Jorgestor

Última actualización: 2026-05-21 (Sesión 2)

---

## Estado actual

### ✅ Completado
- Repo inicializado con estructura base
- Carpeta `context/` creada con toda la documentación de contexto
- Modelo de dominio revisado y documentado en `context/dominio.md`
- **Stack tecnológico decidido:** NestJS + Angular + PostgreSQL + API Vision externa
- **Backend scaffoldeado:** NestJS con 10 módulos de dominio, Prisma, JWT, Swagger
- **Schema Prisma completo:** 11 modelos (Usuario, Docente, Administrador, Grado, Asignatura, Alumno, BateriaDePreguntas, Pregunta, Respuesta, Examen, ExamenPregunta)
- **Frontend scaffoldeado:** Angular con arquitectura core/shared/features

### 🎯 Pendiente (próximas sesiones)
- [ ] Rellenar `QUE_HACE.md` con la frase definitiva (confirmar con Rubén)
- [ ] Crear diagramas UML `.puml` en `/modelosUML`
- [ ] **Implementar Auth:** registro/login JWT, guards, interceptores
- [ ] **Implementar CRUD:** Grado, Asignatura, Alumno, Pregunta (con DTOs y validación)
- [ ] **Implementar generación de exámenes** (core del sistema)
- [ ] **Implementar corrección automática** (API Vision externa)
- [ ] Conectar frontend Angular con backend
- [ ] Actualizar `README.md` con presentación del sistema construido
- [ ] Analizar resultado frente a principios IDSW2 (SOLID, cohesión, acoplamiento)

---

## Stack decidido

| Capa | Tecnología | Motivo |
|------|-----------|--------|
| Backend | NestJS + TypeScript | Conocido por el alumno, SOLID-friendly |
| ORM | Prisma + PostgreSQL | Modelo relacional complejo |
| Frontend | Angular | DI nativo, módulos, alineado con IDSW2 |
| IA corrección | API Vision externa | Pragmatismo: foco en diseño SW |

---

## Estructura de carpetas

```
25-26-idsw2-sdVC/
├── backend/           ← NestJS API REST
│   ├── src/
│   │   ├── auth/
│   │   ├── prisma/    ← PrismaService (global)
│   │   ├── usuario/
│   │   ├── docente/
│   │   ├── administrador/
│   │   ├── grado/
│   │   ├── asignatura/
│   │   ├── alumno/
│   │   ├── bateria-preguntas/
│   │   ├── pregunta/
│   │   └── examen/
│   └── prisma/        ← schema.prisma
├── frontend/          ← Angular SPA
│   └── src/app/
│       ├── core/      ← auth service, guards, interceptors
│       ├── shared/    ← componentes reutilizables
│       └── features/  ← módulos por dominio
└── context/           ← persistencia entre sesiones
```

---

## Decisiones tomadas

| Fecha | Decisión | Motivo |
|-------|----------|--------|
| 2026-05-21 | Crear carpeta `context/` para persistencia entre sesiones | El usuario lo solicitó explícitamente en la primera sesión |
| 2026-05-21 | NestJS + Angular + PostgreSQL como stack | NestJS conocido + Angular alineado con SOLID + PG para modelo relacional |
| 2026-05-21 | Corrección automática = API Vision externa | Pragmatismo: elimina dependencia de ML local |
| 2026-05-21 | 1 módulo NestJS por entidad de dominio | Alta cohesión, SRP visible en estructura de carpetas |

---

## Notas importantes
- El alumno es estudiante de 3º de Ingeniería Informática (Universidad Europea del Atlántico)
- El `conversation-log.md` debe rellenarse en **tiempo real** durante cada sesión
- Los commits deben contar una historia coherente del proceso
- La IA de corrección de exámenes es la funcionalidad más compleja
- Para arrancar localmente necesita PostgreSQL en `localhost:5432` con DB `jorgestor_db`
