# AKDemia autoescuela — Landing

Sitio estático de **AKDemia autoescuela**, escuela de manejo en Villa Urquiza, CABA. Presenta servicios, beneficios, zonas de cobertura, testimonios, preguntas frecuentes y un contacto directo por WhatsApp.

- **Producción:** https://akdemiaautoescuela.vercel.app
- **Repositorio:** https://github.com/valma420/autoescuela

## Stack

- [Astro](https://astro.build/) con salida estática.
- TypeScript en modo `strict`.
- Tailwind CSS v4 mediante `@tailwindcss/vite`.
- [Leaflet](https://leafletjs.com/) para el mapa de cobertura.
- Vercel para hosting y deploy.

No usa React, Vue, Svelte, backend, CMS, base de datos ni variables de entorno.

## Requisitos

- Node.js `>=22.12.0`.
- npm `>=9.6.5`.
- Git para clonar y colaborar.

## Inicio rápido

```bash
git clone https://github.com/valma420/autoescuela.git
cd autoescuela
npm install
npm run dev
```

Abrir `http://localhost:4321` en el navegador.

## Comandos

| Comando | Acción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo en `http://localhost:4321`. |
| `npm run check` | Ejecuta el chequeo de tipos y los diagnósticos de Astro. |
| `npm run build` | Genera el sitio estático en `dist/`. |
| `npm run preview` | Sirve localmente el build de producción. |

## Estructura

```text
.
|-- astro.config.mjs              # URL canónica y plugin de Tailwind
|-- public/
|   |-- data/coverage-zones.geojson
|   |-- favicon.svg
|   `-- images/                   # Fotos, logo e imágenes sociales/fallback
|-- src/
|   |-- components/               # Secciones y UI reutilizable
|   |-- data/site.ts              # Datos editables del negocio y contenido principal
|   |-- layouts/BaseLayout.astro
|   |-- pages/index.astro          # Composición de la landing
|   |-- scripts/coverage-map.ts    # Inicialización del mapa Leaflet
|   `-- styles/global.css          # Tailwind y tokens de marca
|-- package.json
`-- tsconfig.json
```

## Contenido e imágenes

[`src/data/site.ts`](src/data/site.ts) es la fuente principal para los datos editables del negocio: contacto, ubicación, cobertura, servicios, testimonios, preguntas frecuentes, llamadas a la acción y valores SEO predeterminados. El enlace de WhatsApp se construye a partir de los números configurados allí.

Algunos textos estructurales de navegación, componentes y mapa viven junto a su interfaz. Antes de editar, buscá el texto o dato concreto y conservá consistentes sus apariciones; no asumas que todo el copy está centralizado en `site.ts`.

- Las imágenes públicas viven en `public/images/`. Para reemplazarlas, conservá el nombre o actualizá la ruta que las referencia.
- Los placeholders visuales retirados se conservan fuera del repositorio, en `90 Archivo` de la biblioteca indicada por `docs/project-context.local.md`.
- Las zonas del mapa se cargan desde `public/data/coverage-zones.geojson` y se renderizan mediante `src/scripts/coverage-map.ts` y `CoverageMap.astro`.
- El Instagram configurado actualmente es `@akdemia.autoescuela`.

## SEO

El sitio incluye:

- `title`, `description` y URL canónica;
- Open Graph y Twitter Card;
- JSON-LD de `LocalBusiness` y `FAQPage`;
- HTML semántico, un único `<h1>` y headings ordenados.

La URL pública se configura tanto en `astro.config.mjs` (`site`) como en `site.url`. Si cambia el dominio, hay que actualizar ambos valores.

## Validación

Antes de publicar cambios:

```bash
npm run check
npm run build
```

Para cambios visuales, revisá también las vistas relevantes en escritorio y móvil, el mapa de cobertura y el enlace de WhatsApp.

## Colaboración y deploy

El equipo trabaja directamente sobre `main`, por lo que conviene coordinar cambios sobre los mismos archivos y mantener commits chicos y descriptivos. Cada colaborador debe usar su propia cuenta de GitHub; no se comparten contraseñas ni tokens.

Flujo humano habitual:

1. Sincronizar la copia local antes de empezar.
2. Implementar y revisar el cambio.
3. Ejecutar `npm run check` y `npm run build`.
4. Confirmar con `git status` que solo se incluyan los archivos esperados.
5. Crear el commit y hacer push cuando se quiera publicar.

Un push a la rama conectada puede disparar automáticamente un deploy de Vercel. La configuración inicial o recuperación del proyecto en Vercel usa el preset Astro, `npm run build` como build command y `dist` como output directory; no requiere adapter ni variables de entorno.
