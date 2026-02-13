# Semana 1 — Diseño de reglas, categorías y puntuación

Este documento define y **aterriza la semana 1** para sustituir minijuegos por:

1. **Charades Cam** (Mímica + cámara + equipo)
2. **Spot the Difference Live** (Encuentra diferencias)

> Objetivo de la semana: cerrar reglas jugables, categorías iniciales, sistema de puntuación y criterios de salida para entrar a prototipo UX en semana 2.

---

## 1) Objetivos de Semana 1

- Definir reglas finales por juego (flujo de ronda, victoria, desempates).
- Definir catálogo inicial de categorías para 12 años.
- Definir sistema de puntuación común para ambos juegos.
- Definir métricas de balance que se validarán en pruebas internas.
- Documentar ejemplos de cálculo de score para QA y producto.

**Resultado esperado:** un "Game Design Spec v1" ejecutable por diseño, producto y desarrollo.

---

## 2) Charades Cam — Diseño funcional

### 2.1 Resumen

Juego social por turnos. Un jugador interpreta una palabra/acción frente a la cámara y su equipo debe adivinar antes de que termine el tiempo.

### 2.2 Estructura de partida

- Jugadores: 2–8
- Formato recomendado: por equipos (2 equipos)
- Rondas por partida: 6 (3 por equipo)
- Duración por ronda: 45 segundos
- Cambio de turno: alternado por equipo

### 2.3 Flujo de ronda

1. Inicio de ronda → se muestra categoría + palabra al jugador activo.
2. Cuenta atrás de 3 segundos.
3. Fase de mímica (45s): el equipo adivina.
4. Si aciertan, se puede encadenar una nueva palabra (modo racha).
5. Fin de tiempo → cierre y suma de puntos.

### 2.4 Reglas

- No se permite decir la palabra ni derivaciones obvias.
- Se permite gesto, postura y movimiento.
- Se permite pasar palabra con penalización.
- Ronda termina por tiempo o si no quedan cartas en el mazo de la categoría.

### 2.5 Puntuación propuesta

- Acierto: +100
- Bonus velocidad:
  - <10s desde que aparece la carta: +40
  - 10–20s: +20
  - >20s: +0
- Racha (2+ aciertos seguidos en misma ronda): +15 por acierto adicional
- Pasar palabra: -20

### 2.6 Condición de victoria

- Gana el equipo con más puntos tras 6 rondas.
- Desempate: ronda relámpago de 20s con 1 carta por equipo.

### 2.7 Ejemplos de cálculo (Charades)

- **Caso A (ronda buena):** 3 aciertos (2 rápidos <10s y 1 entre 10–20s), 1 pase.
  - Base: 3 × 100 = 300
  - Velocidad: 40 + 40 + 20 = 100
  - Racha: (aciertos adicionales 2) × 15 = 30
  - Pase: -20
  - **Total ronda = 410**

- **Caso B (ronda media):** 2 aciertos (>20s), 2 pases.
  - Base: 2 × 100 = 200
  - Velocidad: 0
  - Racha: 15
  - Penalización: -40
  - **Total ronda = 175**

---

## 3) Spot the Difference Live — Diseño funcional

### 3.1 Resumen

Juego competitivo de observación. Los jugadores deben detectar diferencias en pares de imágenes casi iguales dentro de un límite de tiempo.

### 3.2 Estructura de partida

- Jugadores: 2–8 (individual o equipos)
- Rondas por partida: 5
- Tiempo por ronda: 60 segundos
- Diferencias por ronda: 5

### 3.3 Flujo de ronda

1. Se presentan 2 imágenes similares.
2. Cuenta atrás 3 segundos.
3. Jugadores tocan/clican zonas donde detectan diferencias.
4. Feedback inmediato: acierto/error.
5. Ronda termina al encontrar 5 diferencias o acabar el tiempo.

### 3.4 Reglas

- Solo cuenta una vez cada diferencia encontrada.
- Toques repetidos en zona ya resuelta no puntúan.
- Toques erróneos penalizan para evitar spam.
- Si nadie encuentra todas, gana quien tenga más aciertos en esa ronda.

### 3.5 Puntuación propuesta

- Diferencia correcta: +60
- Bonus por completar las 5 diferencias: +100
- Bonus velocidad por tiempo restante:
  - >30s restantes: +60
  - 10–30s: +30
  - <10s: +10
- Error de tap/click: -15

### 3.6 Condición de victoria

- Gana quien tenga mayor acumulado al final de 5 rondas.
- Desempate: una ronda extra “súbita” con 3 diferencias en 30s.

### 3.7 Ejemplos de cálculo (Spot)

- **Caso A (ronda perfecta):** 5/5 diferencias en 25s restantes, 2 errores.
  - Base: 5 × 60 = 300
  - Complete bonus: +100
  - Velocidad (10–30s): +30
  - Errores: -30
  - **Total ronda = 400**

