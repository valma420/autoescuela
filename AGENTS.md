# AGENTS.md

## Project

### Product

This repository contains the static commercial landing page for AKDemia autoescuela, a driving school in Villa Urquiza, CABA.

- The primary conversion is a WhatsApp contact.
- Keep the site fast, mobile-first, accessible, and focused on local SEO.
- Production: https://akdemiaautoescuela.vercel.app
- Repository: https://github.com/valma420/autoescuela

### Stack and architecture

- Astro with TypeScript strict mode.
- Tailwind CSS through `@tailwindcss/vite`.
- Static output deployed to Vercel.
- No React, Vue, Svelte, backend, CMS, or database.

Main structure:

- `src/data/site.ts`: source of truth for editable business content.
- `src/components/`: page sections and reusable UI.
- `src/layouts/BaseLayout.astro`: base document layout.
- `src/pages/index.astro`: landing page composition.
- `src/styles/global.css`: Tailwind setup and brand tokens.
- `public/images/`: static images.

Keep business details out of components when they can live in `src/data/site.ts`. This includes contact data, location, coverage, services, testimonials, FAQs, CTAs, schedules, social links, and SEO defaults.

## Source of truth

### Content and SEO

- Preserve verified business facts and do not invent credentials, services, prices, schedules, coverage, testimonials, or contact details.
- Keep visible copy natural for the Spanish-language audience.
- Preserve the WhatsApp conversion path and ensure contact values remain consistent.
- Keep `astro.config.mjs` site URL and `site.url` synchronized if the domain changes.
- Maintain `title`, `description`, canonical URL, Open Graph, Twitter Card, and JSON-LD for `LocalBusiness` and `FAQPage`.
- Keep semantic headings, exactly one `h1`, meaningful image text, and no keyword stuffing.
- Preserve local intent around driving lessons, beginner lessons, Villa Urquiza, and CABA.

## Critical invariants

### Performance and design

- Keep the output static and avoid unnecessary client-side JavaScript.
- Use Astro components, semantic HTML, and Tailwind before adding another framework or runtime.
- Keep images lightweight and preserve responsive behavior.
- Do not add animation libraries or major visual systems unless explicitly requested.
- The final visual direction belongs to the designer. Prefer structural, content, accessibility, responsive, and SEO improvements over speculative redesign.

## Scope boundaries

### Dependencies, configuration, and secrets

- Do not add a backend, Supabase, CMS, database, or environment variables unless explicitly requested.
- Never run `npm audit fix --force` without explicit authorization.
- Do not change Vercel configuration unless explicitly requested.
- The current site uses no runtime environment variables. Do not introduce `.env` files or credentials unless an explicitly requested feature requires them; never version secrets.

## External systems

### Git and deployment

- Vercel may deploy automatically after a push to its connected branch. Treat that push as both a Git mutation and a deployment; perform it only when the user explicitly requests that exact effect.
- Do not trigger or change a deployment through any other path unless the user explicitly requests it.

## Validation

### Commands and validation

Common commands:

```sh
npm install
npm run dev
npm run build
npm run preview
npm run check
```

For code or content changes:

1. Run `npm run check`.
2. Run `npm run build`.
3. For visual changes, inspect the relevant desktop and mobile views.
4. Confirm that only expected files changed.
5. Confirm that `src/data/site.ts` remains the editable content source and that SEO, performance, and the WhatsApp path did not regress.
