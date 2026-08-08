# 🎟️ MagicTickets — Frontend Dinámico

> Proyecto integrador autónomo desarrollado en el curso **"Frontend Dinámico con TypeScript y Vite"**, correspondiente al **Hito 2** de MagicTickets: una plataforma de venta de entradas para eventos (conciertos, teatro, deporte, conferencias y más).

---

## 📌 Sobre el proyecto

MagicTickets es un sistema integrador que evoluciona hito a hito a lo largo del curso, hasta convertirse en una aplicación full-stack completa. Este repositorio corresponde al **Hito 2**: la capa de frontend, construida en **TypeScript** sobre **Vite**, sin frameworks de componentes JavaScript (ver detalle de tecnologías más abajo).

La aplicación muestra una cartelera de eventos disponibles para la venta de entradas. Cada evento se presenta en una tarjeta con su información principal (fecha, categoría, estado y disponibilidad). Al seleccionar un evento, se despliega un formulario de compra que valida la cantidad de entradas solicitadas contra las mismas reglas de negocio definidas en el dominio Java del **Hito 1** (cantidad positiva, máximo 5 entradas por compra, y stock disponible), antes de confirmar la reserva.

El proyecto no reinicia el dominio de negocio en cada hito: el modelo `ShowEvent` de esta unidad conserva y amplía la entidad `Event` ya definida en Java (`name`, `stock`), agregando los campos `date`, `status` y `category` como evolución natural del dominio — evolución que está prevista para reflejarse también en el backend Java en unidades futuras (Arquitectura Limpia y DDD).

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
│   │   └── event.ts             # Interface ShowEvent (incluye imageUrl), enums, mock data, isAvailable()
│   ├── services/
│   │   └── eventService.ts      # Llamada asíncrona (fetch) aislada de la UI
│   ├── styles/
│   │   └── global.css           # Directivas de Tailwind CSS v4 + reglas CSS propias
│   └── main.ts                  # Orquestación: renderizado, eventos y validaciones
├── index.html                   # Plantilla HTML semántica principal
├── package.json
├── tsconfig.json
└── vite.config.ts
```

**Principios de diseño aplicados:**

- **Single Responsibility:** `eventService.ts` solo se encarga de la petición de red y de validar el canal HTTP; `main.ts` orquesta el DOM y decide qué mostrar según el resultado.
- **Componentes funcionales:** `generateEventCardHtml` es una función pura que recibe datos y devuelve HTML, sin efectos secundarios ni estado propio.
- **Disponibilidad como función derivada:** `isAvailable(event)` calcula la disponibilidad a partir de `stock` en tiempo real, en lugar de almacenarla como un campo independiente que podría desincronizarse.
- **YAGNI:** no se modelaron atributos ni estados que el negocio no requiere explícitamente. Única excepción intencional: `imageUrl`, incorporado con fines exclusivamente visuales (no es parte de una regla de negocio ni del dominio Java) para dar identidad visual a cada tarjeta de evento.

---

## ✅ Pilares del Hito 2

### 1. Modelado de datos en TypeScript
- Interface hermética `ShowEvent`, con tipos primitivos y enumeraciones propias como tipos de campo — sin `any` en ningún punto.
- Enumeraciones estrictas `ShowStatus` y `ShowCategory` para el control de estados críticos.

### 2. Manejo del DOM y formularios
- Guardias de nulidad (`if (elemento !== null)`) en toda captura de nodos del DOM.
- `event.preventDefault()` como primera instrucción del listener de `submit`.
- Aserciones de tipo especializadas (`as HTMLInputElement`, `as HTMLFormElement`).
- Captura de clics mediante *event delegation* (`target.closest(".event-card")`).
- Validaciones reactivas de negocio: cantidad positiva, máximo 5 entradas, stock suficiente.

### 3. Arquitectura asíncrona
- Función `async`/`await` para el consumo de datos, sin cadenas de `.then()`.
- Bloque `try`/`catch` envolviendo la llamada `fetch`, con validación explícita de `response.ok`.
- Feedback visual de carga inyectado en el DOM antes de disparar la petición.
- Manejo de errores tipado (`error instanceof Error`), sin recurrir a `any`.

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

### 3. Verificar tipos y compilar para producción
```bash
npm run build
```

---

## 📄 Continuidad del proyecto

| Hito | Unidad | Stack | Estado |
|------|--------|-------|--------|
| Hito 1 | Fundamentos de Calidad y TDD en Java | Java + JUnit + Mockito | ✅ Entregado |
| **Hito 2** | **Frontend Dinámico con TypeScript y Vite** | **TypeScript + Vite** | **✅ Este repositorio** |
| Hito 3 | Arquitectura Limpia y DDD | Java | ⏳ Pendiente |
| Hito 4 | Microservicios con Spring Boot | Java + Docker | ⏳ Pendiente |
| Final | Integración Full-Stack | Java + TypeScript | ⏳ Pendiente |

Repositorio del Hito 1 (dominio Java): [magictickets](https://github.com/PauloRoa/magictickets)
