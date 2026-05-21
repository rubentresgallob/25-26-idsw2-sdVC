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
🎯 Pendiente: decidir stack tecnológico e iniciar implementación
