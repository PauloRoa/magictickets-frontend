# 🎟️ MagicTickets — Frontend Dinámico

> Proyecto desarrollado en el curso, correspondiente al **Hito 2** de MagicTickets (frontend en TypeScript/Vite) y consolidado en la **entrega Final** (Integración Full-Stack y Validación): una plataforma de venta de entradas para eventos (conciertos, teatro, deporte, conferencias y más), integrada de punta a punta con un backend real en Spring Boot.

---

## 📌 Sobre el proyecto

MagicTickets es un sistema integrador que evolucionó hito a hito a lo largo del curso hasta convertirse en una aplicación full-stack completa. Este repositorio corresponde a la capa de frontend, construida en **TypeScript** sobre **Vite**, sin frameworks de componentes JavaScript.

La aplicación muestra una cartelera de eventos disponibles para la venta de entradas, obtenida en tiempo real desde el microservicio backend (`magictickets-backend`, Spring Boot + PostgreSQL). Cada evento se presenta en una tarjeta con su información principal (fecha, categoría, estado y disponibilidad). Al seleccionar un evento, se despliega un formulario de compra que valida localmente la cantidad solicitada (cantidad positiva, máximo 5 entradas, stock suficiente) y luego envía la compra real al backend, que aplica la misma validación como única fuente de verdad — cualquier respuesta de error del servidor (ej. stock agotado) se muestra directamente al usuario.

El proyecto no reinicia el dominio de negocio en cada hito: el modelo `ShowEvent` conserva y amplía la entidad `Event` del dominio Java (`name`, `stock`), incorporando `id`, `date`, `status`, `category` e `imageUrl` — evolución de dominio ya reflejada en ambos lados (frontend y backend) tras la integración full-stack de la entrega Final.

---

## 📄 Recorrido del proyecto

| Etapa | Qué aportó a este frontend | Estado |
|---|---|---|
| Hito 2 — Frontend Dinámico con TypeScript y Vite | Modelo `ShowEvent`, componente `EventCard`, manipulación segura del DOM, formulario de compra con validación local replicando las reglas del dominio Java (Hito 1). El `fetch` asíncrono existía solo como ejercicio de manejo de errores contra un endpoint externo simulado; su respuesta se descartaba y el renderizado siempre usaba `mockEvents` — no había conexión real al backend. | ✅ 10.0/10.0 |
| Entrega Final — Integración Full-Stack y Validación | Conexión real de punta a punta con `magictickets-backend`: `eventService.ts` retipado para leer eventos reales desde PostgreSQL (`Promise<ShowEvent[]>`, ya no descarta la respuesta); `purchaseService.ts` (nuevo) para enviar compras reales; `main.ts` ya no usa `mockEvents`, sino el resultado real del backend, refrescando el stock tras cada compra exitosa; `ShowEvent` ganó el campo `id`, necesario para identificar el evento real en la compra. | ✅ Entrega final |

El modelo de datos y las validaciones de negocio nunca se reiniciaron entre hitos: la integración final solo reemplazó la fuente de los datos (de `mockEvents` a la API real), sin rehacer la lógica de UI ya construida.

---

## 🚀 Tecnologías utilizadas

- **TypeScript Vanilla** — tipado estricto, sin frameworks de componentes JavaScript (React, Vue, Angular). Toda la manipulación del DOM se realiza con la API nativa del navegador.
- **Vite** — entorno de desarrollo y bundling, con Hot Module Replacement.
- **Módulos nativos de ES** (`import`/`export`) — sin sistemas de módulos adicionales.
- **Tailwind CSS v4** (`@tailwindcss/vite`) — utilidades de estilo para la capa visual. Es una herramienta de CSS, no un framework de componentes: no reemplaza ni interfiere con el enfoque Vanilla de la lógica de la aplicación.
- **Lucide** — iconografía SVG tipada, sin uso de `any`.

---

## 🧱 Arquitectura y estructura del proyecto

