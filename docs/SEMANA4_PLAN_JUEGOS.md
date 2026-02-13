# Semana 4 — Estabilización, calidad y preparación para escala

Este documento abre la ejecución de **Semana 4** tras el cierre de Semana 3 (MVP jugable).

> Objetivo: consolidar calidad del MVP, reducir deuda técnica y dejar base para iteración de contenido y medición.

---

## 1) Objetivos de la semana

- Mejorar la robustez del flujo de juego (navegación, timers, errores no controlados).
- Reducir deuda técnica de minijuegos retirados (código legado no utilizado).
- Introducir persistencia local mínima para historial de partidas.
- Definir telemetría base para medir uso y fricción.
- Preparar la app para una futura iteración multiplayer.

---

## 2) Alcance funcional (Semana 4)

### 2.1 Incluye

- Limpieza de rutas/funciones antiguas no activas (`contraption`, `doodle`) cuando no afecten el flujo actual.
- Normalización de manejo de timers en un helper único.
- Guardado local de últimos resultados de partida (top 5) con `localStorage`.
- Event logging básico en consola para los hitos de ronda.
- Revisión UX de mensajes de error y estados vacíos.

### 2.2 No incluye

- Backend real o cuentas de usuario.
- Sincronización en tiempo real entre múltiples clientes.
- Reescritura completa de arquitectura en módulos.

---

## 3) Entregables técnicos

- Helper central `clearAllGameTimers()` reutilizado en transiciones.
- Wrapper simple de telemetría (`trackEvent(name, payload)`).
- Persistencia local de resultado final por partida (`matchHistory`).
- Limpieza de selector y rutas para evitar referencias muertas.
- Documento de decisiones técnicas con deuda pendiente para Semana 5.

---

## 4) Plan operativo día a día

- **Día 1:** auditoría de rutas activas vs legado (mapa real de funciones usadas).
- **Día 2:** implementar helper único de timers y migrar llamadas.
- **Día 3:** añadir historial local de partidas y render básico en leaderboard.
- **Día 4:** añadir eventos de telemetría (inicio/fin ronda, score, timeout).
- **Día 5:** limpieza de código no usado y revisión de regressions.
- **Día 6:** smoke test completo de flujo `charades -> scavenger -> spot -> leaderboard`.
- **Día 7:** congelar Semana 4 y preparar backlog priorizado de Semana 5.

---

## 5) Definition of Done — Semana 4

- [x] No hay timers huérfanos al cambiar entre pantallas/minijuegos.
- [x] El leaderboard guarda y muestra historial local de partidas recientes.
- [x] Existen eventos mínimos de telemetría en puntos clave del flujo.
- [x] No quedan rutas visibles a minijuegos retirados en el selector principal.
- [x] Flujo principal sin errores críticos de consola en smoke test manual.

---

## 6) QA manual mínimo

1. Jugar una sesión completa desde menú hasta leaderboard.
2. Repetir sesión y validar que el historial local aumenta.
3. Cambiar rápido entre pantallas y confirmar que no quedan timers activos.
4. Verificar que logs de telemetría aparecen en eventos clave.
5. Confirmar que el selector solo muestra los 3 modos actuales.

---

## 7) Riesgos y mitigación

- **Riesgo:** romper flujo actual al eliminar código legado.
  - **Mitigación:** eliminar de forma incremental y validar cada bloque.
- **Riesgo:** historial local inconsistente por cambios de estructura.
  - **Mitigación:** versionar payload (`schemaVersion`) y fallback seguro.
- **Riesgo:** ruido en consola por telemetría excesiva.
  - **Mitigación:** prefijar eventos (`[telemetry]`) y limitar granularidad.

---

## 8) Backlog Semana 5 (preview)

- Extracción de minijuegos a módulos separados.
- Primera capa de tests automatizados de navegación/estado.
- Balanceo de score con datos del historial local.
- Pack de contenido expandido para Charades y Spot.


---

## 9) Cierre formal de Semana 4

**Estado: ✅ Semana 4 cerrada.**

### Evidencia de cierre

- Se centralizó limpieza de timers con `clearAllGameTimers()`.
- Se añadió telemetría base con `trackEvent(name, payload)`.
- Se añadió historial local de partidas (`localStorage`) y render en leaderboard.
- El selector mantiene únicamente los tres modos activos (`charades`, `scavenger`, `spot`).

### Siguiente foco (Semana 5)

- Modularizar minijuegos para reducir tamaño de `app.js`.
- Añadir tests de navegación/estado para prevenir regresiones.
- Reemplazar simulación de Spot por tablero visual real con assets.
