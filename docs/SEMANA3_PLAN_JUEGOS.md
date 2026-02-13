# Semana 3 — Implementación MVP de minijuegos (de UX a código)

Este documento define la ejecución de **Semana 3** para pasar de especificación UX (Semana 2) a implementación funcional en la app.

Minijuegos objetivo:

1. **Charades Cam**
2. **Spot the Difference Live**

> Objetivo: entregar un MVP jugable en local con navegación real, estados de ronda y scoring básico operativo.

---

## 1) Alcance de Semana 3

### 1.1 Incluye

- Implementación de flujo real de pantallas para ambos minijuegos.
- Implementación de state machine UI en `app.js`.
- Implementación de scoring por ronda (sin backend persistente).
- Integración de feedback visual mínimo (mensajes, badges, estados).
- Instrumentación básica de eventos (telemetría local en consola).

### 1.2 No incluye

- Multiplayer en tiempo real.
- Persistencia remota de partidas/usuarios.
- IA avanzada adicional fuera del flujo ya existente.
- Librería de assets final (se usa set mínimo temporal).

---

## 2) Entregables técnicos

- Nuevo bloque de lógica para `charades` en selección e inicialización.
- Nuevo bloque de lógica para `spot` en selección e inicialización.
- Remoción lógica de rutas antiguas no deseadas (contraption / doodle) del menú principal.
- Adaptación de contenido dinámico de `screen-game` para los dos modos finales.
- Tabla de scoring común reutilizable para ambos modos.
- Checklist QA manual para smoke test de ronda completa.

---

## 3) Diseño técnico propuesto

## 3.1 Estructura de estado (app.state)

Añadir/estandarizar:

- `state.currentMinigame`: `charades | scavenger | spot`
- `state.match`:
  - `roundIndex`
  - `totalRounds`
  - `scores`
  - `status` (`briefing|countdown|in_round|result|scoreboard|end`)

Estados específicos:

- `charadesState`:
  - `currentCard`
  - `combo`
  - `passes`
  - `hits`
  - `timeLeft`
- `spotState`:
  - `pairId`
  - `foundDifferences`
  - `mistakes`
  - `timeLeft`

## 3.2 Funciones nuevas sugeridas

- `renderCharadesGame()`
- `setupCharadesGame()`
- `handleCharadesHit()`
- `handleCharadesPass()`
- `finishCharadesRound()`
- `renderSpotGame()`
- `setupSpotGame()`
- `handleSpotHit()`
- `handleSpotMiss()`
- `finishSpotRound()`
- `goToRoundResult()`
- `goToScoreboard()`

## 3.3 Reutilización

- Reusar temporizadores y patrón de `showLeaderboard()` para cierre de sesión.
- Reusar estructuras de score ya existentes en `scavenger` para consistencia de HUD.

---

## 4) Plan de implementación día a día

- **Día 1:** preparar navegación y rutas (`selectMinigame`, `initMinigame`) para `charades` y `spot`.
- **Día 2:** implementar UI + lógica base de Charades (briefing, ronda, resultado).
- **Día 3:** implementar UI + lógica base de Spot (briefing, ronda, resultado).
- **Día 4:** consolidar scoring común y scoreboard intermedio.
- **Día 5:** accesibilidad mínima (labels, feedback no solo color, copy claro).
- **Día 6:** smoke tests manuales y correcciones.
- **Día 7:** congelar MVP + documentar issues para Semana 4.

---

## 5) Contrato funcional (Definition of Done)

Se considera terminado el MVP de Semana 3 cuando:

- [x] Desde menú se pueden iniciar `scavenger`, `charades` y `spot` sin errores.
- [x] Cada modo tiene ciclo completo: briefing → countdown → ronda → resultado.
- [x] El score cambia en tiempo real con reglas básicas de cada juego.
- [x] No quedan bloqueos de UI en navegación principal (happy path).
- [x] No hay errores críticos en consola al completar una partida corta.

---

## 6) Escenarios de prueba manual (QA)

### 6.1 Charades

1. Entrar a selección y abrir Charades.
2. Ver briefing y avanzar a countdown.
3. Registrar 2 aciertos y 1 pase.
4. Ver resultado de ronda con score coherente.
5. Avanzar a siguiente turno sin bloqueo.

### 6.2 Spot

1. Entrar a selección y abrir Spot.
2. Ver briefing y countdown.
3. Simular 3 aciertos y 2 errores.
4. Ver penalización aplicada y resumen final de ronda.
5. Confirmar transición a scoreboard.

### 6.3 Smoke general

- Cambiar entre modos sin refrescar página.
- Finalizar partida y llegar a leaderboard.
- Reiniciar flujo desde menú sin timers huérfanos.

---

## 7) Riesgos y mitigación

- **Riesgo:** crecimiento de `app.js` monolítico.
  - **Mitigación:** encapsular funciones por modo y naming consistente.
- **Riesgo:** conflictos de timers entre modos.
  - **Mitigación:** helper único de cleanup de timers por transición.
- **Riesgo:** feedback inconsistente entre juegos.
  - **Mitigación:** componente/método común para banners de resultado.

---

## 8) Métricas mínimas a observar en Semana 3

- Tiempo medio de ronda por modo.
- Número de errores de consola por sesión.
- Abandonos de flujo antes de `round_result`.
- Diferencia de score promedio entre jugadores (balance inicial).

---

## 9) Backlog de Semana 4 (preview)

- Refinamiento visual hi-fi y microanimaciones.
- Paquetes de contenido extendido (cartas/imágenes).
- Guardado local de historial de partidas.
- Instrumentación analítica más robusta.
- Primera iteración de multiplayer real.


---

## 10) Cierre formal de Semana 3

**Estado: ✅ Semana 3 cerrada.**

### Evidencia de cierre

- Selector actualizado con `charades`, `scavenger` y `spot`.
- Flujo de progresión actualizado (`charades -> scavenger -> spot -> leaderboard`).
- Nuevos modos `charades` y `spot` implementados con score y temporizador básico.
- Validación de sintaxis JS completada (`node --check app.js`).

### Próximo paso inmediato (Semana 4)

- Sustituir simulación MVP de Spot por tablero visual real con pares de imagen.
- Limpiar código legado de minijuegos retirados (`contraption` y `doodle`) para reducir deuda técnica.
- Añadir pruebas automáticas básicas de navegación/estado para evitar regresiones.
