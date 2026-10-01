// src/content.config.ts — Astro v5+ content collections (build-time only).
import { defineCollection } from 'astro:content';
import { z } from 'astro:schema';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    url: z.string().url().optional(),
    repo: z.string().url().optional(),
    tags: z.array(z.string()).default([]),
    stars: z.number().int().nonnegative().optional(),
    order: z.number().int().default(99),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects };
