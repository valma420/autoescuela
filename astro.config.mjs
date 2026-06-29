// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Sitio 100% estático. URL configurable para canonical / sitemap.
export default defineConfig({
  site: 'https://akdemia.vercel.app',
  vite: {
    // Cast JSDoc: Astro empaqueta su propia copia de Vite y los tipos del
    // plugin de Tailwind difieren de los suyos, aunque en runtime es compatible.
    plugins: /** @type {any} */ ([tailwindcss()]),
  },
});