- **Caso B (ronda parcial):** 3/5 diferencias, tiempo agotado, 1 error.
  - Base: 3 × 60 = 180
  - Complete bonus: 0
  - Velocidad: 0
  - Errores: -15
  - **Total ronda = 165**

---

## 4) Categorías iniciales (curadas para 12 años)

### 4.1 Charades Cam — categorías y volumen mínimo

- Animales (40 cartas)
- Deportes (40 cartas)
- Profesiones (30 cartas)
- Acciones cotidianas (40 cartas)
- Cultura pop kids-safe (30 cartas)
- Videojuegos familiares (30 cartas)

**Meta de contenido inicial:** 210 cartas.

### 4.2 Spot the Difference — packs iniciales

- Aula y colegio (20 pares)
- Parque y ciudad (20 pares)
- Ciencia y laboratorio divertido (20 pares)
- Deportes y cancha (20 pares)
- Fantasía amigable (20 pares)

**Meta de contenido inicial:** 100 pares de imágenes.

### 4.3 Muestras mínimas para arrancar producción de contenido

#### Charades (10 ejemplos de cartas)

- Animales: delfín, búho
- Deportes: saque de tenis, portero
- Profesiones: chef, astronauta
- Acciones: bostezar, patinar
- Pop/videojuegos family-safe: bloque de construcción, mando de consola

#### Spot (5 ejemplos de conceptos de par)

- Aula con 5 diferencias: reloj, mochila, pizarra, ventana, zapatilla
- Parque con 5 diferencias: cometa, banco, perro, nube, gorra
- Cancha con 5 diferencias: balón, marcador, zapatillas, botella, silbato

---

## 5) Sistema de puntuación común (normalización)

Para facilitar leaderboard único entre minijuegos:

- Unidad base de rendimiento: 100 pts por evento principal.
- Multiplicadores de dificultad (futuro):
  - Fácil: x1.0
  - Medio: x1.2
  - Difícil: x1.4
- Penalizaciones tope por ronda: máximo -100 para evitar frustración.
- Conversión final recomendada para ranking global:
  - `score_normalizado = min(2000, max(0, score_bruto))`

### 5.1 Ejemplo de normalización

- `score_bruto = 2340` → `score_normalizado = 2000`
- `score_bruto = 1380` → `score_normalizado = 1380`
- `score_bruto = -80` → `score_normalizado = 0`

---

## 6) Reglas de seguridad y experiencia infantil

- Sin categorías no aptas para 12 años.
- Sin referencias violentas explícitas ni temas sensibles.
- Palabras/imágenes neutrales, inclusivas y culturales fáciles de entender.
- Moderación de contenido del set antes de publicar packs.

### 6.1 Checklist editorial de contenido (aprobación)

Cada carta/imagen debe cumplir:

- [ ] Lenguaje claro para 11–13 años.
- [ ] No contiene insultos, violencia explícita ni sexualización.
- [ ] No depende de referencias adultas o de nicho no escolar.
- [ ] Se puede entender en menos de 3 segundos.
- [ ] Tiene versión alternativa simple si genera dudas culturales.

---

## 7) Métricas de balance a validar (fin de semana 1)

- Tasa de acierto Charades por ronda: objetivo 50–75%.
- Tasa de finalización Spot (5/5 diferencias): objetivo 40–65%.
- Diferencia media de puntos entre top 1 y top 2: objetivo <20% del total (evitar snowball).
- Duración total de partida: objetivo 8–12 minutos.
- Frustración (abandono antes de terminar): objetivo <10%.

### 7.1 Muestra mínima de validación

- 2 sesiones internas de 20 minutos.
- 6–8 jugadores por sesión.
- Al menos 10 partidas registradas por minijuego.

---

## 8) Plan operativo de Semana 1 (día a día)

- **Día 1 (Lunes):** congelar reglas base + formato de ronda.
- **Día 2 (Martes):** cerrar puntuación y penalizaciones con ejemplos.
- **Día 3 (Miércoles):** curar categorías y lista semilla de contenido.
- **Día 4 (Jueves):** revisión de seguridad infantil + limpieza editorial.
- **Día 5 (Viernes):** mini-playtest interno de reglas (sin código final).
- **Día 6/7:** consolidar métricas y ajustes finales del spec.

---

## 9) Criterios de salida de Semana 1

Se considera completada cuando:

- [x] Reglas cerradas y aprobadas para ambos juegos.
- [x] Puntuación cerrada con ejemplos de cálculo.
- [x] Categorías cerradas con volumen mínimo definido.
- [x] Checklist de seguridad de contenido aprobado.
- [x] Lista de métricas de balance aceptada para playtest de semana 2.

---

**Estado: ✅ Semana 1 cerrada.**

## 10) Backlog de Semana 2 (preview)

- Wireframes de flujo por ronda.
- Definición de estados UI (idle, countdown, in-round, success, timeout).
- Guía de feedback visual/sonoro por evento.
- Prototipo navegable de ambos minijuegos.
