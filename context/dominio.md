# Modelo de Dominio — Jorgestor

Fuente: https://github.com/martinlopez7/25-26-IdSw1-SdR

---

## ¿Qué es el sistema?

**Jorgestor** es un sistema de gestión de exámenes tipo test para instituciones universitarias. Permite a los docentes generar exámenes personalizados con claves únicas por alumno y corregirlos automáticamente mediante IA de reconocimiento de imagen.

---

## Actores

| Actor | Descripción |
|-------|-------------|
| **Docente** | Actor principal. Gestiona la batería de preguntas, genera exámenes, los asigna a alumnos y los corrige con IA. |
| **Administrador Institucional** | Gestiona las cuentas de los docentes en la plataforma. |
| **Tiempo** | Actor automático (sistema). Cierra la sesión tras un período de inactividad. |

Ambos actores humanos parten del estado `SESIÓN_CERRADA` → `iniciarSesion()` → `SISTEMA_DISPONIBLE`.

---

## Casos de Uso (41 en total)

### Máxima prioridad
1. `corregirExamenes()` — Docente sube exámenes realizados, el sistema usa IA para corregirlos
2. `generarExamenes()` — Docente introduce parámetros y el sistema genera los exámenes
3. `importarConfiguracionGlobal()` / `exportarConfiguracionGlobal()`

### Docente
- `iniciarSesion()`, `cerrarSesion()`
- `generarExamenes()`, `asignarExamenes()`, `corregirExamenes()`, `cancelarGeneracion()`
- `crearPregunta()`, `editarPregunta()`, `eliminarPregunta()`, `verPreguntas()`
- `crearRespuesta()`, `editarRespuesta()`, `eliminarRespuesta()`, `verRespuestas()`
- `crearAsignatura()`, `editarAsignatura()`, `eliminarAsignatura()`, `verAsignaturas()`
- `crearGrado()`, `editarGrado()`, `eliminarGrado()`, `verGrados()`
- `crearAlumno()`, `editarAlumno()`, `eliminarAlumno()`, `verAlumnos()`
- `importarPreguntas()`, `importarAlumnos()`, `importarAsignaturas()`, `importarGrados()`
- `exportarPreguntas()`, `exportarAlumnos()`, `exportarAsignaturas()`, `exportarGrados()`
- `importarConfiguracionGlobal()`, `exportarConfiguracionGlobal()`
- `completarGestion()` (caso de uso abstracto compartido)

### Administrador Institucional
- `iniciarSesion()`, `cerrarSesion()`
- `crearDocente()`, `editarDocente()`, `eliminarDocente()`, `verDocentes()`

---

## Entidades del Dominio

```
Grado
  - titulo
  - codigo

Asignatura
  - titulo
  - codigo
  - cursoAcademico
  [pertenece a 1 Grado]

Profesor
  - nombre, apellidos, DNI
  [tiene N Asignaturas (agregación)]

Alumno
  - nombre, apellidos, DNI
  [se cursa en 1..N Grados]
  [se imparte en N Asignaturas]
  [realiza 0..1 Examen por evaluación]

BateriaDePreguntas
  [1 por Asignatura — composición]
  [contiene N Preguntas — composición]

Pregunta
  - enunciado
  - tema (Enum)
  - dificultad (Enum: BAJA/MEDIA/ALTA)
  - habilitada/inhabilitada
  [pertenece a 1 BateriaDePreguntas]
  [contiene N Respuestas — composición]
  [puede aparecer en N Exámenes — agregación]

Respuesta
  - opcion
  - esCorrecta (boolean)
  [pertenece a 1 Pregunta]

Examen
  - claveCorreccion (alfanumérica, única por alumno)
  - evaluacion (Enum: Parcial1/2/3, Final, Extraordinario)
  [pertenece a 1 Asignatura]
  [contiene N Preguntas — agregación]
  [asignado a 1 Alumno]
```

### Relaciones de cardinalidad clave
- Profesor 1 → N Asignaturas (agregación)
- Grado N ↔ N Asignaturas (composición curricular)
- Grado 1 → N Alumnos (composición)
- Asignatura N ↔ N Alumnos (matriculación)
- Asignatura 1 → N Exámenes (uno por tipo de evaluación)
- Asignatura 1 → 1 BateriaDePreguntas (composición)
- BateriaDePreguntas 1 → N Preguntas (composición)
- Examen N ↔ N Preguntas (agregación, reutilización)
- Pregunta 1 → N Respuestas (composición)
- Alumno → 1 Examen por evaluación

---

## Flujos Principales

### generarExamenes
1. Docente solicita generar exámenes
2. Introduce: Asignatura, Temas, Nº exámenes por grado, Nº preguntas, cantidad de tipos por grado, proporción de dificultad, Evaluación (todos obligatorios)
3. Sistema confirma o devuelve error
4. Estado resultante: `EXAMENES_GENERADOS`

### asignarExamenes
1. Parte de `EXAMENES_GENERADOS`
2. Docente asigna alumnos destinatarios por grado
3. Sistema asigna claves alfanuméricas únicas
4. Estado resultante: `EXAMENES_ASIGNADOS`

### corregirExamenes
1. Docente sube exámenes realizados (imágenes de hojas de respuestas)
2. Sistema usa IA para leer claves y respuestas
3. Estado resultante: `EXAMENES_CORREGIDOS`

### crearPregunta
1. Docente solicita crear pregunta
2. Sistema pide: Asignatura, Enunciado, Tema, Dificultad
3. Crea pregunta y redirige a `editarPregunta()` para añadir respuestas

### crearDocente (Admin)
- Datos requeridos: Nombre, Apellidos, DNI, Usuario, Email, Password

---

## Requisitos Funcionales Clave

1. Jerarquía académica: Grados > Asignaturas > Alumnos/Profesores
2. Batería de preguntas por asignatura con temas y niveles de dificultad
3. Generación parametrizada (proporciones de dificultad configurables)
4. Claves alfanuméricas únicas por examen/alumno (anti-fraude)
5. Variantes de examen por grado dentro de la misma evaluación
6. Corrección automática via IA (reconocimiento de imagen en hojas de respuestas)
7. Importación/exportación masiva de datos
8. Sesión con timeout automático por inactividad
9. Preguntas habilitables/deshabilitables
10. Historial de exámenes por tipo de evaluación
