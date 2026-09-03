import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { remarkAlertBlockquote } from './src/lib/remark-alert-blockquote.mjs';

export default defineConfig({
  site: 'https://cafecomodoutor.com.br',
  integrations: [sitemap()],
  markdown: {
    remarkPlugins: [remarkAlertBlockquote],
  },
});
