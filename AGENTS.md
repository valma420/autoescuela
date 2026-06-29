# AGENTS.md

## Proyecto

Landing page para **AKDemia autoescuela**, una academia/escuela de manejo ubicada en Villa Urquiza, CABA.

El sitio está pensado como una landing comercial simple, rápida y optimizada para SEO local. El objetivo principal es convertir visitas en contactos por WhatsApp.

## Stack

* Astro
* TypeScript
* Tailwind CSS
* Git/GitHub
* Vercel

## Deploy

* Producción: https://akdemiaautoescuela.vercel.app
* Repo: https://github.com/valma420/autoescuela
* Rama única de trabajo: `main`
* Cada push a `main` dispara deploy automático en Vercel.

## Reglas de trabajo

* Trabajar siempre sobre `main`.
* No crear ramas.
* Antes de modificar archivos, ejecutar:

```bash
git pull origin main
```

* Antes de proponer o subir cambios, ejecutar:

```bash
npm run build
npm run check
git status
```

* No hacer push automático salvo pedido explícito.
* No cambiar el remoto de Git.
* No tocar configuración de Vercel salvo pedido explícito.
* No agregar backend, Supabase, CMS, base de datos ni variables de entorno salvo que se solicite.
* No ejecutar `npm audit fix --force` sin autorización.

## Comandos principales

Instalar dependencias:

```bash
npm install
```

Correr en desarrollo:

```bash
npm run dev
```

Build de producción:

```bash
npm run build
```

Preview local del build:

```bash
npm run preview
```

Chequeo del proyecto:

```bash
npm run check
```

## Estructura principal

```txt
src/
  components/
  data/
    site.ts
  layouts/
  pages/
public/
  images/
```

## Contenido editable

El contenido comercial principal debe estar centralizado en:

```txt
src/data/site.ts
```

Siempre que sea razonable, editar textos, datos de contacto, zonas, servicios, testimonios, FAQs, CTAs y datos SEO desde ese archivo.

Evitar hardcodear datos comerciales importantes directamente en componentes.

## Prioridades técnicas

1. Estructura limpia.
2. Contenido fácil de editar.
3. SEO local fuerte.
4. Performance alta.
5. Buena experiencia mobile-first.
6. Deploy simple en Vercel.
7. Código claro y mantenible.

## SEO local

Cuidar especialmente:

* `title`
* `description`
* canonical
* Open Graph
* JSON-LD `LocalBusiness`
* headings semánticos
* un solo `h1`
* textos orientados a búsquedas locales sin keyword stuffing

Términos relevantes:

* escuela de manejo en Villa Urquiza
* clases de manejo para principiantes
* curso de manejo
* clases prácticas de manejo
* autoescuela en CABA

## Performance

* Mantener el sitio estático.
* Evitar JavaScript innecesario.
* No agregar frameworks extra como React, Vue o Svelte salvo necesidad explícita.
* No agregar librerías de animación sin autorización.
* Usar Astro components, HTML y Tailwind.
* Mantener imágenes livianas.
* Cuidar especialmente mobile.

## Diseño

El diseño visual definitivo lo ajustará la diseñadora. No sobrediseñar ni introducir decisiones visuales complejas sin pedido explícito.

Priorizar estructura, semántica, contenido editable, responsive y SEO.

## Git

Antes de trabajar:

```bash
git pull origin main
```

Antes de commitear:

```bash
npm run build
npm run check
git status
```

Commit sugerido:

```bash
git add .
git commit -m "Descripción breve del cambio"
```

Push:

```bash
git push origin main
```

## Archivos que no deben versionarse

Confirmar que sigan ignorados:

```txt
node_modules/
dist/
.astro/
.env
.env.*
.DS_Store
```

## Seguridad

* No agregar secretos al repo.
* No subir tokens, credenciales ni claves.
* No crear archivos `.env` versionados.
* No compartir credenciales de GitHub, Vercel o terceros.

## Criterio de aceptación para cambios

Un cambio se considera listo si:

* `npm run build` pasa sin errores.
* `npm run check` pasa sin errores.
* `git status` muestra solo cambios esperados.
* No se agregaron dependencias innecesarias.
* No se rompió el contenido editable desde `src/data/site.ts`.
* No se degradó SEO, performance ni experiencia mobile.
