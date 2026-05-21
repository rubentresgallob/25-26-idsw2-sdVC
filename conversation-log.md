# Conversation log

> El log no se reescribe. Se escribe mientras ocurre.
> Cada entrada recoge los objetivos, lo que se hizo y las decisiones tomadas en esa sesión.

---

## Conversación 1 — 2026-05-21

**Participantes:** Rubén Tresgallo + Claude Sonnet 4.6

### Contexto

Primera sesión del proyecto. El alumno parte de un modelo de dominio completo desarrollado en IDSW1 (repo: https://github.com/martinlopez7/25-26-IdSw1-SdR) y necesita llevarlo a producción como trabajo de vibe coding para IDSW2.

### Objetivos

- Poner a Claude en contexto del proyecto, la metodología y los repos de referencia
- Crear una carpeta de contexto persistente entre sesiones


### Lo que se hizo

- Se exploraron los tres repos de referencia: dominio del sistema, ejemplo pySigHor y temario IDSW2
- Se documentó el modelo de dominio completo de **Jorgestor** (41 casos de uso, 3 actores, 9 entidades)
- Se creó la carpeta `context/` con el dominio, los principios del curso y el estado del proyecto

### Decisiones

| Decisión | Motivo |
|----------|--------|
| Crear carpeta `context/` en el repo | Persistir contexto entre sesiones sin tener que re-explicar el proyecto |

| Corrección automática = digital, no por imagen | Elimina la dependencia de una API de visión que podría fallar en la demo |

### Estado al finalizar

✅ Contexto documentado y persistido  
✅ Stack tecnológico decidido: NestJS + Angular + PostgreSQL + API Vision externa

---

## Conversación 2 — 2026-05-21

**Participantes:** Rubén Tresgallo + Claude Sonnet 4.6

### Contexto

Segunda sesión. Se retoma desde el contexto persistido en `context/`. Stack ya decidido. Objetivo: levantar la estructura completa del proyecto (backend + frontend).

### Objetivos

- Decidir stack definitivo con criterio razonado
- Crear estructura `backend/` (NestJS) y `frontend/` (Angular)
- Tener un proyecto que arranque (aunque sin lógica de negocio aún)

### Desarrollo Principal

**[~10:00] Decisión de stack**

**Prompt:** "vamos a decidir el stack a utilizar, según tu criterio, cual puede irnos mejor"

**Resultado:** Claude propone NestJS + Angular + PostgreSQL (Prisma) + API Vision externa

**Decisión:** Rubén acepta. Motivos principales:
- NestJS ya conocido por el alumno → velocidad de desarrollo
- Angular alineado con SOLID (DI nativo, módulos, tipado fuerte)
- PostgreSQL para el modelo relacional complejo del dominio
- API externa de visión: pragmático, foco en diseño SW

**[~10:10] Tipo de aplicación**

**Prompt:** "¿web, app...?"

**Resultado:** Claude recomienda web SPA (no móvil)

**Decisión:** Aceptado. Los docentes trabajan desde PC; subir imágenes de exámenes requiere pantalla grande.

**[~10:15] Scaffolding backend NestJS**

**Resultado:**
- Proyecto NestJS creado en `backend/`
- Dependencias instaladas: Prisma, JWT, Passport, Swagger, class-validator
- Schema Prisma completo con 11 modelos: `Usuario`, `Docente`, `Administrador`, `Grado`, `Asignatura`, `Alumno`, `BateriaDePreguntas`, `Pregunta`, `Respuesta`, `Examen`, `ExamenPregunta`
- 10 módulos NestJS generados (uno por concepto de dominio)
- `PrismaService` configurado como módulo global exportado
- `main.ts` con CORS, ValidationPipe, Swagger en `/docs`

**Decisión:** Estructura modular 1-módulo-por-entidad. Favorece SRP y bajo acoplamiento.

**[~10:25] Scaffolding frontend Angular**

**Resultado:**
- Proyecto Angular creado en `frontend/` con SCSS y routing
- 8 módulos de dominio en `features/`: auth, grado, asignatura, alumno, pregunta, examen
- Módulos `core/` y `shared/` siguiendo arquitectura de tres capas
- `AuthService`, `ApiService`, `AuthGuard`, `AuthInterceptor` en `core/`
- Entornos configurados: `environment.ts` (dev, apiUrl localhost:3000) y `environment.prod.ts`

**Decisión:** Arquitectura Angular por capas (core / shared / features) — favorece bajo acoplamiento entre módulos de dominio.

### Decisiones

| Decisión | Motivo |
|----------|--------|
| NestJS como backend | Stack conocido + SOLID-friendly por DI y decoradores |
| Angular como frontend | DI nativo, tipado fuerte, módulos — alineado con IDSW2 |
| PostgreSQL + Prisma | Modelo relacional complejo (11 tablas, relaciones N:N) |
| API externa para corrección IA | Pragmatismo: foco en diseño SW, no en ML |
| 1 módulo NestJS por entidad de dominio | Alta cohesión, SRP visible en estructura de carpetas |
| Arquitectura Angular core/shared/features | Bajo acoplamiento entre módulos de feature |

### Estado al finalizar

✅ Backend NestJS scaffoldeado con todos los módulos del dominio  
✅ Schema Prisma completo (11 modelos, enums, relaciones)  
✅ Frontend Angular scaffoldeado con arquitectura por capas  
🎯 Próximo: implementar lógica de Auth (JWT), CRUD de Grado/Asignatura/Alumno/Pregunta
