# Crash-Proof Static Portfolio

A 100% static portfolio built with **Astro** (static output). It follows one
golden rule:

> 🛑 **Zero server-side execution for user traffic.**
> No Cloudflare Workers/Functions. No server APIs. No request limits, no CPU
> limits, no cold starts — the host just serves HTML/CSS/JS files.

Astro compiles everything at **build time** (on your laptop or in CI). What
reaches Cloudflare Pages is plain files, so the site scales to millions of
visitors on the free tier and, by construction, cannot hit the 10ms CPU or
100k requests/day *Functions* limits — those apply only to server code, and
there is none.

## How "dynamic" features stay safe

| Feature          | Risky way (server)             | This project does (zero server load)                                        |
| ---------------- | ------------------------------ | --------------------------------------------------------------------------- |
| Contact form     | Server function sends email    | **Formspree** — form POSTs straight to their endpoint (`ContactForm.astro`) |
| Comments         | Custom DB-backed system        | **Giscus** (GitHub Discussions) — drop-in when you want it                  |
| Analytics        | Self-hosted analytics + DB     | **Cloudflare Web Analytics** — uncomment the tag in `BaseLayout.astro`      |
| GitHub projects  | Server fetches for every user  | Visitor's browser fetches GitHub's public API, cached 10 min in `sessionStorage` (`GitHubProjects.astro`) |
| Project content  | CMS/API calls at request time  | **Markdown content collections** rendered at build                          |

## Project structure

```
├── .github/workflows/deploy.yml   # CI: typecheck → build → static-guard → deploy
├── astro.config.mjs               # output: 'static'  ← the magic line
├── public/                        # favicon, robots.txt (copied as-is)
├── src/
│   ├── config.ts                  # SITE, SOCIAL, CONTACT (Formspree), GITHUB_USERNAME
│   ├── content.config.ts          # content collection schema (build-time)
│   ├── content/projects/*.md      # your projects — add one = add a file
│   ├── components/
│   │   ├── Header.astro / Footer.astro
│   │   ├── ProjectCard.astro      # static card
│   │   ├── ContactForm.astro      # Formspree client-side
│   │   └── GitHubProjects.astro   # client-side island w/ cache + fallbacks
│   ├── layouts/BaseLayout.astro   # SEO meta, canonical, OG tags
│   ├── pages/                     # index, projects, about, 404
│   └── styles/global.css          # dependency-free stylesheet
└── dist/                          # build output — pure static files
```

## Getting started

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static site → dist/
npm run preview   # serve dist/ locally
npm run check     # typecheck
```

## Personalize (3 minutes)

1. **`src/config.ts`** — your name, description, socials, GitHub username.
2. **`src/content/projects/`** — replace the sample markdown files.
3. **Contact form** — create a form at [formspree.io](https://formspree.io)
   (free: 50 submissions/month), paste the ID into `CONTACT.formspreeId`.
4. **Domain** — set `SITE.url` in `src/config.ts` **and** the `site` value in
   `astro.config.mjs` (used for sitemap/canonicals), plus the URL in
   `public/robots.txt`.

## Deploy to Cloudflare Pages

**Option A — Git integration (recommended, zero secrets):** push to GitHub →
Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git →
build command `npm run build`, output directory `dist`.

**Option B — This repo's GitHub Action:** add `CLOUDFLARE_API_TOKEN` and
`.github/workflows/deploy.yml` already handles typecheck → build → a guard
step that **fails the deploy if `_worker.js` ever appears in `dist/`** (your
insurance against accidentally enabling server rendering) → deploy.

## The safety rails baked in

- `astro.config.mjs` pins `output: 'static'`.
- The CI guard step blocks any deploy that isn't pure static output.
- Client island degrades gracefully (rate-limit → "visit GitHub" link).
- Contact form still sends without JavaScript (plain POST to Formspree).
- `npm run check` typechecks everything before it can deploy.
