import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const artigos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/artigos' }),
  schema: z.object({
    titulo: z.string(),
    subtitulo: z.string().optional(),
    categoria: z.string(),
    tempo_leitura: z.string(),
    autor: z.string(),
    data: z.string().optional().default(''),
    imagem_capa: z.string().optional().default(''),
    fonte: z.string().optional(),
    resumo: z.string().optional(),
    resumo_whatsapp: z.string().optional(),
  }),
});

export const collections = { artigos };
