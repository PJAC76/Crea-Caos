# Semana 2 — UX Flow, estados UI y prototipo navegable

Este documento ejecuta la **Semana 2** del plan para los minijuegos:

1. **Charades Cam**
2. **Spot the Difference Live**

> Objetivo de la semana: aterrizar la experiencia de usuario end-to-end (wireframes, estados, feedback, navegación) para habilitar implementación en Semana 3.

---

## 1) Entregables de Semana 2

- Wireframes funcionales de flujo por ronda para ambos juegos.
- Definición de estados UI (state machine de interfaz).
- Especificación de feedback visual/sonoro por evento.
- Prototipo navegable de baja fidelidad (sin lógica final).
- Checklist de QA UX para validación interna.

---

## 2) Mapa de pantallas (global)

### 2.1 Flujo común

1. **Lobby**
2. **Selección de minijuego**
3. **Briefing del minijuego** (reglas rápidas 1 pantalla)
4. **Countdown pre-ronda** (3, 2, 1)
5. **Ronda activa**
6. **Resultado de ronda**
7. **Scoreboard acumulado**
8. Repetir hasta fin de partida
9. **Leaderboard final**

### 2.2 Criterios UX globales

- Tiempo para entender una pantalla: <3 segundos.
- Botón principal siempre visible en parte inferior.
- Jerarquía visual fija: objetivo > tiempo > score > acciones secundarias.
- Feedback inmediato en cada acción crítica (<150 ms visual).

---

## 3) Wireframes textuales — Charades Cam

## 3.1 Pantallas por ronda

### A) Briefing Charades

- Header: nombre del modo + icono 🎭
- Card central: “Actúa sin hablar. Tu equipo adivina”.
- Chips de reglas rápidas:
  - No decir palabras
  - Puedes pasar (-20)
  - Bonus por rapidez
- CTA primario: **“Listos”**

### B) Countdown

- Número grande 3 → 2 → 1
- Indicador de jugador activo
- Fondo con cámara desenfocada para continuidad

### C) Ronda activa

- Top bar:
  - Tiempo restante
  - Score del equipo
  - Racha actual
- Card principal:
  - Categoría
  - Palabra a representar (tipografía XL)
- Zona de acciones:
  - Botón “✅ Acierto”
  - Botón “⏭ Pasar”

### D) Resultado de ronda

- Resumen de métricas:
  - Aciertos
  - Bonos de velocidad
  - Pases
  - Total ronda
- CTA: **“Siguiente turno”**

---

## 4) Wireframes textuales — Spot the Difference Live

## 4.1 Pantallas por ronda

### A) Briefing Spot

- Header: nombre del modo + icono 🔍
- Card central: “Encuentra 5 diferencias antes de que acabe el tiempo”.
- Reglas rápidas:
  - Tap correcto suma
  - Tap incorrecto resta
  - Completar 5/5 da bonus
- CTA primario: **“Empezar ronda”**

### B) Countdown

- 3 → 2 → 1 con mini preview de imágenes

### C) Ronda activa

- Top bar:
  - Tiempo restante
  - Score
  - Contador de diferencias encontradas (0/5 … 5/5)
- Zona principal:
  - Imagen A (izquierda)
  - Imagen B (derecha)
- Interacciones:
  - Tap sobre diferencia (marca visual)
  - Feedback de error en rojo

### D) Resultado de ronda

- Resumen:
  - Diferencias acertadas
  - Errores
  - Bonus de completado
  - Bonus por tiempo
  - Total
- CTA: **“Siguiente ronda”**

---

## 5) State machine de UI (ambos juegos)

## 5.1 Estados comunes

- `idle` → pantalla en reposo antes de iniciar.
- `briefing` → muestra reglas cortas y CTA inicio.
- `countdown` → 3..2..1 previo a ronda.
- `in_round` → interacción principal activa.
- `paused` → pausa por evento externo (opcional).
- `round_result` → resumen de puntuación de ronda.
- `match_scoreboard` → score acumulado intermedio.
- `match_end` → leaderboard final.

## 5.2 Transiciones clave

- `briefing -> countdown` al pulsar CTA principal.
- `countdown -> in_round` al llegar a 0.
- `in_round -> round_result` por timeout o objetivo completado.
- `round_result -> match_scoreboard` siempre.
- `match_scoreboard -> countdown` si quedan rondas.
- `match_scoreboard -> match_end` si no quedan rondas.