```text
magictickets-frontend/
├── public/
│   └── events/                  # Imágenes de cada evento
├── src/
│   ├── components/
│   │   └── EventCard/           # Componente funcional de renderizado de tarjetas
│   │       ├── EventCard.ts
│   │       └── index.ts
│   ├── models/
│   │   └── event.ts             # Interface ShowEvent (id, date, status, category, imageUrl), enums, mock data, isAvailable()
│   ├── services/
│   │   ├── eventService.ts      # fetch real a GET /api/v1/events, aislado de la UI
│   │   └── purchaseService.ts   # fetch real a POST /api/v1/purchases, aislado de la UI
│   ├── styles/
│   │   └── global.css           # Directivas de Tailwind CSS v4 + reglas CSS propias
│   └── main.ts                  # Orquestación: renderizado, eventos, validaciones y compra real
├── index.html                   # Plantilla HTML semántica principal
├── package.json
├── tsconfig.json
└── vite.config.ts
```

**Principios de diseño aplicados:**

- **Single Responsibility:** `eventService.ts` y `purchaseService.ts` solo se encargan de la comunicación de red y de validar el canal HTTP; `main.ts` orquesta el DOM y decide qué mostrar según el resultado.
- **Componentes funcionales:** `generateEventCardHtml` es una función pura que recibe datos y devuelve HTML, sin efectos secundarios ni estado propio.
- **Disponibilidad como función derivada:** `isAvailable(event)` calcula la disponibilidad a partir de `stock` en tiempo real, en lugar de almacenarla como un campo independiente que podría desincronizarse.
- **Defensa en profundidad en la validación de compra:** las reglas de negocio (cantidad positiva, máximo 5, stock suficiente) se validan tanto en el cliente (feedback inmediato) como en el backend (única fuente de verdad real e innegociable, ya que cualquiera puede saltarse el frontend con una petición HTTP directa).
- **YAGNI, con una excepción documentada:** no se modelaron atributos ni estados que el negocio no requiere explícitamente. `imageUrl` se incorporó desde Hito 2 con fines exclusivamente visuales; en ese momento no era parte del dominio Java. Desde la entrega Final, sí lo es — se agregó a `Event.java` en el backend por decisión consciente de alinear el dominio al contrato ya definido por el frontend, cerrando la brecha que existía entre ambos lados.

---

## ✅ Pilares del proyecto

### 1. Modelado de datos en TypeScript
- Interface hermética `ShowEvent`, con tipos primitivos y enumeraciones propias como tipos de campo — sin `any` en ningún punto.
- Enumeraciones estrictas `ShowStatus` y `ShowCategory` para el control de estados críticos.

### 2. Manejo del DOM y formularios
- Guardias de nulidad (`if (elemento !== null)`) en toda captura de nodos del DOM.
- `event.preventDefault()` como primera instrucción del listener de `submit`.
- Aserciones de tipo especializadas (`as HTMLInputElement`, `as HTMLFormElement`).
- Captura de clics mediante *event delegation* (`target.closest(".event-card")`).
- Validaciones reactivas de negocio: cantidad positiva, máximo 5 entradas, stock suficiente.

### 3. Arquitectura asíncrona e integración real
- Funciones `async`/`await` para el consumo y envío de datos, sin cadenas de `.then()`.
- Bloques `try`/`catch` envolviendo las llamadas `fetch`, con validación explícita de `response.ok`.
- Feedback visual de carga inyectado en el DOM antes de disparar cada petición.
- Manejo de errores tipado (`error instanceof Error`), mostrando el mensaje real devuelto por el backend.
- Tras una compra exitosa, se recarga la cartelera desde el backend para reflejar el stock real actualizado en PostgreSQL — nunca se resta stock manualmente en el cliente.

---

## 🛠️ Instalación y ejecución local

### 1. Clonar el repositorio e instalar dependencias
```bash
npm install
```

### 2. Ejecutar el servidor de desarrollo
```bash
npm run dev
```

**Requisito:** el backend (`magictickets-backend`) debe estar corriendo en `http://localhost:8080` para que la carga de eventos y la compra funcionen — ver su propio README para instrucciones de arranque y configuración de variables de entorno.

### 3. Verificar tipos y compilar para producción
```bash
npm run build
```

---

## 📄 Repositorio relacionado

Repositorio del backend (dominio Java + Spring Boot): [magictickets-backend](https://github.com/PauloRoa/magictickets-backend)
