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

Se evaluaron las opciones de backend (NestJS, Spring Boot, FastAPI), frontend (Angular, React, Vue) y base de datos. Se decidió NestJS + Angular + PostgreSQL con Prisma como ORM.

**Motivos clave:**
- NestJS conocido → velocidad de desarrollo
- Angular alineado con SOLID (DI nativo, módulos, tipado fuerte)
- PostgreSQL para el modelo relacional complejo del dominio
- API externa de visión para la corrección: pragmatismo, foco en diseño SW

**[~10:10] Tipo de aplicación**

Se descartó la app móvil. El sistema es una **web SPA**: los docentes trabajan desde PC y necesitan pantalla grande para subir y gestionar exámenes.

**[~10:15] Scaffolding backend NestJS**

- Proyecto NestJS creado en `backend/`
- Dependencias instaladas: Prisma, JWT, Passport, Swagger, class-validator
- Schema Prisma completo con 11 modelos: `Usuario`, `Docente`, `Administrador`, `Grado`, `Asignatura`, `Alumno`, `BateriaDePreguntas`, `Pregunta`, `Respuesta`, `Examen`, `ExamenPregunta`
- 10 módulos NestJS generados (uno por concepto de dominio)
- `PrismaService` configurado como módulo global exportado
- `main.ts` con CORS, ValidationPipe, Swagger en `/docs`

Decisión estructural: 1 módulo por entidad de dominio → alta cohesión, SRP visible en carpetas.

**[~10:25] Scaffolding frontend Angular**

- Proyecto Angular creado en `frontend/` con SCSS y routing
- 8 módulos de dominio en `features/`: auth, grado, asignatura, alumno, pregunta, examen
- Módulos `core/` y `shared/` siguiendo arquitectura de tres capas
- `AuthService`, `ApiService`, `AuthGuard`, `AuthInterceptor` en `core/`
- Entornos configurados: dev (`localhost:3000`) y producción

Decisión estructural: arquitectura Angular `core/shared/features` → bajo acoplamiento entre módulos de dominio.

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

---

## Conversación 3 — 2026-05-24

**Participantes:** Rubén Tresgallo + Claude Sonnet 4.6

### Contexto

Tercera sesión. Stack scaffoldeado y commiteado. Se retoma para implementar funcionalidad real: autenticación JWT y CRUDs de dominio.

### Objetivos

- Implementar autenticación JWT (registro y login)
- Implementar CRUDs de Grado, Asignatura, Alumno y Pregunta

### Desarrollo Principal

**Autenticación JWT**

Se implementó el módulo `auth` completo:
- DTOs de registro y login con validación via `class-validator`
- `AuthService`: registro con hash bcrypt, login, generación de JWT firmado con `JWT_SECRET`
- Al registrar un `DOCENTE`, se crea automáticamente su fila en `Docente`; ídem para `ADMINISTRADOR`
- `JwtStrategy` para validar tokens entrantes vía Bearer header
- `RolesGuard` + decorador `@Roles()` para control de acceso por rol
- Endpoint `GET /auth/perfil` protegido con `JwtAuthGuard`

**CRUDs de dominio**

Se implementaron los módulos: `Grado`, `Asignatura`, `Alumno`, `Pregunta`.

Decisiones de diseño aplicadas:
- Cada módulo importa `PrismaModule` y `AuthModule` — bajo acoplamiento, DIP respetado
- `AsignaturaService.crear()` crea automáticamente la `BateriaDePreguntas` asociada (composición del dominio)
- Endpoints de relaciones N:N como sub-recursos REST: `POST /asignaturas/:id/grados/:gradoId`, `POST /alumnos/:id/asignaturas/:asignaturaId`
- `PreguntaController` anidado bajo `/baterias/:bateriaId/preguntas` para reflejar la composición del dominio
- `PATCH /baterias/:id/preguntas/:id/toggle` para habilitar/deshabilitar preguntas sin PUT completo

**Incidencia: Prisma 7 incompatible con NestJS estándar**

El CLI instaló Prisma 7.x, que eliminó `url` del bloque `datasource` en `schema.prisma` y requiere adaptadores PG explícitos. Se decidió downgrade a Prisma 5 para mantener el foco en el diseño SW. `prisma.config.ts` eliminado.

### Decisiones

| Decisión | Motivo |
|----------|--------|
| Downgrade a Prisma 5 | Prisma 7 tiene breaking changes que añaden complejidad no relacionada con el diseño SW |
| Crear `BateriaDePreguntas` dentro de `AsignaturaService` | La batería es una composición de la asignatura en el dominio, no debe crearse por separado |
| Rutas N:N como sub-recursos REST | Refleja la semántica del dominio y mantiene los controllers cohesivos |
| `PreguntaController` bajo `/baterias/:id/preguntas` | Expresa la dependencia de composición Batería→Pregunta en la URL |

### Estado al finalizar

✅ Auth JWT funcional (registro, login, perfil, guards por rol)  
✅ CRUD completo: Grado, Asignatura, Alumno, Pregunta  
✅ `npx tsc --noEmit` sin errores  

---

**Módulo Examen — diseño y debate previo**

Antes de implementar se debatieron las decisiones de diseño clave:
- Estado explícito (`EstadoExamen`: GENERADO → ASIGNADO → CORREGIDO) frente a estado inferido
- Separación de `generarExamenes` y `asignarExamenes` como operaciones distintas
- Corrección digital de inicio, escalable a imagen sin cambiar `ExamenService` (OCP)

Se acordó una arquitectura con abstracción `ICorrectorService` que permite intercambiar implementaciones sin modificar el servicio orquestador.