## 5.3 Reglas de bloqueo UI

- Mientras `countdown`, acciones de juego deshabilitadas.
- En `round_result`, inputs de ronda deshabilitados.
- El botón primario se deshabilita al primer tap hasta completar transición.

---

## 6) Especificación de feedback visual y sonoro

## 6.1 Eventos y feedback (Charades)

- **Acierto**:
  - Visual: flash verde + “+100” flotante
  - Sonido: éxito corto
  - Haptics (si disponible): impacto suave
- **Pasar**:
  - Visual: card desliza y aparece nueva palabra
  - Sonido: “skip” corto
  - Texto: “-20 por pasar”
- **Racha**:
  - Visual: contador de combo con glow
  - Sonido: incremento progresivo de tono

## 6.2 Eventos y feedback (Spot)

- **Tap correcto**:
  - Visual: círculo verde persistente en zona detectada
  - Sonido: click afirmativo
- **Tap incorrecto**:
  - Visual: pulso rojo temporal
  - Sonido: beep corto
- **Ronda completada 5/5**:
  - Visual: banner de bonus + partículas
  - Sonido: fanfarria breve

## 6.3 Reglas de accesibilidad feedback

- Feedback no depende solo de color (usar iconos/texto).
- Subtítulos de evento opcionales activables.
- Volumen SFX independiente de música.

---

## 7) Prototipo navegable (low-fi) — alcance

### 7.1 Qué incluye

- Navegación clicable entre pantallas clave de ambos minijuegos.
- Estados simulados de ronda (sin scoring real persistente).
- Microcopys finales para CTA y mensajes de error.

### 7.2 Qué no incluye

- Integración final de cámara/IA.
- Lógica real de detección de diferencias.
- Sincronización multiplayer real.

### 7.3 Criterios de aceptación del prototipo

- Un tester nuevo llega de lobby a fin de ronda sin ayuda.
- Entiende reglas de cada juego en menos de 15 segundos.
- No se reportan bloqueos de navegación en happy path.

---

## 8) Copys UX definidos (v1)

## 8.1 Charades

- Inicio: “Actúa rápido, tu equipo te sigue.”
- Acierto: “¡Sí! +100”
- Pase: “Siguiente carta (-20)”
- Fin ronda: “Turno cerrado. Vamos al marcador.”

## 8.2 Spot

- Inicio: “Encuentra 5 diferencias antes del tiempo.”
- Acierto: “¡Bien visto!”
- Error: “No está ahí (-15)”
- Fin ronda: “Ronda finalizada. Revisemos puntos.”

---

## 9) Plan operativo Semana 2 (día a día)

- **Día 1:** wireframes globales de flujo común.
- **Día 2:** wireframes de Charades + revisión.
- **Día 3:** wireframes de Spot + revisión.
- **Día 4:** definición de estados UI + transiciones.
- **Día 5:** feedback visual/sonoro + copy deck.
- **Día 6:** prototipo navegable low-fi.
- **Día 7:** test interno UX + ajustes.

---

## 10) Checklist de cierre Semana 2

- [x] Wireframes aprobados para Charades.
- [x] Wireframes aprobados para Spot.
- [x] State machine de UI revisada por dev.
- [x] Tabla de feedback visual/sonoro cerrada.
- [x] Prototipo navegable validado internamente.
- [x] Lista de incidencias UX priorizada para Semana 3.

---

## 11) Dependencias para Semana 3

- Aprobación de diseño visual hi-fi.
- Definición de assets mínimos (iconos, sonidos, packs de imágenes).
- Decisión de framework/proceso para prototipo a implementación.
- Criterios de telemetría inicial (eventos UX).


---

## 12) Cierre formal de Semana 2

**Estado: ✅ Semana 2 cerrada.**

### Resumen de cierre

- Wireframes de ambos minijuegos definidos y aprobados.
- Estados UI y transiciones listos para implementación.
- Reglas de feedback visual/sonoro y accesibilidad cerradas.
- Prototipo low-fi navegable definido como base para validación.
- Incidencias UX priorizadas para ejecución de Semana 3.

### Paquete listo para Semana 3

- Implementación de pantallas y navegación real.
- Integración progresiva de lógica de ronda y scoring.
- Instrumentación de eventos UX mínimos para telemetría inicial.
