// src/content/config.ts
//
// Single source of truth for site metadata, contact endpoints, and settings.
// Everything here is consumed at BUILD TIME — nothing touches a server at runtime.

export const SITE = {
  title: 'Your Name',
  description:
    'Portfolio of Your Name — software engineer building fast, reliable things for the web.',
  author: 'Your Name',
  // Final production domain (used for SEO, sitemap, and canonical URLs).
  url: 'https://example.pages.dev',
};

// Social links rendered in the footer (pure <a> tags — zero JS).
export const SOCIAL = [
  { label: 'GitHub', href: 'https://github.com/your-username' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/your-username' },
  { label: 'Email', href: 'mailto:you@example.com' },
];

// Contact form (Formspree free tier — 50 submissions/month, no server of ours).
// 1. Create a form at https://formspree.io  2. Paste its form ID below.
export const CONTACT = {
  formspreeId: 'YOUR_FORM_ID', // e.g. 'mqkvabcd'
  get endpoint() {
    return `https://formspree.io/f/${this.formspreeId}`;
  },
};

// GitHub username used by the client-side projects island.
// The browser fetches this with the VISITOR's IP (60 req/hour), not yours.
export const GITHUB_USERNAME = 'your-username';

// Which repos to pin/feature (empty array = show latest 6 non-forks).
export const FEATURED_REPOS: string[] = [];
