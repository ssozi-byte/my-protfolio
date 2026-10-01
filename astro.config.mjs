// astro.config.mjs
//
// 🛑 GOLDEN RULE: output MUST be 'static'.
// Astro compiles the whole site to plain HTML/CSS/JS at build time.
// Cloudflare Pages then only *serves files* — no server runs, so the
// 10ms CPU limit and the 100k requests/day Functions limit never apply.
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Change this to your final domain before going live.
export const SITE_URL = 'https://example.pages.dev';

export default defineConfig({
  // <--- THE MAGIC LINE. No server, no functions, no request limits.
  output: 'static',

  site: SITE_URL,
  trailingSlash: 'ignore',

  integrations: [
    sitemap(), // Generates sitemap-index.xml at build time (static file)
  ],

  build: {
    // Emit classic static HTML; nothing server-rendered at runtime.
    format: 'directory',
  },
});
