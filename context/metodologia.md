# Metodología y Principios — IDSW2

Fuente: https://github.com/mmasias/idsw2

---

## Qué es este trabajo (VibeCoding)

Construir un sistema con IA y documentar el proceso. Todos los artefactos son **obligatorios**:

| # | Artefacto | Regla |
|---|-----------|-------|
| 0 | `QUE_HACE.md` | Primer commit. **No se modifica jamás.** |
| 1 | `README.md` | Presentación del sistema construido. |
| 2 | Código fuente | `/src`, o `/backend` y `/frontend` |
| 3 | Diagramas UML | Fuentes `.puml` en `/modelosUML`, SVGs en `/images` |
| 4 | Imágenes | En `/images`, referenciadas desde README |
| 5 | Documentación adicional | En `/documents` |
| 6 | `conversation-log.md` | **Innegociable.** Escrito durante la sesión, no después. |

---

## Baremos de evaluación

### Dimensión profesional (binaria: cumple o no cumple)
- ✅ El sistema **arranca**. No "compilaría si instalas X": **arranca**.
- ✅ Lo que dice `QUE_HACE.md` es **exactamente** lo que hace el sistema.
- ✅ El `conversation-log.md` fue escrito **durante** la sesión, no reconstruido.
- ✅ El README lo puede leer alguien que no estuvo en la sesión.

### Dimensión académica (admite gradación)
- El análisis identifica qué principios están presentes, cuáles ausentes y por qué.
- La reflexión sobre la distancia entre lo descrito y lo entregado es honesta y argumentada.
- Los commits cuentan una historia coherente del proceso.

---

## Principios de Diseño (IDSW2)

### Diseño Modular — tres criterios obligatorios

1. **Alta cohesión**: cada módulo tiene una sola responsabilidad enfocada.
2. **Bajo acoplamiento**: minimizar dependencias, especialmente hacia elementos inestables.
3. **Tamaño apropiado**: unidades comprensibles de forma independiente.

### Principios SOLID

| Principio | Regla clave | Señal de violación |
|-----------|-------------|-------------------|
| **S** — SRP | Una clase, una razón para cambiar | Múltiples actores piden cambios a la misma clase |
| **O** — OCP | Abierto a extensión, cerrado a modificación | Agregar funcionalidad requiere modificar código existente |
| **L** — LSP | Un subtipo debe respetar el contrato de su base | Subclases con precondiciones más fuertes |
| **I** — ISP | Clientes no dependen de lo que no usan | Interfaces "gordas" con métodos que algunas clases dejan vacíos |
| **D** — DIP | Depender de abstracciones, no de implementaciones | Alto nivel importa clases concretas directamente |

> ⚠️ Tratar SOLID como dogma es la principal causa de sobre-ingeniería. Son vocabulario para identificar problemas, no recetas.

### Antipatrones explícitos a evitar
- **Descomposición funcional** — antipatrón en organización de clases
- **Clase dios** — baja cohesión, múltiples responsabilidades, `if-else` en lugar de polimorfismo
- **Comprobaciones `instanceof`** — destruye la abstracción y viola LSP
- **Cadenas de llamadas** (`objeto.getX().getY().hacerAlgo()`) — viola la Ley de Demeter

### Herencia vs Composición
- **Herencia**: cuando existe relación genuina "es-un" y las subclases representan versiones especializadas.
- **Composición**: cuando combinar múltiples variaciones crearía explosión de subclases.
- **Herencia rechazada** (code smell): subclases que heredan métodos que no usan → refactorizar hacia composición.

### Ley de Demeter
Solo comunicarse con asociados directos. En vez de `auto.getMotor().arrancar()`, el `Auto` expone `arrancarMotor()`.

---

## Formato del conversation-log.md

```
## [HH:MM] Título breve de lo que se pidió

**Prompt:** lo que se le dijo al AI (textual o resumido fielmente)

**Resultado:** lo que produjo

**Decisión:** qué aceptó, qué rechazó, qué modificó, y por qué
```

**El log no se reescribe. Se escribe mientras ocurre.**

### Estilo extendido (referencia: pySigHor)
- Cabecera con badges de navegación
- Subsecciones: Contexto, Desarrollo Principal, Decisiones, Valor, Próximos Pasos, Estado Final
- Checkboxes emoji: ✅ completado, 🎯 pendiente, ⚠️ advertencia, ❌ descartado
- Tablas para métricas y comparativas
