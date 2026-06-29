# AKDemia autoescuela — Landing

Sitio estático de **AKDemia autoescuela**, escuela de manejo en Villa Urquiza, CABA. Página de presentación con servicios, beneficios, zonas de cobertura, testimonios, preguntas frecuentes y contacto directo por WhatsApp.

## Stack

- **[Astro](https://astro.build/)** — generador de sitios estáticos (output 100% estático, sin JS innecesario).
- **TypeScript** (modo `strict`).
- **Tailwind CSS v4** vía `@tailwindcss/vite`.
- **Git / GitHub** para el código.
- **Vercel** para el deploy.

Sin React/Vue/Svelte, sin librerías de animación, sin backend ni formularios.

## Requisitos

- Node.js `^18.20.8`, `^20.3.0` o `>=22` (probado con Node 20.20.2).
- npm 10+.

## Instalación

```bash
npm install
```

## Comandos

| Comando           | Acción                                              |
| ----------------- | --------------------------------------------------- |
| `npm run dev`     | Servidor de desarrollo en `http://localhost:4321`   |
| `npm run build`   | Compila el sitio estático en `./dist/`              |
| `npm run preview` | Sirve localmente el build de producción             |
| `npm run check`   | Chequeo de tipos y diagnósticos de Astro            |

## Ejecución local

```bash
npm install
npm run dev
```

Abrí `http://localhost:4321` en el navegador. Para revisar el sitio ya compilado:

```bash
npm run build
npm run preview
```

## Estructura

```
.
├── astro.config.mjs        # Config de Astro (site URL + plugin de Tailwind)
├── public/
│   ├── favicon.svg
│   └── images/             # Imágenes placeholder (SVG livianos)
├── src/
│   ├── components/         # Hero, AboutTeacher, Services, Benefits,
│   │                       # Coverage, Testimonials, FAQ, ContactCTA,
│   │                       # FloatingWhatsApp, SEO
│   ├── data/site.ts        # ← TODO el contenido editable del sitio
│   ├── layouts/BaseLayout.astro
│   ├── pages/index.astro   # Ensambla todas las secciones
│   └── styles/global.css   # Tailwind + tokens de marca
└── README.md
```

## Cómo editar el contenido (`src/data/site.ts`)

Todo el texto del sitio vive en [`src/data/site.ts`](src/data/site.ts). Los componentes no tienen contenido hardcodeado: leen siempre desde ahí. Para cambiar algo, editá ese archivo:

- **Contacto y negocio** → objeto `site` (nombre, descripción, URL, WhatsApp, horarios, Instagram, ubicación/geo).
  - El WhatsApp se define en `whatsappLocal` (visible) y `whatsappInternational` (para el enlace `wa.me`). El enlace `whatsappUrl` se arma solo.
- **Hero** → objeto `hero` (título, subtítulo, CTAs, highlights).
- **Profesor** → objeto `teacher` (rol, biografía, credenciales, foto).
- **Servicios** → array `services`.
- **Beneficios** → array `benefits`.
- **Cobertura / zonas** → objeto `coverage`.
- **Testimonios** → array `testimonials`.
- **Preguntas frecuentes** → array `faqs` (también alimenta el JSON-LD `FAQPage`).
- **CTA final** → objeto `contactCta`.

Para reemplazar imágenes, dejá tus archivos en `public/images/` con el mismo nombre (o actualizá las rutas en `site.ts` / componentes).

> **Instagram:** el campo `site.contact.instagram.url` es un placeholder. Reemplazalo por el perfil real.

## SEO

- `title`, `description` y `canonical` configurables desde `BaseLayout` / `SEO.astro` (defaults en `site.ts`).
- Open Graph y Twitter Card básicos.
- JSON-LD `DrivingSchool` (negocio local) y `FAQPage`.
- HTML semántico, un único `<h1>` y headings ordenados.

La URL del sitio se define en `astro.config.mjs` (`site`) y en `site.url`. Actualizá ambos si cambia el dominio.

## Deploy en Vercel

1. Subí el repo a GitHub (ver aviso abajo).
2. En [Vercel](https://vercel.com/new), importá el repositorio `valma420/autoescuela`.
3. Vercel detecta Astro automáticamente:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
4. Deploy. No se requieren variables de entorno ni adapter.

## Trabajo en `main`

> ⚠️ Este proyecto trabaja **directamente sobre la rama `main`**. No se usan ramas de feature. Hacé commits claros y andá probando con `npm run build` antes de pushear.