**Módulo Examen — implementación**

- `ICorrectorService` (interfaz) + token de inyección `CORRECTOR_SERVICE`
- `DigitalCorrectorService`: cruza respuestas del alumno con las correctas y calcula nota sobre 10
- `ImageCorrectorService`: stub preparado para futura integración con API de visión
- Schema Prisma actualizado: enum `EstadoExamen`, `alumnoId` nullable (el examen existe antes de asignarse), modelo `RespuestaAlumno` para corrección digital
- `ExamenService`: genera variantes mediante selección aleatoria por proporción de dificultad; orquesta los tres flujos (generar, asignar, corregir) delegando la corrección en `ICorrectorService`
- `ExamenModule` registra `DigitalCorrectorService` como provider de `CORRECTOR_SERVICE` — cambiar a imagen solo requiere cambiar `useClass`

**Principios IDSW2 aplicados explícitamente:**
- **OCP**: `ExamenService` no cambia al añadir `ImageCorrectorService`
- **DIP**: `ExamenService` depende de `ICorrectorService`, nunca de la clase concreta
- **SRP**: cada corrector tiene una única responsabilidad

### Estado al finalizar

✅ Auth JWT funcional (registro, login, perfil, guards por rol)  
✅ CRUD completo: Grado, Asignatura, Alumno, Pregunta  
✅ Módulo Examen completo: generación, asignación, corrección digital  
✅ Arquitectura de corrección escalable a imagen (OCP + DIP)  
✅ `npx tsc --noEmit` sin errores  
🎯 Próximo: conectar frontend Angular con la API

---

## Conversación 4 — 2026-05-25

**Participantes:** Rubén Tresgallo + Claude Sonnet 4.6

### Contexto

Cuarta sesión. Backend completamente funcional. Frontend scaffoldeado pero vacío. Objetivo: implementar la capa core del frontend y el módulo de autenticación con Angular Material.

### Objetivos

- Revisar el estado del proyecto y planificar el frontend completo
- Implementar core (ApiService, AuthService, interceptor, guard)
- Implementar Auth feature (login page con Angular Material)
- Implementar layout principal (sidenav + toolbar)

### Desarrollo Principal

**Decisión de alcance**

Se decidió construir el frontend completo (MVP + Angular Material + estilos cuidados), módulo a módulo empezando por core + auth.

**Instalación de dependencias**

Se instalaron `@angular/material@21.2.12`, `@angular/cdk` y `@angular/animations`. Material 21 en modo M3 (Material Design 3).

**Capa Core implementada**

- `ApiService`: wrapper de `HttpClient` con base URL del environment. Métodos `get`, `post`, `put`, `patch`, `delete` tipados con generics.
- `AuthService`: login con tap para guardar `access_token` y `rol` en `localStorage`. Métodos `isAuthenticated`, `getToken`, `getRol`, `esAdmin`, `logout`.
- `authInterceptor` (funcional): inyecta `AuthService` con `inject()`, añade `Authorization: Bearer <token>` a todas las requests si hay sesión.
- `authGuard` (funcional): redirige a `/login` si `isAuthenticated()` es falso.
- `auth.model.ts`: tipos `Rol`, `AuthResponse`, `UsuarioPerfil`.

**SharedModule**

Concentra todos los módulos de Angular Material (21 módulos), `ReactiveFormsModule`, `FormsModule`, `RouterModule`, `CommonModule` + declara y exporta `MainLayoutComponent`. Importado por AppModule y por todos los feature modules.

**MainLayoutComponent**

Layout completo con `mat-sidenav-container`: sidenav fija de 240px con logo + nav-list de ítems, toolbar superior con botón de logout. Ítems de nav filtrados por rol (docentes no ven la sección de administración). `routerLinkActive="nav-active"` para resaltar la ruta activa.

**Auth feature — Login**

Página de login con diseño centrado, card sobre fondo degradado azul. Formulario reactivo con validación: email (required + email), password (required). Botón de mostrar/ocultar contraseña. Spinner durante el login. Mensaje de error en línea.

**App routing**

Lazy loading de todos los módulos feature. Ruta raíz protegida por `authGuard`, muestra `MainLayoutComponent` con hijos. Redirección `/` → `/grados`. Feature modules stub tienen `RouterModule.forChild([])` para que el lazy loading funcione sin errores.

**Resultado de compilación**

`npm run build` sin errores. Lazy chunks generados para cada feature module. Warning de bundle size (Material es grande) pero no es un error.

### Decisiones

| Decisión | Motivo |
|----------|--------|
| `provideHttpClient(withInterceptors([]))` en AppModule | Interceptor funcional requiere esta API (Angular 17+), compatible con NgModule |
| `provideAnimationsAsync()` en providers | API moderna de Angular 17+, carga animaciones de forma asíncrona |
| SharedModule declara MainLayoutComponent | Evita circular dependency; el layout necesita Material que está en SharedModule |
| Token y rol guardados en localStorage por separado | El backend devuelve `{ access_token, rol }` explícitamente; evita decodificar JWT en frontend |
| Feature modules stub con `RouterModule.forChild([])` | Permite lazy loading sin errores hasta que se implementen los componentes |

### Estado al finalizar

✅ Core completo: ApiService, AuthService, interceptor, guard  
✅ Login page funcional con Angular Material  
✅ Layout principal con sidenav y toolbar  
✅ Routing con lazy loading configurado para todos los módulos  
✅ Build sin errores — dev server en http://localhost:4200  
🎯 Próximo: módulo Grado (lista + formulario crear/editar)
