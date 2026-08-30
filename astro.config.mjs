import { defineConfig } from 'astro/config';
import { remarkAlertBlockquote } from './src/lib/remark-alert-blockquote.mjs';

export default defineConfig({
  site: 'https://cafecomodoutor.com.br',
  markdown: {
    remarkPlugins: [remarkAlertBlockquote],
  },
});
