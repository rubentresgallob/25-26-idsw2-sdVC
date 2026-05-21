# Estado del Proyecto — Jorgestor

Última actualización: 2026-05-21 (Sesión 1)

---

## Estado actual

### ✅ Completado
- Repo inicializado con estructura base (`src/`, `documents/`, `images/`, `modelosUML/`, `conversation-log.md`, `QUE_HACE.md`, `README.md`, `2Think.md`)
- Carpeta `context/` creada con toda la documentación de contexto
- Modelo de dominio revisado y documentado en `context/dominio.md`

### 🎯 Pendiente (próximas sesiones)
- [ ] Rellenar `QUE_HACE.md` con la frase definitiva (confirmar con Rubén)
- [ ] Decidir stack tecnológico (frontend + backend)
- [ ] Crear diagramas UML `.puml` en `/modelosUML`
- [ ] Implementar backend (autenticación, gestión de entidades)
- [ ] Implementar frontend
- [ ] Configurar base de datos
- [ ] Implementar generación de exámenes (core del sistema)
- [ ] Implementar corrección automática con IA
- [ ] Actualizar `README.md` con presentación del sistema construido
- [ ] Analizar resultado frente a principios IDSW2 (SOLID, cohesión, acoplamiento)

---

## Decisiones tomadas

| Fecha | Decisión | Motivo |
|-------|----------|--------|
| 2026-05-21 | Crear carpeta `context/` para persistencia entre sesiones | El usuario lo solicitó explícitamente en la primera sesión |

---

## Stack por decidir

Opciones razonables para este proyecto:
- **Backend:** Spring Boot (Java) / NestJS (TypeScript) / FastAPI (Python)
- **Frontend:** React / Angular / Vue
- **BD:** PostgreSQL / MySQL
- **IA corrección:** OpenCV / Tesseract / API externa de visión

> Pendiente de decisión con Rubén en próxima sesión activa.

---

## Notas importantes
- El alumno es estudiante de 3º de Ingeniería Informática (Universidad Europea del Atlántico)
- El `conversation-log.md` debe rellenarse en **tiempo real** durante cada sesión
- Los commits deben contar una historia coherente del proceso
- La IA de corrección de exámenes es la funcionalidad más compleja — puede implementarse con una API de visión (ej. OpenAI Vision, Google Vision)
